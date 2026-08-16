import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/application/services/cartService';
import { CartItem } from '../../../core/domain/models/cartItem';
import { Money } from '../../../core/domain/models/money';
import { ProductSku } from '../../../core/domain/models/productSku';
import { Quantity } from '../../../core/domain/models/quantity';
import { Size } from '../../../core/domain/models/size';

/** Item de la bolsa — view model temporal. TODO(pol): modelo real en core/domain */
interface CartItemVM {
  id: string;
  productId: string;
  name: string;
  color: string;
  size: string;
  quantity: number;
  unitPrice: string;
  lineTotal: string;
  image: string;
  imageAlt: string;
}

/** Bolsa de compra — todo visual, sin persistencia ni cálculos reales. */
@Component({
  selector: 'app-cart',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cart {
  private cartService = inject(CartService);
  protected items: CartItem[] = [];

  // TODO(pol): cálculo real de totales (subtotal, envío, impuestos)
  protected readonly summary = {
    articleCount: 4,
    subtotal: '269,80 €',
    shipping: 'Gratuito',
    total: '269,80 €',
  };
  ngOnInit() {
    this.cartService.addItem(
      CartItem.createCartItem(
        ProductSku.createProductSku('camisa-lino-oversize'),
        'Camisa de lino oversize',
        Size.createSize('letter', 'M'),
        Money.createMoney(1100, 'EUR'),
        Quantity.createQuantity(1),
        {
          url: '/images/products/p1.svg',
          altText: 'Camisa de lino oversize en color arena',
        },
      ),
    );
    this.items = this.cartService.cart();
  }

  public removeItem(item: CartItem): void {
    this.cartService.removeItem(item);
    this.items = this.cartService.cart();
  }

  public updateItemQuantity(item: CartItem, newQuantity: number): void {
    if (newQuantity < 1) {
      this.removeItem(item);
      return;
    }
    this.cartService.updateItemQuantity(
      ProductSku.createProductSku(item.skuValue),
      Quantity.createQuantity(newQuantity),
    );
    this.items = this.cartService.cart();
  }

  public getTotalItems(): number {
    return this.cartService.getTotalItems();
  }
  public getSubTotalPrice(): Money {
    return this.cartService.subTotal();
  }
  public getTotalPrice(): Money {
    return this.cartService.total();
  }
  public getShippingCost(): Money {
    return this.cartService.shippingCost();
  }

  public getVat(): Money {
    return this.cartService.vat();
  }
}
