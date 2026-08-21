import { Injectable, computed, signal } from '@angular/core';
import { Cart } from '../../domain/models/cart';
import { getShippingCost } from '../../domain/policies/shippingPolicy';
import { getIncludedVat } from '../../domain/policies/vatPolicy';

/**
 * Estado reactivo del carrito (read model para presentación).
 * No contiene reglas de negocio: consulta al agregado Cart y a las políticas
 * de dominio. Solo los use cases deberían llamar a setCart().
 */
@Injectable({ providedIn: 'root' })
export class CartStore {
  private readonly _cart = signal<Cart>(Cart.createEmptyCart());

  public readonly cart = this._cart.asReadonly();
  public readonly items = computed(() => this._cart().getArrayOfItems());
  public readonly itemCount = computed(() => this._cart().itemCount);
  public readonly isEmpty = computed(() => this._cart().isEmpty);

  public readonly subTotal = computed(() => this._cart().subTotal);
  public readonly shippingCost = computed(() => getShippingCost(this.subTotal()));
  public readonly total = computed(() => this.subTotal().add(this.shippingCost()));
  public readonly vat = computed(() => getIncludedVat(this.total()));

  public setCart(cart: Cart): void {
    this._cart.set(cart);
  }
}
