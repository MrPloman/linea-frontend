import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  resource,
} from '@angular/core';

import { ColorSelector } from '@presentation/components/product/color-selector/color-selector';
import { ProductCard } from '@presentation/components/product/product-card/product-card';
import { ProductGallery } from '@presentation/components/product/product-gallery/product-gallery';
import { SizeSelector } from '@presentation/components/product/size-selector/size-selector';
import {
  BreadcrumbItemVM,
  Breadcrumbs,
} from '@presentation/components/shared/breadcrumbs/breadcrumbs';
import { Button } from '@presentation/components/shared/button/button';
import { MOCK_GALLERY_IMAGES, MOCK_PRODUCTS } from '@presentation/mocks/products.mock';
import { CartService } from '../../../core/application/services/cartService';
import { FindProductByIdUseCase } from '../../../core/application/useCases/products/findProductById';
import { CartItem } from '../../../core/domain/models/cartItem';
import { Color } from '../../../core/domain/models/color';
import { ProductVariant } from '../../../core/domain/models/productVariant';
import { Quantity } from '../../../core/domain/models/quantity';
import { LOW_STOCK_THRESHOLD } from '../../../core/domain/policies/lowStock';

/** Ficha de producto (PDP). */
@Component({
  selector: 'app-product-detail',
  imports: [Breadcrumbs, Button, ProductCard, ProductGallery, SizeSelector, ColorSelector],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail {
  private cartService = inject(CartService);
  id = input.required<string>();

  private findProductByIdUseCase = inject(FindProductByIdUseCase);
  protected productResource = resource({
    params: () => this.id(),
    loader: ({ params }) => this.findProductByIdUseCase.execute(params),
  });
  protected selectedVariant = computed<ProductVariant | undefined>(() =>
    this.getAllVariants().find(
      (variant: ProductVariant) =>
        variant.colorValue.displayValue === this.selectedColorValue() &&
        variant.sizeValue.displayValue === this.selectedSizeValue(),
    ),
  );

  protected variantIsLowStock = computed(
    () => this.selectedVariant()?.hasLowStock(LOW_STOCK_THRESHOLD) ?? false,
  );

  private getAllVariants = computed(() => {
    const product = this.productResource.value();
    if (!product) return [];
    return product.getArrayOfVariants();
  });

  protected colors = computed<string[]>(() =>
    Array.from(new Set(this.getAllVariants().map((v) => v.colorValue.displayValue))),
  );
  protected sizes = computed<string[]>(() => {
    const color = this.selectedColor();
    const product = this.productResource.value();
    if (!color || !product) return [];
    return product.getSizesByColor(color).map((s) => s.displayValue);
  });

  protected availableSizes = computed<string[]>(() => {
    const color = this.selectedColor();
    const product = this.productResource.value();
    if (!color || !product) return [];
    return product.getAvailableSizeByColor(color).map((s) => s.displayValue);
  });

  protected selectedColorValue = linkedSignal<string | undefined>(
    () => this.getAllVariants()?.[0]?.colorValue.displayValue,
  );

  protected selectedColor = computed<Color | undefined>(
    () =>
      this.getAllVariants().find((v) => v.colorValue.displayValue === this.selectedColorValue())
        ?.colorValue,
  );

  protected selectedSizeValue = linkedSignal<string[], string | undefined>({
    source: this.availableSizes,
    computation: (sizes, previous) =>
      previous?.value && sizes.includes(previous.value) ? previous.value : sizes[0],
  });

  protected addToCart() {
    const variant = this.selectedVariant();
    const product = this.productResource.value();
    const images =
      variant && variant.imagesValue && variant.imagesValue.length > 0
        ? variant.imagesValue[0]
        : { url: '', altText: '' };
    if (!variant || !product) return;
    if (variant.hasNoStock()) return;

    const cartItem = CartItem.createCartItem(
      variant.skuValue,
      product.displayName,
      variant.sizeValue,
      variant.colorValue,
      variant.priceValue,
      Quantity.createQuantity(1),
      images,
    );
    if (!cartItem || !(cartItem instanceof CartItem)) {
      console.log('Error creating CartItem');
      return;
    }
    this.cartService.addItem(cartItem);
  }
  // TRASH
  protected readonly related = MOCK_PRODUCTS.slice(4, 8);

  protected readonly breadcrumbItems: BreadcrumbItemVM[] = [
    { label: 'Inicio', link: '/' },
    { label: 'Mujer', link: '/catalogo' },
    { label: 'Blazer estructurada de lana' },
  ];
  protected readonly galleryImages = MOCK_GALLERY_IMAGES;
  // END OF TRASH
}
