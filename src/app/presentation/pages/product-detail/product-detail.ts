import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Breadcrumbs, BreadcrumbItemVM } from '@presentation/components/shared/breadcrumbs/breadcrumbs';
import { Button } from '@presentation/components/shared/button/button';
import { ProductCard } from '@presentation/components/product/product-card/product-card';
import { ProductGallery } from '@presentation/components/product/product-gallery/product-gallery';
import { SizeSelector } from '@presentation/components/product/size-selector/size-selector';
import { ColorSelector, ColorOptionVM } from '@presentation/components/product/color-selector/color-selector';
import { MOCK_GALLERY_IMAGES, MOCK_PRODUCTS } from '@presentation/mocks/products.mock';

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
  protected readonly product = MOCK_PRODUCTS[3];
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
}
