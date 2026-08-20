import { Image } from '../types/image';
import { Color } from './color';
import { Money } from './money';
import { ProductSku } from './productSku';
import { Size } from './size';
import { StockQuantity } from './stockQuantity';
export class ProductVariant {
  private constructor(
    private readonly sku: ProductSku,
    private readonly size: Size,
    private readonly color: Color,
    private readonly price: Money,
    private readonly stock: StockQuantity,
    private readonly images: Image[],
  ) {}

  public static createProductVariant(
    sku: ProductSku,
    size: Size,
    color: Color,
    price: Money,
    stock: StockQuantity,
    images: Image[],
  ): ProductVariant {
    if (!images || images.length === 0) {
      throw new Error('ProductVariant must have at least one image');
    }
    return new ProductVariant(sku, size, color, price, stock, images);
  }

  public get skuValue(): ProductSku {
    return this.sku;
  }

  public get sizeValue(): Size {
    return this.size;
  }
  public get colorValue(): Color {
    return this.color;
  }

  public get priceValue(): Money {
    return this.price;
  }

  public get stockValue(): StockQuantity {
    return this.stock;
  }

  public get imagesValue(): Image[] {
    return this.images;
  }

  public checkSku(sku: ProductSku): boolean {
    return this.sku.isEqual(sku);
  }

  public withStock(newStock: StockQuantity): ProductVariant {
    return ProductVariant.createProductVariant(
      this.sku,
      this.size,
      this.color,
      this.price,
      newStock,
      this.images,
    );
  }

  public hasNoStock() {
    return this.stock.isZero();
  }
}
