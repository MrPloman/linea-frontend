import { NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartStore } from '../../../core/application/state/cartStore';
import { RemoveItemFromCartUseCase } from '../../../core/application/useCases/cart/removeItemFromCart';
import { UpdateCartItemQuantityUseCase } from '../../../core/application/useCases/cart/updateCartItemQuantity';
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
  protected readonly cartStore = inject(CartStore);
  private readonly removeItemFromCart = inject(RemoveItemFromCartUseCase);
  private readonly updateCartItemQuantity = inject(UpdateCartItemQuantityUseCase);

  public async removeItem(item: CartItem): Promise<void> {
    await this.removeItemFromCart.execute(item);
  }

  public async updateItemQuantity(item: CartItem, newQuantity: number): Promise<void> {
    if (newQuantity < 1) {
      await this.removeItem(item);
      return;
    }
    await this.updateCartItemQuantity.execute(item, Quantity.createQuantity(newQuantity));
  }
}
