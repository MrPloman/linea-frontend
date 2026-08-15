import { Injectable, computed, signal } from '@angular/core';
import { CartItem } from '../../domain/models/cartItem';
import { Money } from '../../domain/models/money';
import { ProductSku } from '../../domain/models/productSku';
import { Quantity } from '../../domain/models/quantity';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _cart = signal<CartItem[]>([]);
  public readonly cart = this._cart.asReadonly();

  public readonly itemCount = computed<number>(() =>
    this._cart().reduce(
      (prevVal: number, cartItem: CartItem) => prevVal + cartItem.quantityOfUnits,
      0,
    ),
  );
  public readonly isEmpty = computed<boolean>(() => this._cart().length === 0);

  public readonly total = computed(() =>
    this.cart().reduce((acc, item) => acc.add(item.lineTotal), Money.createMoney(0, 'EUR')),
  );

  public addItem(item: CartItem): void {
    this._cart.update((items) => [...items, item]);
  }

  public removeItem(item: CartItem): void {
    this._cart.set(this.cart().filter((itemInside: CartItem) => !itemInside.isSameCartItem(item)));
  }

  public updateItemQuantity(sku: ProductSku, newQuantity: Quantity): void {
    this._cart.set(
      this.cart().map((cartItem: CartItem) => {
        if (cartItem.checkSku(sku)) {
          return cartItem.updateQuantity(newQuantity);
        }
        return cartItem;
      }),
    );
  }
  public clear() {
    this._cart.set([]);
  }
}
