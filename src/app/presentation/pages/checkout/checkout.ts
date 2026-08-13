import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Button } from '@presentation/components/shared/button/button';
import { InputField } from '@presentation/components/shared/input/input';

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

  protected readonly steps = [
    { number: 1, label: 'Dirección' },
    { number: 2, label: 'Envío' },
    { number: 3, label: 'Pago' },
  ] as const;

  // TODO(pol): validar el paso actual antes de permitir avanzar
  protected readonly currentStep = signal(1);

  // TODO(pol): validadores, autocompletado de direcciones y envío real del pedido
  protected readonly addressForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    street: [''],
    zip: [''],
    city: [''],
    phone: [''],
  });

  // TODO(pol): pasarela de pago real. NUNCA guardar datos de tarjeta en claro.
  protected readonly paymentForm = this.fb.group({
    cardHolder: [''],
    cardNumber: [''],
    cardExpiry: [''],
    cardCvc: [''],
  });

  // TODO(pol): resumen calculado desde el carrito real
  protected readonly summary = {
    articleCount: 4,
    subtotal: '269,80 €',
    shipping: 'Gratuito',
    total: '269,80 €',
  };

  protected next(): void {
    this.currentStep.update((step) => Math.min(step + 1, this.steps.length));
  }

  protected previous(): void {
    this.currentStep.update((step) => Math.max(step - 1, 1));
  }
}
