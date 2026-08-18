// ============================================================
// DATOS MOCK — solo para maquetado visual.
//
// TODO(pol): sustituir por modelos de dominio en core/domain,
// casos de uso en core/application y repositorios reales en
// infrastructure/. Estas interfaces son "view models" temporales
// y NO deben convertirse en el modelo de negocio definitivo.
// ============================================================

import { Money } from '../../core/domain/models/money';
import { Product } from '../../core/domain/models/product';
import { ProductSku } from '../../core/domain/models/productSku';
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
    {
      sku: ProductSku.createProductSku('Camisa de lino oversize'),
      size: Size.createSize('letter', 'M'),
      price: Money.createMoney(10000, 'EUR'),
      stock: StockQuantity.createStockQuantity(100),
      images: [
        {
          src: '/images/products/gallery-1.svg',
          alt: 'gallery1',
        },
        {
          src: '/images/products/gallery-2.svg',
          alt: 'gallery2',
        },
        {
          src: '/images/products/gallery-3.svg',
          alt: 'gallery3',
        },
        {
          src: '/images/products/gallery-4.svg',
          alt: 'gallery4',
        },
      ],
    },
  ]),
  Product.createProduct('6a84be08ba01efc6f6000001', 'Vestido midi satinado en color piedra', [
    {
      sku: ProductSku.createProductSku('Vestido midi satinado en color piedra'),
      size: Size.createSize('numeric-eu', 40),
      price: Money.createMoney(100000, 'EUR'),
      stock: StockQuantity.createStockQuantity(100),
      images: [
        {
          src: '/images/products/gallery-1.svg',
          alt: 'gallery1',
        },
        {
          src: '/images/products/gallery-2.svg',
          alt: 'gallery2',
        },
        {
          src: '/images/products/gallery-3.svg',
          alt: 'gallery3',
        },
        {
          src: '/images/products/gallery-4.svg',
          alt: 'gallery4',
        },
      ],
    },
  ]),
  Product.createProduct('6a84be08ba01efc6f6000002', 'Vestido midi satinado en color piedra', [
    {
      sku: ProductSku.createProductSku('pantalon-wide-leg'),
      size: Size.createSize('numeric-eu', 40),
      price: Money.createMoney(100000, 'EUR'),
      stock: StockQuantity.createStockQuantity(100),
      images: [
        {
          src: '/images/products/gallery-1.svg',
          alt: 'gallery1',
        },
        {
          src: '/images/products/gallery-2.svg',
          alt: 'gallery2',
        },
        {
          src: '/images/products/gallery-3.svg',
          alt: 'gallery3',
        },
        {
          src: '/images/products/gallery-4.svg',
          alt: 'gallery4',
        },
      ],
    },
  ]),
  Product.createProduct('6a84be08ba01efc6f6000003', 'Jersey de cashmere con cuello redondo', [
    {
      sku: ProductSku.createProductSku('jersey-cashmere'),
      size: Size.createSize('letter', 'M'),
      price: Money.createMoney(14900, 'EUR'),
      stock: StockQuantity.createStockQuantity(100),
      images: [
        {
          src: '/images/products/gallery-1.svg',
          alt: 'gallery1',
        },
        {
          src: '/images/products/gallery-2.svg',
          alt: 'gallery2',
        },
        {
          src: '/images/products/gallery-3.svg',
          alt: 'gallery3',
        },
        {
          src: '/images/products/gallery-4.svg',
          alt: 'gallery4',
        },
      ],
    },
  ]),

  Product.createProduct('6a84be08ba01efc6f6000004', 'Falda midi plisada', [
    {
      sku: ProductSku.createProductSku('falda-plisada'),
      size: Size.createSize('numeric-eu', 38),
      price: Money.createMoney(4595, 'EUR'),
      stock: StockQuantity.createStockQuantity(100),
      images: [
        {
          src: '/images/products/gallery-1.svg',
          alt: 'gallery1',
        },
        {
          src: '/images/products/gallery-2.svg',
          alt: 'gallery2',
        },
        {
          src: '/images/products/gallery-3.svg',
          alt: 'gallery3',
        },
        {
          src: '/images/products/gallery-4.svg',
          alt: 'gallery4',
        },
      ],
    },
  ]),

  Product.createProduct('6a84be08ba01efc6f6000005', 'Trench clásico con cinturón', [
    {
      sku: ProductSku.createProductSku('trench-clasico'),
      size: Size.createSize('numeric-eu', 40),
      price: Money.createMoney(15900, 'EUR'),
      stock: StockQuantity.createStockQuantity(100),
      images: [
        {
          src: '/images/products/gallery-1.svg',
          alt: 'gallery1',
        },
        {
          src: '/images/products/gallery-2.svg',
          alt: 'gallery2',
        },
        {
          src: '/images/products/gallery-3.svg',
          alt: 'gallery3',
        },
        {
          src: '/images/products/gallery-4.svg',
          alt: 'gallery4',
        },
      ],
    },
  ]),

  Product.createProduct('6a84be08ba01efc6f6000006', 'Camiseta de algodón orgánico', [
    {
      sku: ProductSku.createProductSku('camiseta-organica'),
      size: Size.createSize('letter', 'M'),
      price: Money.createMoney(1995, 'EUR'),
      stock: StockQuantity.createStockQuantity(100),
      images: [
        {
          src: '/images/products/gallery-1.svg',
          alt: 'gallery1',
        },
        {
          src: '/images/products/gallery-2.svg',
          alt: 'gallery2',
        },
        {
          src: '/images/products/gallery-3.svg',
          alt: 'gallery3',
        },
        {
          src: '/images/products/gallery-4.svg',
          alt: 'gallery4',
        },
      ],
    },
  ]),

  Product.createProduct('6a84be08ba01efc6f6000007', 'Bolso tote de piel', [
    {
      sku: ProductSku.createProductSku('bolso-tote-piel'),
      size: Size.createSize('unique', 'Única'),
      price: Money.createMoney(19900, 'EUR'),
      stock: StockQuantity.createStockQuantity(100),
      images: [
        {
          src: '/images/products/gallery-1.svg',
          alt: 'gallery1',
        },
        {
          src: '/images/products/gallery-2.svg',
          alt: 'gallery2',
        },
        {
          src: '/images/products/gallery-3.svg',
          alt: 'gallery3',
        },
        {
          src: '/images/products/gallery-4.svg',
          alt: 'gallery4',
        },
      ],
    },
  ]),

  Product.createProduct('6a84be08ba01efc6f6000008', 'Sandalias de tiras con tacón', [
    {
      sku: ProductSku.createProductSku('sandalias-tiras'),
      size: Size.createSize('numeric-eu', 38),
      price: Money.createMoney(6995, 'EUR'),
      stock: StockQuantity.createStockQuantity(100),
      images: [
        {
          src: '/images/products/gallery-1.svg',
          alt: 'gallery1',
        },
        {
          src: '/images/products/gallery-2.svg',
          alt: 'gallery2',
        },
        {
          src: '/images/products/gallery-3.svg',
          alt: 'gallery3',
        },
        {
          src: '/images/products/gallery-4.svg',
          alt: 'gallery4',
        },
      ],
    },
  ]),

  Product.createProduct('6a84be08ba01efc6f6000009', 'Chaqueta vaquera relaxed', [
    {
      sku: ProductSku.createProductSku('chaqueta-vaquera'),
      size: Size.createSize('letter', 'M'),
      price: Money.createMoney(6995, 'EUR'),
      stock: StockQuantity.createStockQuantity(100),
      images: [
        {
          src: '/images/products/gallery-1.svg',
          alt: 'gallery1',
        },
        {
          src: '/images/products/gallery-2.svg',
          alt: 'gallery2',
        },
        {
          src: '/images/products/gallery-3.svg',
          alt: 'gallery3',
        },
        {
          src: '/images/products/gallery-4.svg',
          alt: 'gallery4',
        },
      ],
    },
  ]),

  Product.createProduct('6a84be08ba01efc6f6000010', 'Top de crochet artesanal', [
    {
      sku: ProductSku.createProductSku('top-crochet'),
      size: Size.createSize('letter', 'S'),
      price: Money.createMoney(3995, 'EUR'),
      stock: StockQuantity.createStockQuantity(100),
      images: [
        {
          src: '/images/products/gallery-1.svg',
          alt: 'gallery1',
        },
        {
          src: '/images/products/gallery-2.svg',
          alt: 'gallery2',
        },
        {
          src: '/images/products/gallery-3.svg',
          alt: 'gallery3',
        },
        {
          src: '/images/products/gallery-4.svg',
          alt: 'gallery4',
        },
      ],
    },
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
