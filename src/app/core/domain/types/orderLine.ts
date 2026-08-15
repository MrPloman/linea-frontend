import { Money } from '../models/money';
import { ProductSku } from '../models/productSku';
import { Size } from '../models/size';
import { StockQuantity } from '../models/stockQuantity';

export type OrderLine = {
  sku: ProductSku;
  productName: string;
  size: Size;
  priceAtPurchase: Money;
  quantity: StockQuantity;
};
export const ORDER_STATUS = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'] as const;
export type OrderStatus = (typeof ORDER_STATUS)[number];
export const VALID_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ['paid', 'cancelled'],
  paid: ['shipped', 'cancelled'],
  shipped: ['delivered'],
  delivered: [],
  cancelled: [],
};
