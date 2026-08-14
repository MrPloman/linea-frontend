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
      stock: variantToUpdate.stock.subtract(quantity),
    };

    return new Product(this.id, this.name, updatedVariants);
  }
}
