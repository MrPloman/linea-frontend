import { OrderLine, OrderStatus } from '../types/orderLine';
import { Money } from './money';

const VALID_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ['paid', 'cancelled'],
  paid: ['shipped', 'cancelled'],
  shipped: ['delivered'],
  delivered: [],
  cancelled: [],
};

export class Order {
  private constructor(
    private readonly id: string,
    private readonly lines: OrderLine[],
    private readonly status: OrderStatus,
  ) {}

  public static createOrder(id: string, lines: OrderLine[]): Order {
    if (!id || typeof id !== 'string') throw new Error('id is required');
    if (!lines || lines.length === 0) throw new Error('Order must have at least one line');
    if (lines.some((line) => !line.productName || line.productName.trim().length === 0)) {
      throw new Error('Some line is missing a productName');
    }

    return new Order(id, lines, 'pending');
  }

  public transitionTo(newStatus: OrderStatus): Order {
    const allowedTransitions = VALID_TRANSITIONS[this.status];

    if (!allowedTransitions.includes(newStatus)) {
      throw new Error(`Cannot transition from "${this.status}" to "${newStatus}"`);
    }

    return new Order(this.id, this.lines, newStatus);
  }

  public getTotal(): Money {
    return this.lines.reduce(
      (total, line) => total.add(line.priceAtPurchase.multiply(line.quantity.displayValue)),
      Money.createMoney(0, 'EUR'),
    );
  }
}
