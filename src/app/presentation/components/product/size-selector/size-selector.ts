import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

@Component({
  selector: 'app-size-selector',
  templateUrl: './size-selector.html',
  styleUrl: './size-selector.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizeSelector {
  readonly sizes = model<string[]>([]);
  readonly availableSizes = input<string[]>([]);

  public selected = model<string | undefined>(undefined);

  protected select(size: string): void {
    this.selected.set(size);
  }
  protected isUnavailable(size: string): boolean {
    return !this.availableSizes().includes(size);
  }
}
