import { inject } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { map, switchMap, tap, withLatestFrom } from 'rxjs';
import { AddItemToCartUseCase } from '../../useCases/cart/addItemToCart';
import { ClearCartUseCase } from '../../useCases/cart/clearCart';
import { GetCarttUseCase } from '../../useCases/cart/getCart';
import { RemoveItemFromCartUseCase } from '../../useCases/cart/removeItemFromCart';
import { UpdateCartItemQuantityUseCase } from '../../useCases/cart/updateCartItemQuantity';
import { CartActions } from './cart.actions';
import { selectCartState } from './cart.selector';
// cart.effects.ts
export class CartEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private addCartUseCase = inject(AddItemToCartUseCase);
  private updateQuantityUseCase = inject(UpdateCartItemQuantityUseCase);
  private removeCartUseCase = inject(RemoveItemFromCartUseCase);
  private clearUseCase = inject(ClearCartUseCase);
  private getCartUseCase = inject(GetCarttUseCase);

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
        tap(async ([{ type }, { cart }]) => {
          switch (type) {
            case CartActions.addItem.type:
              this.addCartUseCase.execute(cart.getArrayOfItems());
              break;
            case CartActions.removeItem.type:
              this.removeCartUseCase.execute(cart.getArrayOfItems());
              break;
            case CartActions.updateQuantity.type:
              this.updateQuantityUseCase.execute(cart.getArrayOfItems());
              break;
            case CartActions.clearCart.type:
              this.clearUseCase.execute();
              break;

            default:
              break;
          }
        }),
      ),
    { dispatch: false },
  );
  loadCartOnInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      switchMap(() => this.getCartUseCase.execute()),
      map((items) => CartActions.getCartSuccess({ items })),
    ),
  );
}
