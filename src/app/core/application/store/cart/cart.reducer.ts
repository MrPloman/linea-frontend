import { createReducer, on } from '@ngrx/store';
import { CartActions } from './cart.actions';
import { initialState } from './index';

export const cartReducer = createReducer(
  initialState,
  on(CartActions['[ADD_ITEM]'], (state, { item }) => {
    return {
      ...state,
      items: [...state.items, item],
    };
  }),
  // on(CartActions['[REMOVE_ITEM]'], (state, { item }) => ({
  //   ...state,
  //   items: state.items.filter((i) => !i.isSameCartItem(item)),
  // })),
  // TODO: tu turno — quantityUpdated y cartCleared, mismo patrón inmutable que ya conoces
);
