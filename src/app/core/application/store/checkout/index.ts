export interface CheckoutState {
  checkout: {
    address: {
      name: string;
      lastName: string;
      street: string;
      zip: number | undefined;
      city: string;
      phone: number | undefined;
    };
    shippingMethod: {};
  };
}

export const initialState: CheckoutState = {
  checkout: {
    address: { name: '', lastName: '', street: '', zip: undefined, city: '', phone: undefined },
    shippingMethod: {},
  },
};
