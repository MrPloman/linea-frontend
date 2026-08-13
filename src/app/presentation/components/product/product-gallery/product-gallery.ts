import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

/**
 * Galería de imágenes del PDP: imagen principal + miniaturas.
 * `activeIndex` es estado puramente visual (qué imagen se muestra).
 */
@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.html',
  styleUrl: './product-gallery.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGallery {
  readonly images = input.required<string[]>();
  readonly altBase = input('Imagen del producto');

  protected readonly activeIndex = signal(0);

  protected select(index: number): void {
    this.activeIndex.set(index);
  }
}
