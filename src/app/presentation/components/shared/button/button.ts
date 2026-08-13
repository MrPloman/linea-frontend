import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

/**
 * Botón de la casa. Solo presentación: el manejo del click
 * se hace desde fuera con (click) sobre <app-button> o envolviéndolo.
 */
@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  readonly variant = input<ButtonVariant>('primary');
  readonly type = input<'button' | 'submit'>('button');
  readonly disabled = input(false);
  readonly fullWidth = input(false);
}
