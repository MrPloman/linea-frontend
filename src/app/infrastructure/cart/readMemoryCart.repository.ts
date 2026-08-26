// infrastructure/cart/localStorageCart.ts
import { CartItem } from '../../core/domain/models/cartItem';
import { Color } from '../../core/domain/models/color';
import { Money } from '../../core/domain/models/money';
import { ProductSku } from '../../core/domain/models/productSku';
import { Quantity } from '../../core/domain/models/quantity';
import { Size } from '../../core/domain/models/size';

const CART_STORAGE_KEY = 'cart';

export function readCartFromLocalStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return parsed.map((plain: any) =>
      CartItem.createCartItem(
        ProductSku.createProductSku(plain.sku.value),
        plain.productName,
        Size.createSize(plain.size.system, plain.size.value),
        Color.createColor(plain.color.value),
        Money.createMoney(plain.priceAtAddTime.amountInCents, plain.priceAtAddTime.currency),
        Quantity.createQuantity(plain.quantity.value),
        plain.img,
      ),
    );
  } catch {
    return [];
  }
}
