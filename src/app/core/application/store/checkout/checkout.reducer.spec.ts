import { CheckoutActions } from './checkout.actions';
import { checkoutReducer } from './checkout.reducer';
import { initialState } from '.';
import { Money } from '../../../domain/models/money';

describe('checkoutReducer', () => {
  it('nests the updated shipping method under state.checkout', () => {
    const shipping = { method: 'express' as const, price: Money.createMoney(495, 'EUR') };

    const state = checkoutReducer(initialState, CheckoutActions.setMethod({ shipping }));

    expect(state.checkout.shippingMethod).toEqual(shipping);
  });

  it('nests the updated address under state.checkout', () => {
    const address = {
      name: 'Ana',
      lastName: 'Gomez',
      street: 'Calle Falsa 123',
      zip: 28080,
      city: 'Madrid',
      phone: 600000000,
    };

    const state = checkoutReducer(initialState, CheckoutActions.setAddress({ address }));

    expect(state.checkout.address).toEqual(address);
  });

  it('resets to initialState on clear', () => {
    const shipping = { method: 'express' as const, price: Money.createMoney(495, 'EUR') };
    const changed = checkoutReducer(initialState, CheckoutActions.setMethod({ shipping }));

    const state = checkoutReducer(changed, CheckoutActions.clear());

    expect(state).toEqual(initialState);
  });
});
