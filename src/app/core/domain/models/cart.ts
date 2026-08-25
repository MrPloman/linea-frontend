import { CartItem } from './cartItem';
import { Money } from './money';
import { Quantity } from './quantity';

/**
 * Agregado raíz del carrito. Inmutable: cada operación devuelve un Cart nuevo.
 * La identidad de línea es el SKU (mismo criterio que usaba CartService).
 */
export class Cart {
  private constructor(private readonly items: CartItem[]) {}

  public static createEmptyCart(): Cart {
    return new Cart([]);
  }

  public static createCart(items: CartItem[]): Cart {
    return new Cart([...items]);
  }

  // ---- Comandos ----
  public addItem(item: CartItem): Cart {
    if (this.hasItem(item)) {
      return new Cart(
        this.items.map((existingItem) =>
          existingItem.checkSku(item)
            ? existingItem.updateQuantity(
                Quantity.createQuantity(existingItem.quantityOfUnits + item.quantityOfUnits),
              )
            : existingItem,
        ),
      );
    }
    return new Cart([...this.items, item]);
  }

  public addItems(items: CartItem[]): Cart {
    if (!items || items.length === 0) return this;
    return items.reduce((cart: Cart, item: CartItem) => cart.addItem(item), this);
  }

  public removeItem(item: CartItem): Cart {
    return new Cart(this.items.filter((itemInside) => !itemInside.checkSku(item)));
  }

  public updateItemQuantity(item: CartItem, newQuantity: Quantity): Cart {
    return new Cart(
      this.items.map((itemInside) =>
        itemInside.checkSku(item) ? itemInside.updateQuantity(newQuantity) : itemInside,
      ),
    );
  }

  public clear(): Cart {
    return Cart.createEmptyCart();
  }

  // ---- Consultas ----
  public hasItem(item: CartItem): boolean {
    return this.items.some((itemInside) => itemInside.checkSku(item));
  }

  public getArrayOfItems(): CartItem[] {
    return this.items;
  }

  public get itemCount(): number {
    return this.items.reduce((total: number, item: CartItem) => total + item.quantityOfUnits, 0);
  }

  public get isEmpty(): boolean {
    return this.items.length === 0;
  }

  public get subTotal(): Money {
    return this.items.reduce(
      (total: Money, item: CartItem) => total.add(item.lineTotal),
      Money.createMoney(0, 'EUR'),
    );
  }
}
