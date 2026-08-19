import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { ProductVariant } from '../../../../core/domain/models/productVariant';

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
  styleUrl: './variants-selector.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsSelector {
  readonly variants = input.required<ProductVariant[]>();

  public readonly selectedVariantIndex = model<number>(0);
  protected readonly selectedVariantName = computed(
    () => this.variants()[this.selectedVariantIndex()]?.skuValue ?? '',
  );

  protected select(index: number): void {
    this.selectedVariantIndex.set(index);
  }
}
