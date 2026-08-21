import { NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/application/services/cartService';
import { CartItem } from '../../../core/domain/models/cartItem';
import { Quantity } from '../../../core/domain/models/quantity';

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
  imports: [RouterLink, NgOptimizedImage, TitleCasePipe],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cart {
  protected cartService = inject(CartService);

  ngOnInit() {}

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
