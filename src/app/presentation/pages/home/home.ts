import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProductCard } from '@presentation/components/product/product-card/product-card';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@presentation/mocks/products.mock';

/** Página de inicio: hero, categorías destacadas y carrusel de productos. */
@Component({
  selector: 'app-home',
  imports: [RouterLink, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  // TODO(pol): estos datos vendrán de casos de uso reales (core/application)
  protected readonly categories = MOCK_CATEGORIES;
  protected readonly featured = MOCK_PRODUCTS.slice(0, 8);
}
