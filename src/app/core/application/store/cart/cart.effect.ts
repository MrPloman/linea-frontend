import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { tap, withLatestFrom } from 'rxjs';
import { CART_REPOSITORY } from '../../useCases/cart/cartRepositoryToken';
import { CartActions } from './cart.actions';
import { selectCartState } from './cart.selector';

// cart.effects.ts
export class CartEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private cartRepository = inject(CART_REPOSITORY); // el token del puerto, como ya hicisteis con ProductRepository

  syncCartToStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CartActions.addItem,
          CartActions.removeItem,
          CartActions.updateQuantity,
          CartActions.clearCart,
        ),
        withLatestFrom(this.store.pipe(select(selectCartState))),
        tap(([, { cart }]) => {
          this.cartRepository.save(cart);
        }),
      ),
    { dispatch: false },
  );
}
