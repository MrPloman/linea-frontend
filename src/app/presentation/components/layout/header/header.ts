import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/**
 * Cabecera principal con navegación responsive.
 * `isMenuOpen` es estado puramente visual (drawer móvil).
 */
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'closeMenu()',
  },
})
export class Header {
  protected readonly isMenuOpen = signal(false);

  // TODO(pol): contador real de artículos del carrito (hoy es un número fijo)
  protected readonly cartCount = 3;

  protected toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
