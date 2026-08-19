import { ProductVariant } from '../types/productVariant';
import { ProductSku } from './productSku';
import { StockQuantity } from './stockQuantity';

export class Product {
  private constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly variants: ProductVariant[],
  ) {}

  static createProduct(productId: string, productName: string, productVariants: ProductVariant[]) {
    if (!productId) throw new Error('productId is required');
    if (
      productName === undefined ||
      productName === null ||
      typeof productName !== 'string' ||
      productName.length === 0
    )
      throw new Error('productName is not allowed to be empty');
    if (!productVariants || productVariants.length === 0 || !Array.isArray(productVariants)) {
      throw new Error('productVariant is required');
    }

    const productVariantsName = new Set<string>();
    productVariants.forEach((variant: ProductVariant) => {
      if (productVariantsName.has(variant.sku.displayValue)) {
        throw new Error(`Variant SKU already in use: ${variant.sku.displayValue}`);
      }
      productVariantsName.add(variant.sku.displayValue);
    });
    return new Product(productId, productName, productVariants);
  }

  public decrementVariantStock(sku: ProductSku, quantity: StockQuantity): Product {
    const variantIndex = this.variants.findIndex((variant) => variant.sku.isEqual(sku));

    if (variantIndex === -1) {
      throw new Error(`Variant with SKU ${sku.displayValue} not found`);
    }

    const updatedVariants = [...this.variants];
    const variantToUpdate = updatedVariants[variantIndex];
    updatedVariants[variantIndex] = {
      ...variantToUpdate,
      stock: variantToUpdate.stock.substract(quantity),
    };

    return new Product(this.id, this.name, updatedVariants);
  }
  public getVariantBySku(sku: ProductSku) {
    if (!sku) throw new Error();
    return this.variants.find((variant: ProductVariant) => sku.isEqual(variant.sku));
  }
  public get displayName() {
    return this.name;
  }
  public get displayId() {
    return this.id;
  }

  public get variantImageUrl(): string {
    return this.variants[0].images[0].src;
  }

  public getCheapestVariant(): ProductVariant {
    return this.variants.reduce((cheapest, current) =>
      current.price.isGreaterOrEqualTo(cheapest.price) ? cheapest : current,
    );
  }
  public getArrayOfVariants(): ProductVariant[] {
    return this.variants;
  }
}
