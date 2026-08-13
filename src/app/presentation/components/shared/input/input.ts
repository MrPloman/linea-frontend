import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

/**
 * Campo de formulario con etiqueta, pista y hueco de error.
 * Recibe el FormControl desde fuera; aquí solo hay estructura visual.
 */
@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputField {
  readonly id = input.required<string>();
  readonly label = input.required<string>();
  readonly control = input.required<FormControl>();
  readonly type = input('text');
  readonly placeholder = input('');
  readonly autocomplete = input('off');
  readonly hint = input('');
  readonly errorText = input('');

  // TODO(pol): mostrar el error según el estado real de validación del control
  // (control().invalid && control().touched). De momento el bloque queda oculto.
  protected readonly showError = false;
}
