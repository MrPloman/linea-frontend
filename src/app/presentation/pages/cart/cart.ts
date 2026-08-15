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
  imports: [RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cart {
  private cartService = inject(CartService);
  protected items: CartItem[] = [];
  //   {
  //     id: 'line-1',
  //     productId: 'camisa-lino-oversize',
  //     name: 'Camisa de lino oversize',
  //     color: 'Arena',
  //     size: 'M',
  //     quantity: 1,
  //     unitPrice: '49,95 €',
  //     lineTotal: '49,95 €',
  //     image: '/images/products/p1.svg',
  //     imageAlt: 'Camisa de lino oversize en color arena',
  //   },
  //   {
  //     id: 'line-2',
  //     productId: 'vestido-midi-satinado',
  //     name: 'Vestido midi satinado',
  //     color: 'Piedra',
  //     size: 'S',
  //     quantity: 1,
  //     unitPrice: '79,95 €',
  //     lineTotal: '79,95 €',
  //     image: '/images/products/p2.svg',
  //     imageAlt: 'Vestido midi satinado en color piedra',
  //   },
  //   {
  //     id: 'line-3',
  //     productId: 'sandalias-tiras',
  //     name: 'Sandalias de tiras con tacón',
  //     color: 'Beige',
  //     size: '38',
  //     quantity: 2,
  //     unitPrice: '69,95 €',
  //     lineTotal: '139,90 €',
  //     image: '/images/products/p10.svg',
  //     imageAlt: 'Sandalias de tiras con tacón en beige',
  //   },
  // ];

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
        Money.createMoney(1, 'EUR'),
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
    return this.items.reduce((total, item) => total + item.quantityOfUnits, 0);
  }
  public getTotalPrice(): Money {
    return this.cartService.total();
  }
}
