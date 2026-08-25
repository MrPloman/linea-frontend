import { createReducer, on } from '@ngrx/store';
import { CartActions } from './cart.actions';
import { initialState } from './index';

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addItem, (state, { item }) => {
    return {
      ...state,
      cart: state.cart.addItem(item),
    };
  }),
  on(CartActions.removeItem, (state, { item }) => ({
    ...state,
    items: state.cart.getArrayOfItems().filter((i) => !i.isSameCartItem(item)),
  })),
  // TODO: tu turno — quantityUpdated y cartCleared, mismo patrón inmutable que ya conoces
);
