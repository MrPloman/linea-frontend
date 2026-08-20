import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  resource,
  signal,
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
import { FindProductByIdUseCase } from '../../../core/application/useCases/products/findProductById';
import { Color } from '../../../core/domain/models/color';
import { ProductSku } from '../../../core/domain/models/productSku';
import { ProductVariant } from '../../../core/domain/models/productVariant';

/** Ficha de producto (PDP). */
@Component({
  selector: 'app-product-detail',
  imports: [Breadcrumbs, Button, ProductCard, ProductGallery, SizeSelector, ColorSelector],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail {
  id = input.required<string>();
  protected selectedSku = signal<ProductSku | null>(null);

  private findProductByIdUseCase = inject(FindProductByIdUseCase);
  protected productResource = resource({
    params: () => this.id(),
    loader: ({ params }) => this.findProductByIdUseCase.execute(params),
  });
  protected selectedVariant = computed<ProductVariant | undefined>(() => {
    const product = this.productResource.value();
    const sku = this.selectedSku();
    if (!product || !sku) return undefined;
    return product.getVariantBySku(sku);
  });

  public getAllVariants = computed(() => this.productResource.value()?.getArrayOfVariants());

  protected colors = computed<string[] | undefined>(() =>
    Array.from(
      new Set(
        this.productResource
          .value()
          ?.getArrayOfVariants()
          .map((variant) => variant.colorValue.displayValue),
      ),
    ),
  );
  protected sizes = computed<string[] | undefined>(() =>
    Array.from(
      new Set(
        this.productResource
          .value()
          ?.getArrayOfVariants()
          .map((variant) => variant.sizeValue.displayValue),
      ),
    ),
  );

  protected availableSizes = computed<string[]>(() => {
    const color = this.selectedColor();
    if (!color) return [];
    return Array.from(
      new Set(
        this.productResource
          .value()
          ?.getAvailableSizeByColor(color)
          .map((s) => s.displayValue) ?? [],
      ),
    );
  });

  protected selectedColorValue = linkedSignal<string | undefined>(
    () => this.getAllVariants()?.[0]?.colorValue.displayValue,
  );

  protected selectedColor = computed<Color | undefined>(
    () =>
      this.getAllVariants()?.find((v) => v.colorValue.displayValue === this.selectedColorValue())
        ?.colorValue,
  );

  protected selectedSizeValue = linkedSignal<string[], string | undefined>({
    source: this.availableSizes,
    computation: (sizes, previous) =>
      previous?.value && sizes.includes(previous.value) ? previous.value : sizes[0],
  });
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
