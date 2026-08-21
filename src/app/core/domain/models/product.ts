import { Color } from './color';
import { ProductSku } from './productSku';
import { ProductVariant } from './productVariant';
import { Size } from './size';
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
    variantToUpdate.withStock(variantToUpdate.stockValue.subtract(quantity));

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

  public getVariantsBySize(size: Size) {
    return this.variants.filter(
      (variant: ProductVariant) =>
        variant.sizeValue.displayValue === size.displayValue && !variant.hasNoStock(),
    );
  }
  public getVariantsByColor(color: Color) {
    return this.variants.filter(
      (variant: ProductVariant) =>
        variant.colorValue.displayValue === color.displayValue && !variant.hasNoStock(),
    );
  }
  public getVariantByColorAndSize(color: Color, size: Size) {
    return this.variants.filter(
      (variant: ProductVariant) =>
        variant.colorValue.displayValue === color.displayValue &&
        size.displayValue === variant.sizeValue.displayValue &&
        !variant.hasNoStock(),
    );
  }

  public getAvailableColorBySize(size: Size): Color[] {
    return this.variants
      .filter(
        (variant: ProductVariant) =>
          variant.sizeValue.displayValue === size.displayValue && !variant.hasNoStock(),
      )
      .map((variant: ProductVariant) => variant.colorValue);
  }
  public getColorsFromVariants(): Color[] {
    return this.variants
      .filter((variant: ProductVariant) => !variant.hasNoStock())
      .map((variant: ProductVariant) => variant.colorValue);
  }
  public getSizesFromVariants(): Color[] {
    return this.variants
      .filter((variant: ProductVariant) => !variant.hasNoStock())
      .map((variant: ProductVariant) => variant.colorValue);
  }

  /** Tallas que existen para ese color, con y sin stock. Sin duplicados. */
  public getSizesByColor(color: Color): Size[] {
    return this.dedupeSizes(
      this.variants
        .filter((variant: ProductVariant) => variant.colorValue.isEqual(color))
        .map((variant: ProductVariant) => variant.sizeValue),
    );
  }

  /** Tallas comprables para ese color. Sin duplicados. */
  public getAvailableSizeByColor(color: Color): Size[] {
    return this.dedupeSizes(
      this.variants
        .filter(
          (variant: ProductVariant) => variant.colorValue.isEqual(color) && !variant.hasNoStock(),
        )
        .map((variant: ProductVariant) => variant.sizeValue),
    );
  }

  private dedupeSizes(sizes: Size[]): Size[] {
    return sizes.filter((size, index) => sizes.findIndex((s) => s.isEqual(size)) === index);
  }
}
