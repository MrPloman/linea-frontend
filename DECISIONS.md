# DECISIONS.md

Architectural decisions for the e-commerce project, with the reasoning behind them — written while the reasoning is still fresh, so a future session doesn't have to reconstruct it from scratch.

---

## NgRx Store (classic) vs. SignalStore — when to use which

Both are used deliberately in this project, not by accident. The criterion isn't "which is newer" — it's about the _shape_ of the state and what it needs to do.

### Cart & session → classic NgRx Store

**Reasoning:**

- The cart needs an auditable history of actions (add item, remove item, update quantity) — classic Store's action-based model gives this for free; SignalStore doesn't have an equivalent concept.
- Cart changes need a side effect: syncing to `CartRepository` (localStorage today, possibly a backend call later) on every mutation. Effects are the natural fit — they're literally designed for "action happened → run a side effect".
- Session/auth state changes infrequently and has clear, discrete side effects (login → Effect → store token, call `ProductRepository`/whatever needs the token). Same shape as cart: action in, effect out.

**Open question:** exactly which cart actions warrant their own effect vs. being batched (e.g. does every `updateQuantity` trigger an immediate localStorage write, or is it debounced?). Not decided — revisit when the classic Store is actually wired up in Phase 2.

### Catalog/navigation state & the live module → NgRx SignalStore

**Reasoning:**

- Catalog state (active filters, selected product, search query) changes frequently and is read directly in templates — SignalStore's native signal integration means no selectors boilerplate for what's essentially "current UI-adjacent state".
- The live stock/price module (Phase 3) is high-frequency and ephemeral by nature — no action history is meaningful for a value that changes every few hundred milliseconds. SignalStore fits without forcing an action-based mental model onto data that doesn't need one.

**Open question:** none yet — this one felt more clear-cut than the classic Store side. Revisit if catalog filtering logic grows complex enough to want reducer-style predictability.

---

## Domain layer: repository ports (`ProductRepository`, `CartRepository`)

Both are defined as interfaces in `core/domain`, with zero knowledge of _how_ data is fetched or persisted — no `HttpClient`, no `localStorage` reference, nothing framework-specific.

**Why:** so the domain (and anything built against these ports — stores, use cases) survives untouched if the underlying implementation changes. `CartRepository` today will be backed by `localStorage`; if it later needs to move to a real backend call (e.g. so a logged-in customer sees the same cart across devices), the interface doesn't change — only the concrete implementation in `infrastructure/` does.

**Why `Promise`-based signatures even though `localStorage` is synchronous:** designing the interface as async from day one means consumers (stores, effects) never need to know or care whether the concrete implementation is instant (`localStorage`) or network-bound (a future API call). Changing the implementation later never forces a signature change — and therefore never forces changes to every consumer of the port.

**Cart persistence scope:** decided to persist across sessions (survives closing the browser), not just tab-lifetime — backed by `localStorage` for now. This mirrors how real e-commerce carts behave; losing a cart because someone closed the tab is a real, avoidable loss of a sale.

---

## Domain modeling philosophy (value objects & entities)

Established and applied consistently across `Money`, `ProductSku`, `Size`, `StockQuantity`, `Product`, `CartItem`, `Order`:

- **Private constructor + static factory.** The only way to obtain an instance is through a factory that validates invariants — an invalid instance should be structurally impossible to create, not just discouraged by convention.
- **Immutability.** Every mutating-sounding method (`add`, `substract`, `decrementVariantStock`, `updateQuantity`, `transitionTo`) returns a _new_ instance instead of mutating `this`. This isn't just a style preference — Angular signals need a new reference to detect a change; mutating in place silently breaks change detection.
- **Don't re-validate what a value object already guarantees.** If a field's type is `Money`, `ProductSku`, `Size`, or `StockQuantity`, its validity is already guaranteed by construction — re-checking its internal shape at every consumption site (e.g. `Number.isInteger(variant.price)`) is redundant and, worse, was a repeated source of real bugs today (checking `Number.isInteger` against a `Money` instance, which is never an integer, always throws). Trust the type; only validate invariants that are genuinely new at that level (e.g. "no duplicate SKUs within this product" can only be checked at the `Product` level, since no single `ProductSku` can know about its siblings).
- **When to re-run the factory vs. construct directly (`new X(...)`).** After any mutating-style method, ask: can this specific operation violate any invariant the factory protects? If provably no (e.g. `decrementVariantStock` only ever touches an existing variant's `stock` field — it can't empty the array or introduce a duplicate SKU), constructing directly is correct and avoids redundant work. If yes (e.g. `CartItem.updateQuantity` can violate "quantity > 0"), re-run the factory.
- **Money is stored in integer cents, never floats.** Decimal string conversions back to `number` (e.g. via `toDisplayString()`) must never re-enter domain calculations — this reintroduces the floating-point precision problem the whole design exists to avoid. `Order.getTotal()` was initially written this way and had to be corrected to use `Money.add`/`Money.multiply` throughout.
- **Cart price freezing.** `CartItem.priceAtAddTime` is a frozen `Money` snapshot, not a live reference to the product's current price. Prices are only revalidated at checkout, with an explicit notice if they changed — silently fluctuating cart totals erode customer trust, even though a "live price" model would have been architecturally simpler.
- **Order state transitions are a explicit state machine**, not a free-form status field. `Order.transitionTo` checks a `VALID_TRANSITIONS` map before allowing a change; an invalid transition (e.g. `delivered → cancelled`) throws rather than silently succeeding. Same philosophy as Atelier's structural-vs-content error split: an impossible state transition is a programming error, not a business condition to handle gracefully.

---

## Pending / not yet built

- **Hexagonal ESLint plugin** — referenced in the original roadmap, not built yet. Revisit once enough real folder-boundary violations have happened organically to know what rules are actually worth enforcing, rather than guessing upfront.
- **Testing setup** — Jest and Playwright installed, but no test suites written yet for the Phase 0 domain layer. Natural next step: unit tests for `Money`, `Size`, `Order.transitionTo` (the state machine is the highest-value target — it's where a silent bug would be most damaging).
