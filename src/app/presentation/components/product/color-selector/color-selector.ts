import { ChangeDetectionStrategy, Component, computed, model, signal } from '@angular/core';

export interface ColorOptionVM {
  name: string;
  value: string;
}

/**
 * Selector de color con muestras. El color marcado es estado puramente visual.
 * TODO(pol): conectar la selección con la colore real del producto.
 */
@Component({
  imports: [],
  selector: 'app-color-selector',
  templateUrl: './color-selector.html',
  styleUrl: './color-selector.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorSelector {
  readonly colors = model<string[]>([]);

  public readonly selectedColorIndex = model<number>(0);
  protected readonly selectedColorName = computed(
    () => this.colors()[this.selectedColorIndex()] ?? '',
  );
  protected readonly selectedIndex = signal(0);
  protected select(index: number): void {
    this.selectedColorIndex.set(index);
  }
}
