import { InjectionToken } from '@angular/core';
import { PaymentGateway } from '../../domain/ports/payment.gateway';

export const STRIPE_PAYMENT_GATEWAY = new InjectionToken<PaymentGateway>('StripePaymentGateway');
export const PAYPAL_PAYMENT_GATEWAY = new InjectionToken<PaymentGateway>('PaypalPaymentGateway');
