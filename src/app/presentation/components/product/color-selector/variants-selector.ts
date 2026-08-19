import { ChangeDetectionStrategy, Component, computed, model, signal } from '@angular/core';

export interface ColorOptionVM {
  name: string;
  value: string;
}

/**
 * Selector de color con muestras. El color marcado es estado puramente visual.
 * TODO(pol): conectar la selección con la variante real del producto.
 */
@Component({
  imports: [],
  selector: 'app-variants-selector',
  templateUrl: './variants-selector.html',
  styleUrl: './variants-selector.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsSelector {
  readonly colors = model<string[]>([]);
  protected selectedColorName = signal('');

  public readonly selectedVariantIndex = model<number>(0);
  protected readonly selectedVariantName = computed(
    () => this.colors()[this.selectedVariantIndex()] ?? '',
  );
  protected readonly selectedIndex = signal(0);
  protected select(index: number): void {
    this.selectedVariantIndex.set(index);
  }
}
