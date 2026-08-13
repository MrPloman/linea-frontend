import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProductCard } from '@presentation/components/product/product-card/product-card';
import { MOCK_PRODUCTS } from '@presentation/mocks/products.mock';

/** Página de búsqueda con resultados mock. */
@Component({
  selector: 'app-search-results',
  imports: [RouterLink, ProductCard],
  templateUrl: './search-results.html',
  styleUrl: './search-results.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResults {
  // TODO(pol): búsqueda real (query en la URL + caso de uso de búsqueda)
  protected readonly query = 'lino';
  protected readonly results = MOCK_PRODUCTS.slice(0, 6);
  protected readonly popularSearches = ['Vestidos', 'Lino', 'Blazer', 'Total look beige', 'Rebajas'];
}
