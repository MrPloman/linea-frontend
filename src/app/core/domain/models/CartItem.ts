import { Image } from '../types/image';
import { Color } from './color';
import { Money } from './money';
import { ProductSku } from './productSku';
import { Quantity } from './quantity';
import { Size } from './size';

export class CartItem {
  private constructor(
    private readonly sku: ProductSku,
    private readonly productName: string,
    private readonly size: Size,
    private readonly color: Color,
    private readonly priceAtAddTime: Money,
    private readonly quantity: Quantity,
    private readonly img: Image,
  ) {}

  public static createCartItem(
    sku: ProductSku,
    productName: string,
    size: Size,
    color: Color,
    priceAtAddTime: Money,
    quantity: Quantity,
    img: Image,
  ): CartItem {
    if (!productName || productName.trim().length === 0) {
      throw new Error('ProductName is required');
    }
    if (quantity.displayValue <= 0) {
      throw new Error('Quantity must be greater than 0');
    }

    return new CartItem(sku, productName, size, color, priceAtAddTime, quantity, img);
  }

  public updateQuantity(newQuantity: Quantity): CartItem {
    if (!newQuantity || newQuantity.displayValue <= 0)
      throw new Error('Quantity is required and is supposed to be 0 or positive number');
    return CartItem.createCartItem(
      this.sku,
      this.productName,
      this.size,
      this.color,
      this.priceAtAddTime,
      newQuantity,
      this.img,
    );
  }
  public get lineTotal() {
    return this.priceAtAddTime.multiply(this.quantity.displayValue);
  }
  public checkSku(outterItem: CartItem): boolean {
    return this.sku.isEqual(outterItem.sku);
  }
  public isSameCartItem(outterItem: CartItem) {
    return this.checkSku(outterItem);
  }
  public get quantityOfUnits() {
    return this.quantity.displayValue;
  }
  public get skuValue(): string {
    return this.sku.displayValue;
  }
  public get priceAtAddTimeValue(): Money {
    return this.priceAtAddTime;
  }
  public get productNameValue(): string {
    return this.productName;
  }
  public get sizeValue(): string {
    return this.size.displayValue;
  }
  public get colorValue(): string {
    return this.color.displayValue;
  }
  public get image(): Image {
    return this.img;
  }
}
