import { CartState } from '.';
import { Cart } from '../../../domain/models/cart';
import { Money } from '../../../domain/models/money';
import { CheckoutState, Shipping } from '../checkout';
import { selectCartTotal, selectShippingCost } from './cart.selector';

function buildState(shippingMethod: Shipping): { cart: CartState } & { checkout: CheckoutState } {
  return {
    cart: { cart: Cart.createEmptyCart() },
    checkout: {
      checkout: {
        address: {
          name: '',
          lastName: '',
          street: '',
          zip: undefined,
          city: '',
          phone: undefined,
        },
        shippingMethod,
      },
    },
  };
}

describe('cart selectors + checkout shipping method', () => {
  it('adds the selected shipping method extra cost on top of the base shipping cost', () => {
    const standardState = buildState({ method: 'standard', price: Money.createMoney(0, 'EUR') });

    expect(selectShippingCost(standardState).toDisplayString()).toBe('7.50');
    expect(selectCartTotal(standardState).toDisplayString()).toBe('7.50');
  });

  it('recomputes shipping cost and total when the shipping method changes', () => {
    const expressState = buildState({ method: 'express', price: Money.createMoney(495, 'EUR') });

    expect(selectShippingCost(expressState).toDisplayString()).toBe('12.45');
    expect(selectCartTotal(expressState).toDisplayString()).toBe('12.45');
  });
});
