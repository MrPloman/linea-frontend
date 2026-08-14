import { Money } from './money';
import { ProductSku } from './productSku';
import { Size } from './size';
import { StockQuantity } from './stockQuantity';

export class CartItem {
  private constructor(
    private readonly sku: ProductSku,
    private readonly productName: string,
    private readonly size: Size,
    private readonly priceAtAddTime: Money,
    private readonly quantity: StockQuantity,
  ) {}

  public static createCartItem(
    sku: ProductSku,
    productName: string,
    size: Size,
    priceAtAddTime: Money,
    quantity: StockQuantity,
  ): CartItem {
    if (!productName || productName.trim().length === 0) {
      throw new Error('ProductName is required');
    }
    if (quantity.displayValue <= 0) {
      throw new Error('Quantity must be greater than 0');
    }

    return new CartItem(sku, productName, size, priceAtAddTime, quantity);
  }

  public updateQuantity(newQuantity: StockQuantity): CartItem {
    if (!newQuantity || newQuantity.displayValue <= 0)
      throw new Error('Quantity is required and is supposed to be 0 or positive number');
    return CartItem.createCartItem(
      this.sku,
      this.productName,
      this.size,
      this.priceAtAddTime,
      newQuantity,
    );
  }
}
