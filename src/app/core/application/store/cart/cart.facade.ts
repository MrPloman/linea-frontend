// core/application/facades/cart.facade.ts
import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import { CartItem } from '../../../domain/models/cartItem';
import { Money } from '../../../domain/models/money';
import { Quantity } from '../../../domain/models/quantity';
import { CartActions } from './cart.actions';
import {
  selectCartItems,
  selectCartSubtotal,
  selectIsCartEmpty,
  selectItemCount,
} from './cart.selector';

@Injectable({ providedIn: 'root' })
export class CartFacade {
  private store = inject(Store);

  public cart = toSignal(this.store.select(selectCartItems), { initialValue: [] as CartItem[] });
  public subTotal = toSignal(this.store.select(selectCartSubtotal), {
    initialValue: Money.createMoney(0, 'EUR'),
  });
  public itemCount = toSignal(this.store.select(selectItemCount), { initialValue: 0 });
  public isEmpty = toSignal(this.store.select(selectIsCartEmpty), { initialValue: true });

  public addItem(item: CartItem): void {
    this.store.dispatch(CartActions.addItem({ item }));
  }

  public removeItem(item: CartItem): void {
    this.store.dispatch(CartActions.removeItem({ item }));
  }

  public updateItemQuantity(item: CartItem, newQuantity: Quantity): void {
    this.store.dispatch(CartActions.updateQuantity({ item, newQuantity }));
  }

  public clear(): void {
    this.store.dispatch(CartActions.clearCart());
  }
}
