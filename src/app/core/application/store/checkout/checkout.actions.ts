import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Address, Shipping } from '.';

// cart.actions.ts
export const CheckoutActions = createActionGroup({
  source: 'Checkout',
  events: {
    setAddress: props<{ address: Address }>(),
    setMethod: props<{ shipping: Shipping }>(),
    clear: emptyProps(),
  },
});
