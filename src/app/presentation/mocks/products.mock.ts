// ============================================================
// DATOS MOCK — solo para maquetado visual.
//
// TODO(pol): sustituir por modelos de dominio en core/domain,
// casos de uso en core/application y repositorios reales en
// infrastructure/. Estas interfaces son "view models" temporales
// y NO deben convertirse en el modelo de negocio definitivo.
// ============================================================

import { Color } from '../../core/domain/models/color';
import { Money } from '../../core/domain/models/money';
import { Product } from '../../core/domain/models/product';
import { ProductSku } from '../../core/domain/models/productSku';
import { ProductVariant } from '../../core/domain/models/productVariant';
import { Size } from '../../core/domain/models/size';
import { StockQuantity } from '../../core/domain/models/stockQuantity';

export interface ProductMockVM {
  id: string;
  name: string;
  /** Precio ya formateado — TODO(pol): formatear con CurrencyPipe/Intl cuando haya lógica */
  price: string;
  /** Precio original tachado (solo productos rebajados) */
  originalPrice?: string;
  image: string;
  imageAlt: string;
  badge?: 'nuevo' | 'rebajas';
  colors: string[];
}

export interface CategoryMockVM {
  id: string;
  name: string;
  image: string;
}

export const MOCK_PRODUCTS: Product[] = [
  Product.createProduct('6a84be08ba01efc6f6000000', 'Camisa de lino oversize', [
    // Color: beige
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('camisa-lino-oversize-beige-xs'),
      Size.createSize('letter', 'XS'),
      Color.createColor('beige'),
      Money.createMoney(1000, 'EUR'),
      StockQuantity.createStockQuantity(0),
      [{ url: '/images/products/gallery-1.svg', altText: 'gallery1' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('camisa-lino-oversize-azul-xs'),
      Size.createSize('letter', 'XS'),
      Color.createColor('blue'),
      Money.createMoney(15000, 'EUR'),
      StockQuantity.createStockQuantity(1),
      [{ url: '/images/products/gallery-1.svg', altText: 'gallery1' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('camisa-lino-oversize-rojo-xs'),
      Size.createSize('letter', 'XS'),
      Color.createColor('red'),
      Money.createMoney(13000, 'EUR'),
      StockQuantity.createStockQuantity(11),
      [{ url: '/images/products/gallery-1.svg', altText: 'gallery1' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('camisa-lino-oversize-azul-xs'),
      Size.createSize('letter', 'XS'),
      Color.createColor('blue'),
      Money.createMoney(10000, 'EUR'),
      StockQuantity.createStockQuantity(1),
      [{ url: '/images/products/gallery-1.svg', altText: 'gallery1' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('camisa-lino-oversize-verde-s'),
      Size.createSize('letter', 'S'),
      Color.createColor('green'),
      Money.createMoney(10000, 'EUR'),
      StockQuantity.createStockQuantity(0),
      [{ url: '/images/products/gallery-1.svg', altText: 'gallery1' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('camisa-lino-oversize-beige-m'),
      Size.createSize('letter', 'M'),
      Color.createColor('beige'),
      Money.createMoney(10000, 'EUR'),
      StockQuantity.createStockQuantity(3),
      [{ url: '/images/products/gallery-1.svg', altText: 'gallery1' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('camisa-lino-oversize-beige-l'),
      Size.createSize('letter', 'L'),
      Color.createColor('beige'),
      Money.createMoney(10000, 'EUR'),
      StockQuantity.createStockQuantity(17),
      [{ url: '/images/products/gallery-1.svg', altText: 'gallery1' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('camisa-lino-oversize-beige-xl'),
      Size.createSize('letter', 'XL'),
      Color.createColor('beige'),
      Money.createMoney(10000, 'EUR'),
      StockQuantity.createStockQuantity(2),
      [{ url: '/images/products/gallery-1.svg', altText: 'gallery1' }],
    ),
    // Color: azul
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('camisa-lino-oversize-azul-xs'),
      Size.createSize('letter', 'XS'),
      Color.createColor('blue'),
      Money.createMoney(10000, 'EUR'),
      StockQuantity.createStockQuantity(12),
      [{ url: '/images/products/gallery-2.svg', altText: 'gallery2' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('camisa-lino-oversize-azul-s'),
      Size.createSize('letter', 'S'),
      Color.createColor('blue'),
      Money.createMoney(10000, 'EUR'),
      StockQuantity.createStockQuantity(3),
      [{ url: '/images/products/gallery-2.svg', altText: 'gallery2' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('camisa-lino-oversize-azul-m'),
      Size.createSize('letter', 'M'),
      Color.createColor('blue'),
      Money.createMoney(10000, 'EUR'),
      StockQuantity.createStockQuantity(100),
      [{ url: '/images/products/gallery-2.svg', altText: 'gallery2' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('camisa-lino-oversize-azul-l'),
      Size.createSize('letter', 'L'),
      Color.createColor('blue'),
      Money.createMoney(10000, 'EUR'),
      StockQuantity.createStockQuantity(4),
      [{ url: '/images/products/gallery-2.svg', altText: 'gallery2' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('camisa-lino-oversize-azul-xl'),
      Size.createSize('letter', 'XL'),
      Color.createColor('blue'),
      Money.createMoney(10000, 'EUR'),
      StockQuantity.createStockQuantity(100),
      [{ url: '/images/products/gallery-2.svg', altText: 'gallery2' }],
    ),
  ]),

  Product.createProduct('6a84be08ba01efc6f6000001', 'Vestido midi satinado en color piedra', [
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('vestido-midi-satinado-36'),
      Size.createSize('numeric-eu', 36),
      Color.createColor('stone'),
      Money.createMoney(100000, 'EUR'),
      StockQuantity.createStockQuantity(5),
      [{ url: '/images/products/gallery-1.svg', altText: 'gallery1' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('vestido-midi-satinado-38'),
      Size.createSize('numeric-eu', 38),
      Color.createColor('stone'),
      Money.createMoney(100000, 'EUR'),
      StockQuantity.createStockQuantity(0),
      [{ url: '/images/products/gallery-1.svg', altText: 'gallery1' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('vestido-midi-satinado-40'),
      Size.createSize('numeric-eu', 40),
      Color.createColor('stone'),
      Money.createMoney(100000, 'EUR'),
      StockQuantity.createStockQuantity(9),
      [{ url: '/images/products/gallery-1.svg', altText: 'gallery1' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('vestido-midi-satinado-42'),
      Size.createSize('numeric-eu', 42),
      Color.createColor('stone'),
      Money.createMoney(100000, 'EUR'),
      StockQuantity.createStockQuantity(3),
      [{ url: '/images/products/gallery-1.svg', altText: 'gallery1' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('vestido-midi-satinado-44'),
      Size.createSize('numeric-eu', 44),
      Color.createColor('stone'),
      Money.createMoney(100000, 'EUR'),
      StockQuantity.createStockQuantity(0),
      [{ url: '/images/products/gallery-1.svg', altText: 'gallery1' }],
    ),
  ]),
  Product.createProduct('6a84be08ba01efc6f6000002', 'Pantalón wide-leg', [
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('pantalon-wide-leg-36'),
      Size.createSize('numeric-eu', 36),
      Color.createColor('black'),
      Money.createMoney(6995, 'EUR'),
      StockQuantity.createStockQuantity(14),
      [{ url: '/images/products/gallery-2.svg', altText: 'gallery2' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('pantalon-wide-leg-38'),
      Size.createSize('numeric-eu', 38),
      Color.createColor('black'),
      Money.createMoney(6995, 'EUR'),
      StockQuantity.createStockQuantity(7),
      [{ url: '/images/products/gallery-2.svg', altText: 'gallery2' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('pantalon-wide-leg-40'),
      Size.createSize('numeric-eu', 40),
      Color.createColor('black'),
      Money.createMoney(6995, 'EUR'),
      StockQuantity.createStockQuantity(0),
      [{ url: '/images/products/gallery-2.svg', altText: 'gallery2' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('pantalon-wide-leg-42'),
      Size.createSize('numeric-eu', 42),
      Color.createColor('black'),
      Money.createMoney(6995, 'EUR'),
      StockQuantity.createStockQuantity(11),
      [{ url: '/images/products/gallery-2.svg', altText: 'gallery2' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('pantalon-wide-leg-44'),
      Size.createSize('numeric-eu', 44),
      Color.createColor('black'),
      Money.createMoney(6995, 'EUR'),
      StockQuantity.createStockQuantity(0),
      [{ url: '/images/products/gallery-2.svg', altText: 'gallery2' }],
    ),
  ]),

  Product.createProduct('6a84be08ba01efc6f6000003', 'Jersey de cashmere con cuello redondo', [
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('jersey-cashmere-xs'),
      Size.createSize('letter', 'XS'),
      Color.createColor('grey'),
      Money.createMoney(14900, 'EUR'),
      StockQuantity.createStockQuantity(4),
      [{ url: '/images/products/gallery-4.svg', altText: 'gallery4' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('jersey-cashmere-s'),
      Size.createSize('letter', 'S'),
      Color.createColor('grey'),
      Money.createMoney(14900, 'EUR'),
      StockQuantity.createStockQuantity(18),
      [{ url: '/images/products/gallery-4.svg', altText: 'gallery4' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('jersey-cashmere-m'),
      Size.createSize('letter', 'M'),
      Color.createColor('grey'),
      Money.createMoney(14900, 'EUR'),
      StockQuantity.createStockQuantity(0),
      [{ url: '/images/products/gallery-4.svg', altText: 'gallery4' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('jersey-cashmere-l'),
      Size.createSize('letter', 'L'),
      Color.createColor('grey'),
      Money.createMoney(14900, 'EUR'),
      StockQuantity.createStockQuantity(9),
      [{ url: '/images/products/gallery-4.svg', altText: 'gallery4' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('jersey-cashmere-xl'),
      Size.createSize('letter', 'XL'),
      Color.createColor('grey'),
      Money.createMoney(14900, 'EUR'),
      StockQuantity.createStockQuantity(2),
      [{ url: '/images/products/gallery-4.svg', altText: 'gallery4' }],
    ),
  ]),

  Product.createProduct('6a84be08ba01efc6f6000004', 'Falda midi plisada', [
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('falda-plisada-36'),
      Size.createSize('numeric-eu', 36),
      Color.createColor('black'),
      Money.createMoney(4595, 'EUR'),
      StockQuantity.createStockQuantity(6),
      [{ url: '/images/products/gallery-1.svg', altText: 'gallery1' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('falda-plisada-36'),
      Size.createSize('numeric-eu', 36),
      Color.createColor('black'),
      Money.createMoney(4595, 'EUR'),
      StockQuantity.createStockQuantity(0),
      [{ url: '/images/products/gallery-1.svg', altText: 'gallery1' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('falda-plisada-38'),
      Size.createSize('numeric-eu', 38),
      Color.createColor('black'),
      Money.createMoney(4595, 'EUR'),
      StockQuantity.createStockQuantity(15),
      [{ url: '/images/products/gallery-1.svg', altText: 'gallery1' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('falda-plisada-40'),
      Size.createSize('numeric-eu', 40),
      Color.createColor('black'),
      Money.createMoney(4595, 'EUR'),
      StockQuantity.createStockQuantity(3),
      [{ url: '/images/products/gallery-1.svg', altText: 'gallery1' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('falda-plisada-42'),
      Size.createSize('numeric-eu', 42),
      Color.createColor('black'),
      Money.createMoney(4595, 'EUR'),
      StockQuantity.createStockQuantity(0),
      [{ url: '/images/products/gallery-1.svg', altText: 'gallery1' }],
    ),
  ]),

  Product.createProduct('6a84be08ba01efc6f6000005', 'Trench clásico con cinturón', [
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('trench-clasico-36'),
      Size.createSize('numeric-eu', 36),
      Color.createColor('beige'),
      Money.createMoney(15900, 'EUR'),
      StockQuantity.createStockQuantity(8),
      [{ url: '/images/products/gallery-3.svg', altText: 'gallery3' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('trench-clasico-38'),
      Size.createSize('numeric-eu', 38),
      Color.createColor('beige'),
      Money.createMoney(15900, 'EUR'),
      StockQuantity.createStockQuantity(0),
      [{ url: '/images/products/gallery-3.svg', altText: 'gallery3' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('trench-clasico-40'),
      Size.createSize('numeric-eu', 40),
      Color.createColor('beige'),
      Money.createMoney(15900, 'EUR'),
      StockQuantity.createStockQuantity(12),
      [{ url: '/images/products/gallery-3.svg', altText: 'gallery3' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('trench-clasico-42'),
      Size.createSize('numeric-eu', 42),
      Color.createColor('beige'),
      Money.createMoney(15900, 'EUR'),
      StockQuantity.createStockQuantity(5),
      [{ url: '/images/products/gallery-3.svg', altText: 'gallery3' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('trench-clasico-44'),
      Size.createSize('numeric-eu', 44),
      Color.createColor('beige'),
      Money.createMoney(15900, 'EUR'),
      StockQuantity.createStockQuantity(0),
      [{ url: '/images/products/gallery-3.svg', altText: 'gallery3' }],
    ),
  ]),

  Product.createProduct('6a84be08ba01efc6f6000006', 'Camiseta de algodón orgánico', [
    // Color: blanco
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('camiseta-organica-blanco-xs'),
      Size.createSize('letter', 'XS'),
      Color.createColor('white'),
      Money.createMoney(1995, 'EUR'),
      StockQuantity.createStockQuantity(30),
      [{ url: '/images/products/gallery-2.svg', altText: 'gallery2' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('camiseta-organica-blanco-s'),
      Size.createSize('letter', 'S'),
      Color.createColor('white'),
      Money.createMoney(1995, 'EUR'),
      StockQuantity.createStockQuantity(0),
      [{ url: '/images/products/gallery-2.svg', altText: 'gallery2' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('camiseta-organica-blanco-m'),
      Size.createSize('letter', 'M'),
      Color.createColor('white'),
      Money.createMoney(1995, 'EUR'),
      StockQuantity.createStockQuantity(25),
      [{ url: '/images/products/gallery-2.svg', altText: 'gallery2' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('camiseta-organica-blanco-l'),
      Size.createSize('letter', 'L'),
      Color.createColor('white'),
      Money.createMoney(1995, 'EUR'),
      StockQuantity.createStockQuantity(10),
      [{ url: '/images/products/gallery-2.svg', altText: 'gallery2' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('camiseta-organica-blanco-xl'),
      Size.createSize('letter', 'XL'),
      Color.createColor('white'),
      Money.createMoney(1995, 'EUR'),
      StockQuantity.createStockQuantity(0),
      [{ url: '/images/products/gallery-2.svg', altText: 'gallery2' }],
    ),
    // Color: negro
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('camiseta-organica-negro-xs'),
      Size.createSize('letter', 'XS'),
      Color.createColor('black'),
      Money.createMoney(1995, 'EUR'),
      StockQuantity.createStockQuantity(9),
      [{ url: '/images/products/gallery-1.svg', altText: 'gallery1' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('camiseta-organica-negro-s'),
      Size.createSize('letter', 'S'),
      Color.createColor('black'),
      Money.createMoney(1995, 'EUR'),
      StockQuantity.createStockQuantity(22),
      [{ url: '/images/products/gallery-1.svg', altText: 'gallery1' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('camiseta-organica-negro-m'),
      Size.createSize('letter', 'M'),
      Color.createColor('black'),
      Money.createMoney(1995, 'EUR'),
      StockQuantity.createStockQuantity(0),
      [{ url: '/images/products/gallery-1.svg', altText: 'gallery1' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('camiseta-organica-negro-l'),
      Size.createSize('letter', 'L'),
      Color.createColor('black'),
      Money.createMoney(1995, 'EUR'),
      StockQuantity.createStockQuantity(0),
      [{ url: '/images/products/gallery-1.svg', altText: 'gallery1' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('camiseta-organica-negro-xl'),
      Size.createSize('letter', 'XL'),
      Color.createColor('black'),
      Money.createMoney(1995, 'EUR'),
      StockQuantity.createStockQuantity(5),
      [{ url: '/images/products/gallery-1.svg', altText: 'gallery1' }],
    ),
  ]),

  Product.createProduct('6a84be08ba01efc6f6000007', 'Bolso tote de piel', [
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('bolso-tote-piel'),
      Size.createSize('unique', 'Única'),
      Color.createColor('brown'),
      Money.createMoney(19900, 'EUR'),
      StockQuantity.createStockQuantity(7),
      [
        { url: '/images/products/gallery-1.svg', altText: 'gallery1' },
        { url: '/images/products/gallery-4.svg', altText: 'gallery4' },
      ],
    ),
  ]),

  Product.createProduct('6a84be08ba01efc6f6000008', 'Sandalias de tiras con tacón', [
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('sandalias-tiras-36'),
      Size.createSize('shoe', 36),
      Color.createColor('black'),
      Money.createMoney(6995, 'EUR'),
      StockQuantity.createStockQuantity(5),
      [{ url: '/images/products/gallery-3.svg', altText: 'gallery3' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('sandalias-tiras-37'),
      Size.createSize('shoe', 37),
      Color.createColor('black'),
      Money.createMoney(6995, 'EUR'),
      StockQuantity.createStockQuantity(0),
      [{ url: '/images/products/gallery-3.svg', altText: 'gallery3' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('sandalias-tiras-38'),
      Size.createSize('shoe', 38),
      Color.createColor('black'),
      Money.createMoney(6995, 'EUR'),
      StockQuantity.createStockQuantity(9),
      [{ url: '/images/products/gallery-3.svg', altText: 'gallery3' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('sandalias-tiras-39'),
      Size.createSize('shoe', 39),
      Color.createColor('black'),
      Money.createMoney(6995, 'EUR'),
      StockQuantity.createStockQuantity(3),
      [{ url: '/images/products/gallery-3.svg', altText: 'gallery3' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('sandalias-tiras-40'),
      Size.createSize('shoe', 40),
      Color.createColor('black'),
      Money.createMoney(6995, 'EUR'),
      StockQuantity.createStockQuantity(0),
      [{ url: '/images/products/gallery-3.svg', altText: 'gallery3' }],
    ),
  ]),

  Product.createProduct('6a84be08ba01efc6f6000009', 'Chaqueta vaquera relaxed', [
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('chaqueta-vaquera-xs'),
      Size.createSize('letter', 'XS'),
      Color.createColor('blue'),
      Money.createMoney(6995, 'EUR'),
      StockQuantity.createStockQuantity(11),
      [{ url: '/images/products/gallery-4.svg', altText: 'gallery4' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('chaqueta-vaquera-s'),
      Size.createSize('letter', 'S'),
      Color.createColor('blue'),
      Money.createMoney(6995, 'EUR'),
      StockQuantity.createStockQuantity(0),
      [{ url: '/images/products/gallery-4.svg', altText: 'gallery4' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('chaqueta-vaquera-m'),
      Size.createSize('letter', 'M'),
      Color.createColor('blue'),
      Money.createMoney(6995, 'EUR'),
      StockQuantity.createStockQuantity(16),
      [{ url: '/images/products/gallery-4.svg', altText: 'gallery4' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('chaqueta-vaquera-l'),
      Size.createSize('letter', 'L'),
      Color.createColor('blue'),
      Money.createMoney(6995, 'EUR'),
      StockQuantity.createStockQuantity(4),
      [{ url: '/images/products/gallery-4.svg', altText: 'gallery4' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('chaqueta-vaquera-xl'),
      Size.createSize('letter', 'XL'),
      Color.createColor('blue'),
      Money.createMoney(6995, 'EUR'),
      StockQuantity.createStockQuantity(0),
      [{ url: '/images/products/gallery-4.svg', altText: 'gallery4' }],
    ),
  ]),

  Product.createProduct('6a84be08ba01efc6f6000010', 'Top de crochet artesanal', [
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('top-crochet-xs'),
      Size.createSize('letter', 'XS'),
      Color.createColor('white'),
      Money.createMoney(3995, 'EUR'),
      StockQuantity.createStockQuantity(2),
      [{ url: '/images/products/gallery-1.svg', altText: 'gallery1' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('top-crochet-s'),
      Size.createSize('letter', 'S'),
      Color.createColor('white'),
      Money.createMoney(3995, 'EUR'),
      StockQuantity.createStockQuantity(13),
      [{ url: '/images/products/gallery-1.svg', altText: 'gallery1' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('top-crochet-m'),
      Size.createSize('letter', 'M'),
      Color.createColor('white'),
      Money.createMoney(3995, 'EUR'),
      StockQuantity.createStockQuantity(0),
      [{ url: '/images/products/gallery-1.svg', altText: 'gallery1' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('top-crochet-l'),
      Size.createSize('letter', 'L'),
      Color.createColor('white'),
      Money.createMoney(3995, 'EUR'),
      StockQuantity.createStockQuantity(6),
      [{ url: '/images/products/gallery-1.svg', altText: 'gallery1' }],
    ),
    ProductVariant.createProductVariant(
      ProductSku.createProductSku('top-crochet-xl'),
      Size.createSize('letter', 'XL'),
      Color.createColor('white'),
      Money.createMoney(3995, 'EUR'),
      StockQuantity.createStockQuantity(0),
      [{ url: '/images/products/gallery-1.svg', altText: 'gallery1' }],
    ),
  ]),
];

// export const MOCK_PRODUCTS: ProductMockVM[] = [
//   {
//     id: 'camisa-lino-oversize',
//     name: 'Camisa de lino oversize',
//     price: '49,95 €',
//     image: '/images/products/p1.svg',
//     imageAlt: 'Camisa de lino oversize en color arena',
//     colors: ['#d8cfc4', '#f1ede7', '#44413c'],
//   },
//   {
//     id: 'vestido-midi-satinado',
//     name: 'Vestido midi satinado',
//     price: '79,95 €',
//     image: '/images/products/p2.svg',
//     imageAlt: 'Vestido midi satinado en color piedra',
//     badge: 'nuevo',
//     colors: ['#b8aca1', '#1c1b19'],
//   },
//   {
//     id: 'pantalon-wide-leg',
//     name: 'Pantalón wide-leg de sarga',
//     price: '59,95 €',
//     image: '/images/products/p3.svg',
//     imageAlt: 'Pantalón wide-leg de sarga en verde salvia',
//     colors: ['#a9b2a4', '#d8cfc4', '#1c1b19'],
//   },
//   {
//     id: 'blazer-estructurada',
//     name: 'Blazer estructurada de lana',
//     price: '119,00 €',
//     image: '/images/products/p4.svg',
//     imageAlt: 'Blazer estructurada de lana en beige',
//     badge: 'nuevo',
//     colors: ['#d0bfae', '#44413c'],
//   },
// {
//   id: 'jersey-cashmere',
//   name: 'Jersey de cashmere con cuello redondo',
//   price: '149,00 €',
//   image: '/images/products/p5.svg',
//   imageAlt: 'Jersey de cashmere en gris topo',
//   colors: ['#b5afa5', '#f1ede7', '#9c7a54'],
// },
// {
//   id: 'falda-plisada',
//   name: 'Falda midi plisada',
//   price: '45,95 €',
//   originalPrice: '65,95 €',
//   image: '/images/products/p6.svg',
//   imageAlt: 'Falda midi plisada en tono arcilla',
//   badge: 'rebajas',
//   colors: ['#c0a48e'],
// },
// {
//   id: 'trench-clasico',
//   name: 'Trench clásico con cinturón',
//   price: '159,00 €',
//   image: '/images/products/p7.svg',
//   imageAlt: 'Trench clásico con cinturón en azul grisáceo',
//   colors: ['#a3a9b1', '#d0bfae'],
// },
// {
//   id: 'camiseta-organica',
//   name: 'Camiseta de algodón orgánico',
//   price: '19,95 €',
//   image: '/images/products/p8.svg',
//   imageAlt: 'Camiseta de algodón orgánico en crudo',
//   colors: ['#e4ddd0', '#1c1b19', '#a3a9b1'],
// },
// {
//   id: 'bolso-tote-piel',
//   name: 'Bolso tote de piel',
//   price: '199,00 €',
//   image: '/images/products/p9.svg',
//   imageAlt: 'Bolso tote de piel en marrón cuero',
//   colors: ['#b09a83', '#1c1b19'],
// },
// {
//   id: 'sandalias-tiras',
//   name: 'Sandalias de tiras con tacón',
//   price: '69,95 €',
//   originalPrice: '89,95 €',
//   image: '/images/products/p10.svg',
//   imageAlt: 'Sandalias de tiras con tacón en beige',
//   badge: 'rebajas',
//   colors: ['#beb7ab'],
// },
// {
//   id: 'chaqueta-vaquera',
//   name: 'Chaqueta vaquera relaxed',
//   price: '69,95 €',
//   image: '/images/products/p11.svg',
//   imageAlt: 'Chaqueta vaquera relaxed en tono desgastado',
//   colors: ['#a89c89', '#a3a9b1'],
// },
// {
//   id: 'top-crochet',
//   name: 'Top de crochet artesanal',
//   price: '39,95 €',
//   image: '/images/products/p12.svg',
//   imageAlt: 'Top de crochet artesanal en tono tierra',
//   badge: 'nuevo',
//   colors: ['#c3ad9f', '#e4ddd0'],
// },
// ];

export const MOCK_CATEGORIES: CategoryMockVM[] = [
  { id: 'mujer', name: 'Mujer', image: '/images/categories/mujer.svg' },
  { id: 'hombre', name: 'Hombre', image: '/images/categories/hombre.svg' },
  { id: 'accesorios', name: 'Accesorios', image: '/images/categories/accesorios.svg' },
  { id: 'novedades', name: 'Novedades', image: '/images/categories/novedades.svg' },
];

/** Imágenes de la galería del PDP — TODO(pol): vendrán del producto real */
export const MOCK_GALLERY_IMAGES: string[] = [
  '/images/products/gallery-1.svg',
  '/images/products/gallery-2.svg',
  '/images/products/gallery-3.svg',
  '/images/products/gallery-4.svg',
];
