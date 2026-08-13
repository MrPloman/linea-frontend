# LINEA — Scaffold visual de e-commerce (Angular 21)

Andamiaje **puramente visual** de un e-commerce de moda. No hay lógica de negocio:
ni HTTP, ni stores, ni servicios, ni validación. Cada punto donde falta lógica
real está marcado con un comentario `TODO(pol)` en el sitio exacto del código.

## Stack

- Angular 21 (standalone components, sin `NgModule`)
- **Zoneless** (`provideZonelessChangeDetection`, sin `zone.js`)
- **SSR + hydration** con event replay (`ng new --ssr`)
- Signals **solo para estado visual** (menú móvil, filtros off-canvas, paso del
  checkout, imagen activa de la galería…) — nunca para estado de negocio
- `inject()` en lugar de constructor injection
- SCSS con BEM + design tokens centralizados; `color.adjust()` (nada deprecado)
- Routing con lazy loading por ruta (`loadComponent`)
- Cero librerías de UI de terceros

## Arrancar

```bash
npm start        # dev server con SSR en http://localhost:4200
npm run build    # build de producción (navegador + servidor)
```

## Estructura

```
src/app/
├─ core/
│   ├─ domain/          ← VACÍO (aquí irán los modelos de negocio)
│   └─ application/     ← VACÍO (aquí irán los casos de uso)
├─ infrastructure/       ← VACÍO (aquí irán repositorios/HTTP)
├─ presentation/
│   ├─ pages/            home · catalog · product-detail · cart · checkout
│   │                    search-results · auth/login · auth/register
│   ├─ components/
│   │   ├─ layout/       header (nav responsive) · footer
│   │   ├─ product/      product-card · product-gallery · size-selector · color-selector
│   │   └─ shared/       button · badge · input · spinner · breadcrumbs
│   ├─ mocks/            datos estáticos hardcodeados (view models temporales)
│   └─ styles/
│       ├─ tokens/       color · spacing · typography
│       └─ mixins/       breakpoints (mobile-first) · helpers (container, a11y…)
```

Los tokens y mixins se importan por `includePaths` (ver `angular.json`):

```scss
@use 'tokens' as t;
@use 'mixins' as m;
```

Los imports TypeScript usan el alias `@presentation/*` (ver `tsconfig.json`).

## Qué falta por implementar (a propósito)

Busca los puntos pendientes con:

```bash
grep -rn "TODO(pol)" src
```

Resumen: catálogo/filtros/ordenación/paginación reales, carga del producto por
`:id`, carrito con cálculo de totales, validación de formularios, checkout con
envío real, autenticación, favoritos, newsletter, guards de ruta, y el widget de
stock en vivo del PDP (su hueco está en `product-detail.html`, marcado con
`<!-- TODO: live stock widget -->`).

Notas de arquitectura ya decididas en el scaffold:

- Los "view models" de `presentation/mocks/` son temporales: el modelo real vive
  en `core/domain` cuando exista.
- Las rutas del servidor (`app.routes.server.ts`) usan `RenderMode.Server`;
  valorar prerender cuando haya datos reales.
- Los precios están formateados a mano en los mocks; al implementar lógica,
  formatear con `CurrencyPipe`/`Intl`.
