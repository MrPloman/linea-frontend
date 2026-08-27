import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Button } from '@presentation/components/shared/button/button';
import { InputField } from '@presentation/components/shared/input/input';
import { CartFacade } from '../../../core/application/store/cart/cart.facade';

/**
 * Checkout por pasos (dirección → envío → pago), puramente visual.
 * `currentStep` es estado de UI (qué panel se muestra), no de negocio.
 */
@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, RouterLink, Button, InputField],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Checkout {
  private readonly fb = inject(NonNullableFormBuilder);
  protected readonly cartFacade = inject(CartFacade);
  protected submitted = signal(false);

  protected readonly steps = [
    { number: 1, label: 'Dirección' },
    { number: 2, label: 'Envío' },
    { number: 3, label: 'Pago' },
  ] as const;

  // TODO(pol): validar el paso actual antes de permitir avanzar
  protected readonly currentStep = signal<number>(1);

  // TODO(pol): validadores, autocompletado de direcciones y envío real del pedido
  protected readonly addressForm = this.fb.group({
    firstName: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñÜüÇç]{2,}(?:\s+[A-Za-zÁÉÍÓÚáéíóúÑñÜüÇç]{2,})*$/),
      ],
    ],
    lastName: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñÜüÇç]{2,}(?:\s+[A-Za-zÁÉÍÓÚáéíóúÑñÜüÇç]{2,})*$/),
      ],
    ],
    street: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(/^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñÜüÇçºª\s.,#\-\/]{5,100}$/),
      ],
    ],
    zip: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/),
      ],
    ],
    city: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñÜüÇçºª\s.,#\-\/]{2,100}$/),
      ],
    ],
    phone: [
      '',
      [
        Validators.required,
        Validators.minLength(9),
        Validators.pattern(/^(?:\+34\s?|0034\s?)?[67]\d{8}$/),
      ],
    ],
  });

  // TODO(pol): pasarela de pago real. NUNCA guardar datos de tarjeta en claro.
  protected readonly paymentForm = this.fb.group({
    cardHolder: [''],
    cardNumber: [''],
    cardExpiry: [''],
    cardCvc: [''],
  });

  protected next(): void {
    switch (this.currentStep()) {
      case 1:
        if (this.addressForm.invalid) {
          this.addressForm.markAllAsTouched();
          this.submitted.set(true);
          return;
        }
        break;
      default:
        break;
    }
    this.currentStep.update((step) => Math.min(step + 1, this.steps.length));
  }

  protected previous(): void {
    this.currentStep.update((step) => Math.max(step - 1, 1));
  }
}
