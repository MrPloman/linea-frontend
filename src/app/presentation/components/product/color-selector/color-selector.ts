import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

export interface ColorOptionVM {
  name: string;
  value: string;
}

/**
 * Selector de color con muestras. El color marcado es estado puramente visual.
 * TODO(pol): conectar la selección con la variante real del producto.
 */
@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.html',
  styleUrl: './color-selector.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorSelector {
  readonly colors = input.required<ColorOptionVM[]>();

  protected readonly selectedIndex = signal(0);
  protected readonly selectedName = computed(
    () => this.colors()[this.selectedIndex()]?.name ?? '',
  );

  protected select(index: number): void {
    this.selectedIndex.set(index);
  }
}
