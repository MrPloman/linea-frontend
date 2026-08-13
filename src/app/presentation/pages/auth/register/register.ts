import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Button } from '@presentation/components/shared/button/button';
import { InputField } from '@presentation/components/shared/input/input';

/** Registro — formulario visual, sin creación de cuenta real. */
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, Button, InputField],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  private readonly fb = inject(NonNullableFormBuilder);

  // TODO(pol): validadores (email válido, contraseñas iguales…) + registro real
  protected readonly form = this.fb.group({
    firstName: [''],
    email: [''],
    password: [''],
    confirmPassword: [''],
  });
}
