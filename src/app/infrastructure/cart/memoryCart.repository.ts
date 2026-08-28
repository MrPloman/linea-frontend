import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CartItem } from '../../core/domain/models/cartItem';
import { Color } from '../../core/domain/models/color';
import { Money } from '../../core/domain/models/money';
import { ProductSku } from '../../core/domain/models/productSku';
import { Quantity } from '../../core/domain/models/quantity';
import { Size } from '../../core/domain/models/size';
import { CartRepository } from '../../core/domain/ports/cart.repository';

@Injectable({ providedIn: 'root' })
export class InMemoryCartRepository implements CartRepository {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  async load(): Promise<CartItem[]> {
    try {
      if (!this.isBrowser) return [];
      const raw = localStorage.getItem('cart');
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
    } catch (error) {
      return [];
    }
  }

  async save(cart: CartItem[]): Promise<void> {
    if (!this.isBrowser) return;
    await localStorage.setItem('cart', JSON.stringify(cart));
  }
  async clear(): Promise<void> {
    if (!this.isBrowser) return;
    const cart = localStorage.getItem('cart');
    if (!cart) return;
    await localStorage.removeItem('cart');
  }
}
