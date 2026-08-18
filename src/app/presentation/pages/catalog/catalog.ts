import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProductCard } from '@presentation/components/product/product-card/product-card';
import {
  BreadcrumbItemVM,
  Breadcrumbs,
} from '@presentation/components/shared/breadcrumbs/breadcrumbs';
import { MOCK_PRODUCTS } from '@presentation/mocks/products.mock';

/**
 * Listado de catálogo con sidebar de filtros.
 * `isMobileFiltersOpen` es estado puramente visual (off-canvas en móvil).
 */
@Component({
  selector: 'app-catalog',
  imports: [RouterLink, Breadcrumbs, ProductCard],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'closeMobileFilters()',
  },
})
export class Catalog {
  // TODO(pol): productos, filtros y paginación reales desde core/application
  protected readonly products = signal(MOCK_PRODUCTS);

  protected readonly breadcrumbItems: BreadcrumbItemVM[] = [
    { label: 'Inicio', link: '/' },
    { label: 'Mujer' },
  ];

  // Opciones de filtro (solo visual)
  protected readonly filterCategories = [
    'Vestidos',
    'Camisas',
    'Pantalones',
    'Punto',
    'Abrigos',
    'Accesorios',
  ];
  protected readonly filterSizes = ['XS', 'S', 'M', 'L', 'XL'];
  protected readonly filterColors = [
    { name: 'Crudo', value: '#e4ddd0' },
    { name: 'Arena', value: '#d0bfae' },
    { name: 'Camel', value: '#9c7a54' },
    { name: 'Salvia', value: '#a9b2a4' },
    { name: 'Gris', value: '#a3a9b1' },
    { name: 'Negro', value: '#1c1b19' },
  ];

  protected readonly isMobileFiltersOpen = signal(false);

  protected openMobileFilters(): void {
    this.isMobileFiltersOpen.set(true);
  }

  protected closeMobileFilters(): void {
    this.isMobileFiltersOpen.set(false);
  }
  constructor() {
    console.log(this.products());
  }
}
