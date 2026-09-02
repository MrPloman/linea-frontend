import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Address, Shipping } from '.';
import { OrderLine } from '../../../domain/types/orderLine';

// cart.actions.ts
export const CheckoutActions = createActionGroup({
  source: 'Checkout',
  events: {
    createOrder: props<{
      orderId: string;
      lines: OrderLine[];
      address: Address;
      shipping: Shipping;
    }>(),

    updateLines: props<{
      orderId: string;
      lines: OrderLine[];
    }>(),
    cancelOrder: props<{ orderId: string }>(),
    setAddress: props<{ address: Address }>(),
    setMethod: props<{ shipping: Shipping }>(),
    clear: emptyProps(),
  },
});
