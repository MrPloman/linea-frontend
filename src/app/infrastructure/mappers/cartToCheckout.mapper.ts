import { Injectable } from '@angular/core';
import { CartItem } from '../../core/domain/models/cartItem';
import { Color } from '../../core/domain/models/color';
import { Money } from '../../core/domain/models/money';
import { ProductSku } from '../../core/domain/models/productSku';
import { Size } from '../../core/domain/models/size';
import { StockQuantity } from '../../core/domain/models/stockQuantity';
import { Image } from '../../core/domain/types/image';
import { OrderLine } from '../../core/domain/types/orderLine';
import { SizeSystem } from '../../core/domain/types/systemSize';

@Injectable({ providedIn: 'root' })
export class CartToCheckoutMapper {
  constructor() {}
  public mapCartToCheckout(cart: CartItem[]): OrderLine[] {
    return cart.map((item) => {
      if (!this.checkIfCartItemIsValid(item)) {
        throw new Error(`Invalid cart item: ${JSON.stringify(item)}`);
      }
      if (!item.checkSku(item) || !item.skuValue || item.skuValue.trim() === '') {
        throw new Error(`Invalid SKU for cart item: ${JSON.stringify(item)}`);
      }
      if (item.quantityOfUnits <= 0) {
        throw new Error(`Invalid quantity for cart item: ${JSON.stringify(item)}`);
      }

      return {
        sku: ProductSku.createProductSku(item.skuValue),
        quantity: StockQuantity.createStockQuantity(item.quantityOfUnits),
        price: Money.createMoney(
          item.priceAtAddTimeValue.amountInCentsValue,
          item.priceAtAddTimeValue.currencyValue,
        ),
        priceAtPurchase: Money.createMoney(
          item.priceAtAddTimeValue.amountInCentsValue,
          item.priceAtAddTimeValue.currencyValue,
        ),
        productName: item.checkSku(item) ? item.productNameValue : '',
        size: Size.createSize(
          item.exposedSize.displayValue as SizeSystem,
          item.exposedSize.displayValue,
        ),
        color: Color.createColor(item.colorValue),
        image: { url: item.image.url, altText: item.image.altText } as Image,
      };
    });
  }

  private checkIfCartItemIsValid(cartItem: CartItem): boolean {
    return (
      cartItem.skuValue !== undefined &&
      cartItem.quantityOfUnits > 0 &&
      cartItem.priceAtAddTimeValue !== undefined &&
      cartItem.productNameValue !== undefined &&
      cartItem.sizeValue !== undefined &&
      cartItem.colorValue !== undefined &&
      cartItem.image.url !== undefined
    );
  }
}
