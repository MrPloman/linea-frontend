import { Money } from '../models/money';
import { ProductSku } from '../models/productSku';
import { Size } from '../models/size';
import { StockQuantity } from '../models/stockQuantity';

export type ProductVariant = {
  sku: ProductSku;
  size: Size;
  price: Money;
  stock: StockQuantity;
  images: { src: string; alt: string }[];
};
