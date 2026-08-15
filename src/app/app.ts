import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Footer } from '@presentation/components/layout/footer/footer';
import { Header } from '@presentation/components/layout/header/header';
import { CartItem } from './core/domain/models/cartItem';
import { Money } from './core/domain/models/money';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  public cart = signal<CartItem[]>([]);
  public total = computed(() =>
    this.cart().reduce(
      (prevVal, currentVal: CartItem) => prevVal.add(currentVal.lineTotal),
      Money.createMoney(0, 'EUR'),
    ),
  );
}
