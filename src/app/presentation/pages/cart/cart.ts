import { NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartFacade } from '../../../core/application/store/cart/cart.facade';
import { CartItem } from '../../../core/domain/models/cartItem';
import { Quantity } from '../../../core/domain/models/quantity';

/** Bolsa de compra: lee del CartStore y muta a través de use cases. */
@Component({
  selector: 'app-cart',
  imports: [RouterLink, NgOptimizedImage, TitleCasePipe],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cart {
  protected readonly cartFacade = inject(CartFacade);

  public async removeItem(item: CartItem): Promise<void> {
    await this.cartFacade.removeItem(item);
  }

  public async updateItemQuantity(item: CartItem, newQuantity: number): Promise<void> {
    if (newQuantity < 1) {
      await this.removeItem(item);
      return;
    }
    await this.cartFacade.updateItemQuantity(item, Quantity.createQuantity(newQuantity));
  }
}
