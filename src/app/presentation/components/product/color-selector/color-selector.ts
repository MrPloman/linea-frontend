import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

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
  readonly availableColors = input<string[]>([]);

  public selected = model<string | undefined>(undefined);

  protected select(color: string): void {
    this.selected.set(color);
  }
  protected isUnavailable(color: string): boolean {
    return !this.availableColors().includes(color);
  }
}
