import { RenderMode, ServerRoute } from '@angular/ssr';

// TODO(pol): cuando exista catálogo real, valorar prerender (RenderMode.Prerender
// + getPrerenderParams) para las rutas estáticas y las fichas de producto.
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
