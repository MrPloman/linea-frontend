// ============================================================
// DATOS MOCK — solo para maquetado visual.
//
// TODO(pol): sustituir por modelos de dominio en core/domain,
// casos de uso en core/application y repositorios reales en
// infrastructure/. Estas interfaces son "view models" temporales
// y NO deben convertirse en el modelo de negocio definitivo.
// ============================================================

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

export const MOCK_PRODUCTS: ProductMockVM[] = [
  {
    id: 'camisa-lino-oversize',
    name: 'Camisa de lino oversize',
    price: '49,95 €',
    image: '/images/products/p1.svg',
    imageAlt: 'Camisa de lino oversize en color arena',
    colors: ['#d8cfc4', '#f1ede7', '#44413c'],
  },
  {
    id: 'vestido-midi-satinado',
    name: 'Vestido midi satinado',
    price: '79,95 €',
    image: '/images/products/p2.svg',
    imageAlt: 'Vestido midi satinado en color piedra',
    badge: 'nuevo',
    colors: ['#b8aca1', '#1c1b19'],
  },
  {
    id: 'pantalon-wide-leg',
    name: 'Pantalón wide-leg de sarga',
    price: '59,95 €',
    image: '/images/products/p3.svg',
    imageAlt: 'Pantalón wide-leg de sarga en verde salvia',
    colors: ['#a9b2a4', '#d8cfc4', '#1c1b19'],
  },
  {
    id: 'blazer-estructurada',
    name: 'Blazer estructurada de lana',
    price: '119,00 €',
    image: '/images/products/p4.svg',
    imageAlt: 'Blazer estructurada de lana en beige',
    badge: 'nuevo',
    colors: ['#d0bfae', '#44413c'],
  },
  {
    id: 'jersey-cashmere',
    name: 'Jersey de cashmere con cuello redondo',
    price: '149,00 €',
    image: '/images/products/p5.svg',
    imageAlt: 'Jersey de cashmere en gris topo',
    colors: ['#b5afa5', '#f1ede7', '#9c7a54'],
  },
  {
    id: 'falda-plisada',
    name: 'Falda midi plisada',
    price: '45,95 €',
    originalPrice: '65,95 €',
    image: '/images/products/p6.svg',
    imageAlt: 'Falda midi plisada en tono arcilla',
    badge: 'rebajas',
    colors: ['#c0a48e'],
  },
  {
    id: 'trench-clasico',
    name: 'Trench clásico con cinturón',
    price: '159,00 €',
    image: '/images/products/p7.svg',
    imageAlt: 'Trench clásico con cinturón en azul grisáceo',
    colors: ['#a3a9b1', '#d0bfae'],
  },
  {
    id: 'camiseta-organica',
    name: 'Camiseta de algodón orgánico',
    price: '19,95 €',
    image: '/images/products/p8.svg',
    imageAlt: 'Camiseta de algodón orgánico en crudo',
    colors: ['#e4ddd0', '#1c1b19', '#a3a9b1'],
  },
  {
    id: 'bolso-tote-piel',
    name: 'Bolso tote de piel',
    price: '199,00 €',
    image: '/images/products/p9.svg',
    imageAlt: 'Bolso tote de piel en marrón cuero',
    colors: ['#b09a83', '#1c1b19'],
  },
  {
    id: 'sandalias-tiras',
    name: 'Sandalias de tiras con tacón',
    price: '69,95 €',
    originalPrice: '89,95 €',
    image: '/images/products/p10.svg',
    imageAlt: 'Sandalias de tiras con tacón en beige',
    badge: 'rebajas',
    colors: ['#beb7ab'],
  },
  {
    id: 'chaqueta-vaquera',
    name: 'Chaqueta vaquera relaxed',
    price: '69,95 €',
    image: '/images/products/p11.svg',
    imageAlt: 'Chaqueta vaquera relaxed en tono desgastado',
    colors: ['#a89c89', '#a3a9b1'],
  },
  {
    id: 'top-crochet',
    name: 'Top de crochet artesanal',
    price: '39,95 €',
    image: '/images/products/p12.svg',
    imageAlt: 'Top de crochet artesanal en tono tierra',
    badge: 'nuevo',
    colors: ['#c3ad9f', '#e4ddd0'],
  },
];

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
