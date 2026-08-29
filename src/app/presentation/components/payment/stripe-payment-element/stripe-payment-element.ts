import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { firstValueFrom } from 'rxjs';
import { Money } from '../../../../core/domain/models/money';
import { STRIPE_PAYMENT_GATEWAY } from '../../../../core/application/tokens/paymentGatewayToken';
import { Button } from '../../shared/button/button';

/**
 * Envuelve el Payment Element de Stripe (https://docs.stripe.com/payments/payment-element).
 * Crea el PaymentIntent contra nuestro backend, monta el widget de Stripe.js
 * y confirma el pago. `redirect: 'if_required'` evita salir de la SPA salvo
 * que el método de pago exija una redirección (p.ej. 3D Secure).
 */
@Component({
  selector: 'app-stripe-payment-element',
  imports: [Button],
  templateUrl: './stripe-payment-element.html',
  styleUrl: './stripe-payment-element.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StripePaymentElement {
  private readonly http = inject(HttpClient);
  private readonly stripeGateway = inject(STRIPE_PAYMENT_GATEWAY);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly amount = input.required<Money>();
  readonly orderId = input.required<string>();

  readonly paid = output<void>();
  readonly paymentFailed = output<string>();

  protected readonly mountPoint = viewChild.required<ElementRef<HTMLDivElement>>('paymentElement');
  protected readonly ready = signal(false);
  protected readonly submitting = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;
  private providerPaymentId: string | null = null;

  constructor() {
    afterNextRender(() => {
      if (this.isBrowser) void this.setup();
    });
  }

  private async setup(): Promise<void> {
    const [{ stripePublishableKey }, { providerPaymentId, clientSecret }] = await Promise.all([
      firstValueFrom(this.http.get<{ stripePublishableKey: string }>('/api/payments/config')),
      this.stripeGateway.createPayment(this.amount(), this.orderId()),
    ]);

    const stripe = await loadStripe(stripePublishableKey);
    if (!stripe || !clientSecret) {
      this.errorMessage.set('No se ha podido inicializar Stripe.');
      return;
    }

    this.stripe = stripe;
    this.providerPaymentId = providerPaymentId;
    this.elements = stripe.elements({ clientSecret });
    this.elements.create('payment').mount(this.mountPoint().nativeElement);
    this.ready.set(true);
  }

  protected async confirm(): Promise<void> {
    if (!this.stripe || !this.elements || !this.providerPaymentId) return;

    this.submitting.set(true);
    this.errorMessage.set(null);

    const { error } = await this.stripe.confirmPayment({
      elements: this.elements,
      redirect: 'if_required',
      confirmParams: { return_url: window.location.href },
    });

    if (error) {
      this.fail(error.message ?? 'No se ha podido procesar el pago.');
      return;
    }

    // redirect: 'if_required' solo nos deja seguir aquí si no hizo falta
    // redirigir. Verificamos el estado real contra nuestro backend antes de
    // dar el pago por bueno: nunca nos fiamos solo de la confirmación del cliente.
    const result = await this.stripeGateway.capturePayment(this.providerPaymentId);
    this.submitting.set(false);

    if (result.status === 'succeeded') {
      this.paid.emit();
    } else {
      this.fail('El pago no se ha podido confirmar.');
    }
  }

  private fail(message: string): void {
    this.errorMessage.set(message);
    this.submitting.set(false);
    this.paymentFailed.emit(message);
  }
}
