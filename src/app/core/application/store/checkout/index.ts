import { Money } from '../../../domain/models/money';

export type ShippingMethod = 'standard' | 'express' | 'pickup';

export interface Address {
  name: string;
  lastName: string;
  street: string;
  zip: number | undefined;
  city: string;
  phone: number | undefined;
}
export interface Shipping {
  method: ShippingMethod;
  price: Money;
  store?: {};
}
export interface CheckoutState {
  checkout: {
    address: Address;
    shippingMethod: Shipping;
  };
}

export const initialState: CheckoutState = {
  checkout: {
    address: { name: '', lastName: '', street: '', zip: undefined, city: '', phone: undefined },
    shippingMethod: { price: Money.createMoney(0, 'EUR'), method: 'standard' },
  },
};
