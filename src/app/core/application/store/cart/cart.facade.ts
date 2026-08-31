// core/application/facades/cart.facade.ts
import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import { Cart } from '../../../domain/models/cart';
import { CartItem } from '../../../domain/models/cartItem';
import { Money } from '../../../domain/models/money';
import { Quantity } from '../../../domain/models/quantity';
import { CartActions } from './cart.actions';
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartTotal,
  selectIncludedVat,
  selectIsCartEmpty,
  selectItemCount,
  selectShippingCost,
} from './cart.selector';

@Injectable({ providedIn: 'root' })
export class CartFacade {
  private store = inject(Store);

  public cart = toSignal(this.store.select(selectCartItems), {
    initialValue: Cart.createEmptyCart().getArrayOfItems(),
  });
  public total = toSignal(this.store.select(selectCartTotal), {
    initialValue: Money.createMoney(0, 'EUR'),
  });
  public subTotal = toSignal(this.store.select(selectCartSubtotal), {
    initialValue: Money.createMoney(0, 'EUR'),
  });
  public vat = toSignal(this.store.select(selectIncludedVat), {
    initialValue: Money.createMoney(0, 'EUR'),
  });
  public itemCount = toSignal(this.store.select(selectItemCount), { initialValue: 0 });
  public isEmpty = toSignal(this.store.select(selectIsCartEmpty), { initialValue: true });
  public shippingCost = toSignal(this.store.select(selectShippingCost), {
    initialValue: Money.createMoney(0, 'EUR'),
  });

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
