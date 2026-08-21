import { CartItem } from './cartItem';
import { Color } from './color';
import { ProductSku } from './productSku';
import { Size } from './size';

export class CartLineId {
  private constructor(
    private readonly sku: ProductSku,
    private readonly color: Color,
    private readonly size: Size,
  ) {}

  public static fromCartItem(item: CartItem): CartLineId {
    return new CartLineId(item.exposedSku, item.exposedColor, item.exposedSize);
  }

  public equals(other: CartLineId): boolean {
    return (
      this.sku.isEqual(other.sku) &&
      this.color.isEqual(other.color) &&
      this.size.isEqual(other.size)
    );
  }

  /** Clave estable para Map y para `track` en @for */
  public get key(): string {
    return `${this.sku.displayValue}::${this.color.displayValue}::${this.size.type}:${this.size.displayValue}`;
  }
}
