import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Indicador de carga accesible (role="status"). */
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Spinner {
  readonly label = input('Cargando…');
  readonly size = input<'sm' | 'md'>('md');
}
