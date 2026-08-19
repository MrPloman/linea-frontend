import { ProductSku } from './productSku';
import { ProductVariant } from './productVariant';
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

    const productVariantsName = new Set<ProductSku>();
    productVariants.forEach((variant: ProductVariant) => {
      if (productVariantsName.has(variant.skuValue)) {
        throw new Error(`Variant SKU already in use: ${variant.skuValue}`);
      }
      productVariantsName.add(variant.skuValue);
    });
    return new Product(productId, productName, productVariants);
  }

  public decrementVariantStock(sku: ProductSku, quantity: StockQuantity): Product {
    const variantIndex = this.variants.findIndex((variant) => variant.skuValue.isEqual(sku));

    if (variantIndex === -1) {
      throw new Error(`Variant with SKU ${sku.displayValue} not found`);
    }

    const updatedVariants: ProductVariant[] = [...this.variants];
    const variantToUpdate: ProductVariant = updatedVariants[variantIndex];
    variantToUpdate.withStock(variantToUpdate.stockValue.substract(quantity));

    return new Product(this.id, this.name, updatedVariants);
  }
  public getVariantBySku(sku: ProductSku) {
    if (!sku) throw new Error();
    return this.variants.find((variant: ProductVariant) => sku.isEqual(variant.skuValue));
  }
  public get displayName() {
    return this.name;
  }
  public get displayId() {
    return this.id;
  }

  public get variantImageUrl(): string {
    return this.variants[0].imagesValue[0].url;
  }

  public getCheapestVariant(): ProductVariant {
    return this.variants.reduce((cheapest, current) =>
      current.priceValue.isGreaterOrEqualTo(cheapest.priceValue) ? cheapest : current,
    );
  }
  public getArrayOfVariants(): ProductVariant[] {
    return this.variants;
  }
}
