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
  protected cartService = inject(CartService);

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
    this.cartService.addItem(
      CartItem.createCartItem(
        ProductSku.createProductSku('camisa-lino-normal'),
        'Camisa de lino normal',
        Size.createSize('letter', 'L'),
        Money.createMoney(2300, 'EUR'),
        Quantity.createQuantity(10),
        {
          url: '/images/products/p1.svg',
          altText: 'Camisa de lino normal en color arena',
        },
      ),
    );
  }

  public removeItem(item: CartItem): void {
    this.cartService.removeItem(item);
  }

  public updateItemQuantity(item: CartItem, newQuantity: number): void {
    if (newQuantity < 1) {
      this.removeItem(item);
      return;
    }
    this.cartService.updateItemQuantity(item, Quantity.createQuantity(newQuantity));
  }
}
