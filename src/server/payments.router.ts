import {
  CheckoutPaymentIntent,
  Client as PaypalClient,
  Environment as PaypalEnvironment,
  OrdersController,
} from '@paypal/paypal-server-sdk';
import express, { Router } from 'express';
import Stripe from 'stripe';

// Los clientes se crean de forma perezosa: si se instancian a nivel de módulo,
// el build (prerender de rutas) revienta en cuanto faltan las claves en .env.
let stripeClient: Stripe | undefined;
function getStripe(): Stripe {
  if (!stripeClient) {
    stripeClient = new Stripe(process.env['STRIPE_SECRET_KEY'] ?? '');
  }
  return stripeClient;
}

let paypalOrdersController: OrdersController | undefined;
function getPaypalOrders(): OrdersController {
  if (!paypalOrdersController) {
    const paypalClient = new PaypalClient({
      clientCredentialsAuthCredentials: {
        oAuthClientId: process.env['PAYPAL_CLIENT_ID'] ?? '',
        oAuthClientSecret: process.env['PAYPAL_CLIENT_SECRET'] ?? '',
      },
      environment: PaypalEnvironment.Sandbox,
    });
    paypalOrdersController = new OrdersController(paypalClient);
  }
  return paypalOrdersController;
}

export const paymentsRouter: Router = Router();
paymentsRouter.use(express.json());

// Claves públicas: no son secretas, pero el cliente las necesita en tiempo de
// ejecución en vez de tenerlas hardcodeadas en el bundle.
paymentsRouter.get('/config', (_req, res) => {
  res.json({
    stripePublishableKey: process.env['STRIPE_PUBLISHABLE_KEY'] ?? '',
    paypalClientId: process.env['PAYPAL_CLIENT_ID'] ?? '',
  });
});

paymentsRouter.post('/stripe/create-intent', async (req, res, next) => {
  try {
    const { amountInCents, currency, orderId } = req.body;
    const intent = await getStripe().paymentIntents.create({
      amount: amountInCents,
      currency: String(currency).toLowerCase(),
      metadata: { orderId },
    });
    res.json({ providerPaymentId: intent.id, clientSecret: intent.client_secret });
  } catch (error) {
    next(error);
  }
});

paymentsRouter.post('/stripe/verify', async (req, res, next) => {
  try {
    const { providerPaymentId } = req.body;
    const intent = await getStripe().paymentIntents.retrieve(providerPaymentId);
    const status = intent.status === 'succeeded' ? 'succeeded' : intent.status === 'canceled' ? 'failed' : 'pending';
    res.json({ providerPaymentId: intent.id, status });
  } catch (error) {
    next(error);
  }
});

paymentsRouter.post('/paypal/create-order', async (req, res, next) => {
  try {
    const { amountInCents, currency, orderId } = req.body;
    const { result } = await getPaypalOrders().createOrder({
      body: {
        intent: CheckoutPaymentIntent.Capture,
        purchaseUnits: [
          {
            referenceId: orderId,
            amount: {
              currencyCode: currency,
              value: (amountInCents / 100).toFixed(2),
            },
          },
        ],
      },
    });
    res.json({ providerPaymentId: result.id });
  } catch (error) {
    next(error);
  }
});

paymentsRouter.post('/paypal/capture-order', async (req, res, next) => {
  try {
    const { providerPaymentId } = req.body;
    const { result } = await getPaypalOrders().captureOrder({ id: providerPaymentId });
    const status = result.status === 'COMPLETED' ? 'succeeded' : result.status === 'VOIDED' ? 'failed' : 'pending';
    res.json({ providerPaymentId: result.id, status });
  } catch (error) {
    next(error);
  }
});
