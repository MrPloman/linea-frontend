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
import { loadScript } from '@paypal/paypal-js';
import { firstValueFrom } from 'rxjs';
import { Money } from '../../../../core/domain/models/money';
import { PAYPAL_PAYMENT_GATEWAY } from '../../../../core/application/tokens/paymentGatewayToken';

/**
 * Botones de PayPal (https://developer.paypal.com/sdk/js/). A diferencia del
 * Payment Element de Stripe, aquí el propio botón dispara todo el flujo
 * (createOrder -> aprobación en PayPal -> onApprove), no hace falta un botón
 * "Pagar" propio.
 */
@Component({
  selector: 'app-paypal-buttons',
  imports: [],
  templateUrl: './paypal-buttons.html',
  styleUrl: './paypal-buttons.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaypalButtons {
  private readonly http = inject(HttpClient);
  private readonly paypalGateway = inject(PAYPAL_PAYMENT_GATEWAY);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly amount = input.required<Money>();
  readonly orderId = input.required<string>();

  readonly paid = output<void>();
  readonly paymentFailed = output<string>();

  protected readonly mountPoint = viewChild.required<ElementRef<HTMLDivElement>>('buttonsElement');
  protected readonly loading = signal(true);
  protected readonly errorMessage = signal<string | null>(null);

  constructor() {
    afterNextRender(() => {
      if (this.isBrowser) void this.setup();
    });
  }

  private async setup(): Promise<void> {
    const { paypalClientId } = await firstValueFrom(
      this.http.get<{ paypalClientId: string }>('/api/payments/config'),
    );

    const paypal = await loadScript({
      clientId: paypalClientId,
      currency: this.amount().currencyValue,
    });

    if (!paypal?.Buttons) {
      this.errorMessage.set('No se ha podido cargar PayPal.');
      this.loading.set(false);
      return;
    }

    await paypal
      .Buttons({
        createOrder: async () => {
          const { providerPaymentId } = await this.paypalGateway.createPayment(
            this.amount(),
            this.orderId(),
          );
          return providerPaymentId;
        },
        onApprove: async (data) => {
          const result = await this.paypalGateway.capturePayment(data.orderID);
          if (result.status === 'succeeded') {
            this.paid.emit();
          } else {
            this.fail('El pago no se ha podido confirmar.');
          }
        },
        onError: (err) => {
          this.fail(err['message'] ? String(err['message']) : 'No se ha podido procesar el pago.');
        },
      })
      .render(this.mountPoint().nativeElement);

    this.loading.set(false);
  }

  private fail(message: string): void {
    this.errorMessage.set(message);
    this.paymentFailed.emit(message);
  }
}
