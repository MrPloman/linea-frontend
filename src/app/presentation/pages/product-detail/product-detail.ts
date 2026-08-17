import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';

import {
  ColorOptionVM,
  ColorSelector,
} from '@presentation/components/product/color-selector/color-selector';
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
import { Product } from '../../../core/domain/models/product';

/** Ficha de producto (PDP). */
@Component({
  selector: 'app-product-detail',
  imports: [Breadcrumbs, Button, ProductCard, ProductGallery, SizeSelector, ColorSelector],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail {
  // TODO(pol): cargar el producto real a partir del parámetro :id de la ruta
  // (inject(ActivatedRoute) + caso de uso en core/application).
  id = input.required<string>();
  private findProductByIdUseCase = inject(FindProductByIdUseCase);
  protected product = signal<Product | null>(null);

  protected readonly galleryImages = MOCK_GALLERY_IMAGES;
  protected readonly related = MOCK_PRODUCTS.slice(4, 8);

  protected readonly breadcrumbItems: BreadcrumbItemVM[] = [
    { label: 'Inicio', link: '/' },
    { label: 'Mujer', link: '/catalogo' },
    { label: 'Blazer estructurada de lana' },
  ];

  protected readonly colorOptions: ColorOptionVM[] = [
    { name: 'Beige', value: '#d0bfae' },
    { name: 'Antracita', value: '#44413c' },
  ];

  protected readonly unavailableSizes = ['XS'];

  constructor() {}
}
