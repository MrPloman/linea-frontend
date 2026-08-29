import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Money } from '../../core/domain/models/money';
import {
  PaymentGateway,
  PaymentInit,
  PaymentResult,
} from '../../core/domain/ports/payment.gateway';

@Injectable({ providedIn: 'root' })
export class StripePaymentAdapter implements PaymentGateway {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  async createPayment(amount: Money, orderId: string): Promise<PaymentInit> {
    if (!this.isBrowser) throw new Error('Stripe payment must be created in the browser');
    return firstValueFrom(
      this.http.post<PaymentInit>('/api/payments/stripe/create-intent', {
        amountInCents: amount.amountInCentsValue,
        currency: amount.currencyValue,
        orderId,
      }),
    );
  }

  async capturePayment(providerPaymentId: string): Promise<PaymentResult> {
    if (!this.isBrowser) throw new Error('Stripe payment must be captured in the browser');
    return firstValueFrom(
      this.http.post<PaymentResult>('/api/payments/stripe/verify', {
        providerPaymentId,
      }),
    );
  }
}
