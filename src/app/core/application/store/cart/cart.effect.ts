import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CART_REPOSITORY } from '../../useCases/cart/cartRepositoryToken';
import { CartActions } from './cart.actions';

// cart.effects.ts
export class CartEffects {
  private actions$ = inject(Actions);
  private cartRepository = inject(CART_REPOSITORY); // el token del puerto, como ya hicisteis con ProductRepository

  syncCartToStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CartActions['[ADD_ITEM]'],
          CartActions['[REMOVE_ITEM]'],
          CartActions['[UPDATE_QUANTITY]'],
          CartActions['[CLEAR_CART]'],
        ),
        // entra una de estas actions, llama a cartRepository.saveCart(...)"?
        // Pista: no necesitas el resultado de la llamada anterior si llega otra encima
      ),
    { dispatch: false }, // este effect no despacha ninguna action nueva, solo tiene un efecto secundario
  );
}
