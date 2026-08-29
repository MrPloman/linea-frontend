import { Money } from '../models/money';

export interface PaymentInit {
  providerPaymentId: string;
  clientSecret?: string;
}

export type PaymentStatus = 'succeeded' | 'failed' | 'pending';

export interface PaymentResult {
  providerPaymentId: string;
  status: PaymentStatus;
}

export interface PaymentGateway {
  createPayment(amount: Money, orderId: string): Promise<PaymentInit>;
  capturePayment(providerPaymentId: string): Promise<PaymentResult>;
}
