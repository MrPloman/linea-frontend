import { ChangeDetectionStrategy, Component, input, model, signal } from '@angular/core';

/**
 * Selector de talla. La talla marcada es estado puramente visual.
 * TODO(pol): conectar la selección con la lógica de carrito/stock real.
 */
@Component({
  selector: 'app-size-selector',
  templateUrl: './size-selector.html',
  styleUrl: './size-selector.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizeSelector {
  readonly sizes = model<string[]>([]);
  /** Tallas agotadas (solo visual) — TODO(pol): vendrá del stock real */
  readonly unavailable = input<string[]>([]);

  protected readonly selected = signal<string | null>(null);

  protected select(size: string): void {
    this.selected.set(size);
  }

  protected isUnavailable(size: string): boolean {
    return this.unavailable().includes(size);
  }
  constructor() {}
}
