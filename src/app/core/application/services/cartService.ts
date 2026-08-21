import { Injectable, computed, signal } from '@angular/core';
import { CartItem } from '../../domain/models/cartItem';
import { Money } from '../../domain/models/money';
import { Quantity } from '../../domain/models/quantity';
import { getShippingCost, qualifiesForFreeShipping } from '../../domain/policies/shippingPolicy';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _cart = signal<CartItem[]>([]);
  // Readonly Status
  public readonly cart = this._cart.asReadonly();
  public readonly itemCount = computed<number>(() =>
    this._cart().reduce(
      (prevVal: number, cartItem: CartItem) => prevVal + cartItem.quantityOfUnits,
      0,
    ),
  );
  public readonly isEmpty = computed<boolean>(() => this._cart().length === 0);

  // Readonly Money Values
  public readonly subTotal = computed(() =>
    this.cart().reduce((acc, item) => acc.add(item.lineTotal), Money.createMoney(0, 'EUR')),
  );
  public readonly shippingCost = computed(() => {
    const currentSubTotal = this.subTotal();

    if (qualifiesForFreeShipping(currentSubTotal)) {
      return Money.createMoney(0, 'EUR');
    }
    return getShippingCost(currentSubTotal);
  });

  public readonly vat = computed(() => {
    const totalWithVat = this.subTotal().add(this.shippingCost());
    const totalWithoutVat = totalWithVat.divide(1.21);
    return totalWithVat.substract(totalWithoutVat);
  });
  public readonly total = computed(() => this.subTotal().add(this.shippingCost()));

  // Methods
  public addItem(item: CartItem): void {
    if (this.productIsInCart(item)) this.addOneMore(item);
    else this._cart.update((items) => [...items, item]);
  }

  public addGroupOfItems(items: CartItem[]): void {
    this._cart.update((currentItems) => [...currentItems, ...items]);
  }

  public removeItem(item: CartItem): void {
    this._cart.set(this.cart().filter((itemInside: CartItem) => !itemInside.isSameCartItem(item)));
  }
  public updateItemQuantity(cartItem: CartItem, newQuantity: Quantity): void {
    this._cart.set(
      this.cart().map((_cartItem: CartItem) => {
        if (_cartItem.checkSku(cartItem)) {
          return _cartItem.updateQuantity(newQuantity);
        }
        return _cartItem;
      }),
    );
  }
  public productIsInCart(product: CartItem): boolean {
    return this.cart().some((cartProduct: CartItem) => cartProduct.checkSku(product));
  }
  public addOneMore(product: CartItem) {
    const foundProduct = this.cart().find((productFind) => productFind.checkSku(product));
    if (!foundProduct) return;
    this.updateItemQuantity(
      foundProduct,
      Quantity.createQuantity(foundProduct.quantityOfUnits + 1),
    );
  }
  public clear() {
    this._cart.set([]);
  }
}
