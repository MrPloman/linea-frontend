import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Button } from '@presentation/components/shared/button/button';
import { InputField } from '@presentation/components/shared/input/input';

/** Inicio de sesión — formulario visual, sin autenticación real. */
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, Button, InputField],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly fb = inject(NonNullableFormBuilder);

  // TODO(pol): validadores + autenticación real (caso de uso en core/application)
  protected readonly form = this.fb.group({
    email: [''],
    password: [''],
  });
}
