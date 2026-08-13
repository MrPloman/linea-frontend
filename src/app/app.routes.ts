import { Routes } from '@angular/router';

// TODO(pol): guards de ruta (p. ej. checkout solo con carrito, cuenta solo con
// sesión) cuando exista lógica real de negocio.
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./presentation/pages/home/home').then((m) => m.Home),
    title: 'LINEA — Moda atemporal',
  },
  {
    path: 'catalogo',
    loadComponent: () => import('./presentation/pages/catalog/catalog').then((m) => m.Catalog),
    title: 'Catálogo — LINEA',
  },
  {
    path: 'producto/:id',
    loadComponent: () =>
      import('./presentation/pages/product-detail/product-detail').then((m) => m.ProductDetail),
    // TODO(pol): título dinámico con el nombre del producto (TitleStrategy o resolver)
    title: 'Producto — LINEA',
  },
  {
    path: 'carrito',
    loadComponent: () => import('./presentation/pages/cart/cart').then((m) => m.Cart),
    title: 'Bolsa — LINEA',
  },
  {
    path: 'checkout',
    loadComponent: () => import('./presentation/pages/checkout/checkout').then((m) => m.Checkout),
    title: 'Tramitar pedido — LINEA',
  },
  {
    path: 'buscar',
    loadComponent: () =>
      import('./presentation/pages/search-results/search-results').then((m) => m.SearchResults),
    title: 'Buscar — LINEA',
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./presentation/pages/auth/login/login').then((m) => m.Login),
    title: 'Iniciar sesión — LINEA',
  },
  {
    path: 'auth/registro',
    loadComponent: () =>
      import('./presentation/pages/auth/register/register').then((m) => m.Register),
    title: 'Crear cuenta — LINEA',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
