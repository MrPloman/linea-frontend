import { createReducer, on } from '@ngrx/store';
import { CheckoutActions } from './checkout.actions';
import { initialState } from './index';

export const checkoutReducer = createReducer(
  initialState,
  on(CheckoutActions.setAddress, (state, { address }) => ({
    ...state,
    checkout: {
      ...state.checkout,
      address,
    },
  })),
  on(CheckoutActions.setMethod, (state, { shipping }) => ({
    ...state,
    checkout: {
      ...state.checkout,
      shippingMethod: shipping,
    },
  })),
  on(CheckoutActions.clear, () => initialState),
);
