import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  resource,
  signal,
} from '@angular/core';

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
import { ProductSku } from '../../../core/domain/models/productSku';
import { ProductVariant } from '../../../core/domain/models/productVariant';
import { VariantsSelector } from '../../components/product/color-selector/variants-selector';

/** Ficha de producto (PDP). */
@Component({
  selector: 'app-product-detail',
  imports: [Breadcrumbs, Button, ProductCard, ProductGallery, SizeSelector, VariantsSelector],
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

  public selectedVariantIndex = signal(0);

  public getAllVariants = computed(() => this.productResource.value()?.getArrayOfVariants());
  protected unavailableVariants = computed(() => this.selectedVariant()?.stockValue.isZero());
  protected readonly galleryImages = MOCK_GALLERY_IMAGES;
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
  protected sizes = computed<string[] | undefined>(() => {
    let arr = this.productResource
      .value()
      ?.getArrayOfVariants()
      .map((variant) => variant.sizeValue.displayValue);

    return Array.from(new Set(arr));
  });
  protected readonly related = MOCK_PRODUCTS.slice(4, 8);

  protected readonly breadcrumbItems: BreadcrumbItemVM[] = [
    { label: 'Inicio', link: '/' },
    { label: 'Mujer', link: '/catalogo' },
    { label: 'Blazer estructurada de lana' },
  ];

  // protected readonly colorOptions: ColorOptionVM[] = [
  //   { name: 'Beige', value: '#d0bfae' },
  //   { name: 'Antracita', value: '#44413c' },
  // ];

  protected readonly unavailableSizes = ['XS'];

  constructor() {}
}
