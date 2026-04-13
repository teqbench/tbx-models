---
tagline: Foundational [TypeScript ↗](https://www.typescriptlang.org/) domain-model interfaces for the TeqBench framework — a single generic `TbxDomainEntityModel<TId>` contract establishing identity and audit-timestamp shape for every persistable entity consumed across all `@teqbench` packages.
---

## Overview

`@teqbench/tbx-models` defines the single foundational contract that every persistable domain entity in the TeqBench framework extends. It is intentionally small — one generic `interface TbxDomainEntityModel<TId = string>` with three properties (`id`, `createdAt`, `updatedAt`) and nothing else. The point isn't feature surface; the point is that every other `@teqbench` package that touches persisted data consumes this one contract, so every entity in a TeqBench-based application shares the same identity and audit-timestamp shape.

The contract is a [TypeScript ↗](https://www.typescriptlang.org/) `interface`, not a class — the package ships zero runtime code. When compiled, consuming applications gain static type-checking against the contract with no bundle-size cost, no runtime dependencies, and no behavior that could drift between versions. The only thing that can change in this package is the shape of the contract itself, and that shape is intentionally conservative: the three properties are the minimum useful set for a persistable entity across any reasonable storage backend.

### Why a single shared contract

Without a shared contract, every package in the framework that modeled a persistable entity would define its own ad-hoc `id` / `createdAt` / `updatedAt` fields — usually with subtly different types (`string` vs `Date`, optional vs required, `_id` vs `id`, millisecond timestamps vs ISO strings, etc.). Cross-package composition would require an adapter layer for each boundary. Keeping this one contract in a single foundational package means every package modeling an entity agrees on exactly the same three fields, and cross-package code can assume them without conversion.

### The generic `TId` parameter

The identifier type is generic (`TbxDomainEntityModel<TId = string>`) so consumers can adapt to whatever identifier strategy their storage backend uses without forking the interface. Common choices:

- **`string` (the default)** — typically a UUID v4 generated client- or server-side. Good for distributed systems where ID generation doesn't need to round-trip to the database.
- **`number`** — for legacy databases with auto-increment integer keys or for packages migrating from an older data model.
- **Branded types** — e.g. `string & { readonly __brand: 'UserId' }` — for compile-time separation of identifier spaces so you can't accidentally pass a `UserId` where an `OrderId` is expected.

Because `TId` is generic, consumers retain full type-inference on `id` fields throughout their domain model without runtime cost.

### Audit timestamps

`createdAt` and `updatedAt` are typed as `string`, carrying [ISO 8601 ↗](https://www.iso.org/iso-8601-date-and-time-format.html) formatted datetimes. This is deliberate: ISO 8601 strings serialize transparently to JSON without the timezone-ambiguity issues of `Date` objects (which JSON.stringify converts to UTC ISO strings anyway, but then JSON.parse returns strings, breaking round-trips). Storing the wire representation as the canonical type avoids one layer of conversion code at every storage boundary.

The fields are not optional. Every persistable entity in TeqBench has both — set once at creation time (`createdAt`) and whenever the record changes (`updatedAt`). Entities that don't yet have these fields populated are "pre-persisted" transient models and should use a different shape (e.g. `Omit<TbxDomainEntityModel, 'createdAt' | 'updatedAt'>` or a distinct input-shape interface).

## When to use

Extend `TbxDomainEntityModel` for any domain entity that your application persists and reads back by identity. Typical examples: users, orders, content records, session records, audit events.

Do not use it for:

- **Transient input shapes** — form state, API request bodies, client-side derived objects that never get persisted. Define those as their own interfaces; don't inherit from the entity contract just because they're in the domain.
- **Value objects** — an address, a monetary amount, a date range. Value objects have no identity and aren't independently persisted.
- **Non-TeqBench models** — if you're modeling data for an external API or library, use that library's own contracts; don't force this shape onto it.
