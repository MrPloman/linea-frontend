import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type BadgeVariant = 'nuevo' | 'rebajas' | 'neutro';

/** Etiqueta pequeña para estados de producto (Nuevo, Rebajas…). */
@Component({
  selector: 'app-badge',
  templateUrl: './badge.html',
  styleUrl: './badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Badge {
  readonly variant = input<BadgeVariant>('neutro');
}
