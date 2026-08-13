import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Badge } from '@presentation/components/shared/badge/badge';
import { ProductMockVM } from '@presentation/mocks/products.mock';

/** Tarjeta de producto para grids y carruseles. */
@Component({
  selector: 'app-product-card',
  imports: [RouterLink, Badge],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  readonly product = input.required<ProductMockVM>();
}
