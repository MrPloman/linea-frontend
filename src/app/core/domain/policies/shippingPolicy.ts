import { Money } from '../models/money';

const FREE_SHIPPING_THRESHOLD = Money.createMoney(5000, 'EUR');
const FIXED_SHIPPING_COST = Money.createMoney(750, 'EUR');

export function qualifiesForFreeShipping(cartTotal: Money): boolean {
  return cartTotal.isGreaterOrEqualTo(FREE_SHIPPING_THRESHOLD);
}
export function getShippingCost(cartTotal: Money): Money {
  if (cartTotal.currencyValue !== FREE_SHIPPING_THRESHOLD.currencyValue)
    throw new Error('Currencies are not matching');
  if (qualifiesForFreeShipping(cartTotal)) return Money.createMoney(0, 'EUR');
  return FIXED_SHIPPING_COST;
}
