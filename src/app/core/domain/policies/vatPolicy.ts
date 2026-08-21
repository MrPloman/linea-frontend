import { Money } from '../models/money';

export const VAT_RATE = 0.21;

/** IVA incluido en un total (el total ya lleva el IVA dentro). */
export function getIncludedVat(totalWithVat: Money): Money {
  const totalWithoutVat = totalWithVat.divide(1 + VAT_RATE);
  return totalWithVat.subtract(totalWithoutVat);
}
