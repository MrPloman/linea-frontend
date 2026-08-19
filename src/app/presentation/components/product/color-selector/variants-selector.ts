import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { ProductVariant } from '../../../../core/domain/types/productVariant';

export interface ColorOptionVM {
  name: string;
  value: string;
}

/**
 * Selector de color con muestras. El color marcado es estado puramente visual.
 * TODO(pol): conectar la selección con la variante real del producto.
 */
@Component({
  selector: 'app-variants-selector',
  templateUrl: './variants-selector.html',
  styleUrl: './color-selector.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsSelector {
  readonly variants = input.required<ProductVariant[]>();

  protected readonly selectedVariantIndex = signal(0);
  protected readonly selectedVariantName = computed(
    () => this.variants()[this.selectedVariantIndex()]?.sku ?? '',
  );

  protected select(index: number): void {
    this.selectedVariantIndex.set(index);
  }
}
