# @teqbench/tbx-models

![Build Status](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/teqbench-shields-bot/a69600f4ed4ebed89ffb35d808e05eb4/raw/tbx-models-main-build-status.json) ![Tests](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/teqbench-shields-bot/a69600f4ed4ebed89ffb35d808e05eb4/raw/tbx-models-main-tests.json) ![Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/teqbench-shields-bot/a69600f4ed4ebed89ffb35d808e05eb4/raw/tbx-models-main-coverage.json) ![Version](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/teqbench-shields-bot/a69600f4ed4ebed89ffb35d808e05eb4/raw/tbx-models-main-version.json) ![Build Number](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/teqbench-shields-bot/a69600f4ed4ebed89ffb35d808e05eb4/raw/tbx-models-main-build-number.json)

> Foundational [TypeScript ↗](https://www.typescriptlang.org/) domain-model interfaces for the TeqBench framework — a single generic `TbxDomainEntityModel<TId>` contract establishing identity and audit-timestamp shape for every persistable entity consumed across all `@teqbench` packages.

<details>
<summary><strong>Table of contents</strong></summary>

- [Overview](#overview)
- [At a glance](#at-a-glance)
- [When to use](#when-to-use)
- [Installation](#installation)
- [Usage](#usage)
- [Concepts](#concepts)
- [API Reference](#api-reference)
- [Accessibility](#accessibility)
- [Compatibility](#compatibility)
- [Versioning & releases](#versioning--releases)
- [Contributing](#contributing)
- [Security](#security)
- [Feedback](#feedback)
- [License](#license)

</details>

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

## At a glance

- **Single foundational contract** — one generic interface, `TbxDomainEntityModel<TId>`, shared by every persistable entity across all `@teqbench` packages.
- **Generic identifier type** — parameterized `TId` (defaults to `string`) so consumers can use UUIDs, auto-increment numbers, or branded types without forking the interface.
- **ISO 8601 audit timestamps** — `createdAt` and `updatedAt` are [ISO 8601 ↗](https://www.iso.org/iso-8601-date-and-time-format.html) strings that serialize transparently to JSON without timezone ambiguity.
- **Types-only, zero runtime** — compiled-away [TypeScript ↗](https://www.typescriptlang.org/) interfaces with no JavaScript at runtime, no bundle-size cost, no dependencies.
- **Read-only identity** — `id` is declared `readonly` so consumers can't accidentally mutate identity after creation.
- **Strict minimum** — exactly three required properties, intentionally conservative so the contract stays stable across releases.
- **Framework-wide consistency** — every `@teqbench` package that models a persistable entity extends this same contract; no per-package drift.

## When to use

Extend `TbxDomainEntityModel` for any domain entity that your application persists and reads back by identity. Typical examples: users, orders, content records, session records, audit events.

Do not use it for:

- **Transient input shapes** — form state, API request bodies, client-side derived objects that never get persisted. Define those as their own interfaces; don't inherit from the entity contract just because they're in the domain.
- **Value objects** — an address, a monetary amount, a date range. Value objects have no identity and aren't independently persisted.
- **Non-TeqBench models** — if you're modeling data for an external API or library, use that library's own contracts; don't force this shape onto it.

## Installation

Configure [npm ↗](https://www.npmjs.com/) to use [GitHub Packages ↗](https://github.com/orgs/teqbench/packages) for the `@teqbench` scope:

```bash
echo "@teqbench:registry=https://npm.pkg.github.com" >> .npmrc
```

Install the package:

```bash
npm install @teqbench/tbx-models
```

## Usage

### Default string identifier

```typescript
import type { TbxDomainEntityModel } from '@teqbench/tbx-models';

interface User extends TbxDomainEntityModel {
    email: string;
    displayName: string;
}

// TypeScript infers: { id: string, createdAt: string, updatedAt: string, email: string, displayName: string }
```

### Numeric identifier

```typescript
import type { TbxDomainEntityModel } from '@teqbench/tbx-models';

interface LegacyRecord extends TbxDomainEntityModel<number> {
    label: string;
}
```

### Branded identifier type

```typescript
import type { TbxDomainEntityModel } from '@teqbench/tbx-models';

type UserId = string & { readonly __brand: 'UserId' };

interface User extends TbxDomainEntityModel<UserId> {
    email: string;
}

// Now a plain string cannot be passed where a UserId is expected, at compile time.
```

### Pre-persisted (input) shape

```typescript
import type { TbxDomainEntityModel } from '@teqbench/tbx-models';

interface User extends TbxDomainEntityModel {
    email: string;
}

// Input shape for creating a new user — no id, no audit timestamps yet.
type CreateUserInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
```

## Concepts

- **Domain entity** — a persistable object in the application's problem domain that is identified by a stable `id` and tracked by audit timestamps.
- **Identifier type (`TId`)** — the generic parameter of `TbxDomainEntityModel` that lets consumers choose the identifier strategy (`string` default, `number`, branded type, etc.).
- **Audit timestamp** — the `createdAt` / `updatedAt` pair carrying [ISO 8601 ↗](https://www.iso.org/iso-8601-date-and-time-format.html) datetimes that record when the entity was created and last modified.
- **ISO 8601** — the international standard for date and time representation (e.g. `2026-04-12T19:30:00Z`) used as the wire format for audit timestamps.
- **Branded type** — a nominal-typing [TypeScript ↗](https://www.typescriptlang.org/) pattern (e.g. `string & { readonly __brand: 'UserId' }`) that prevents accidental mixing of identifiers from different domains at compile time.
- **Persistable entity** — an object the application stores and reads back by `id` — contrasted with transient input shapes or value objects, which should not extend this contract.

## API Reference

### `TbxDomainEntityModel<TId = string>`

Base interface for all TeqBench domain models. Every persistable entity extends this contract.

<dl>
    <dt><code>id</code> (<code>TId</code>)</dt>
    <dd>Unique identifier. Readonly — set once at creation and never reassigned. Defaults to <code>string</code> when <code>TId</code> is omitted.</dd>
    <dt><code>createdAt</code> (<code>string</code>)</dt>
    <dd><a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO 8601 ↗</a> timestamp indicating when the record was created.</dd>
    <dt><code>updatedAt</code> (<code>string</code>)</dt>
    <dd><a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO 8601 ↗</a> timestamp indicating when the record was last modified.</dd>
</dl>

## Accessibility

Not applicable — types-only package, no UI surface.

## Compatibility

<dl>
    <dt><a href="https://www.typescriptlang.org/">TypeScript ↗</a></dt>
    <dd>~5.9.0</dd>
    <dt><a href="https://nodejs.org/">Node.js ↗</a></dt>
    <dd>>=24.0.0</dd>
</dl>

## Versioning & releases

This package follows [Semantic Versioning ↗](https://semver.org/). Versions and changelog entries are produced automatically by [Release Please ↗](https://github.com/googleapis/release-please) from [Conventional Commits ↗](https://www.conventionalcommits.org/) on `main`. See [CHANGELOG.md](CHANGELOG.md) for the full release history.

## Contributing

Contributions are welcome. See the [contributing guide ↗](https://github.com/teqbench/.github/blob/main/CONTRIBUTING.md) for local setup, [GitHub Packages ↗](https://github.com/orgs/teqbench/packages) authentication, branch conventions, commit format, and the PR workflow.

## Security

See the [security policy ↗](https://github.com/teqbench/.github/blob/main/SECURITY.md) for the supported-version policy and how to report a vulnerability privately.

## Feedback

- [Report a bug ↗](https://github.com/teqbench/tbx-models/issues/new?template=bug_report.md)
- [Request a feature ↗](https://github.com/teqbench/tbx-models/issues/new?template=feature_request.md)

## License

[AGPL-3.0](LICENSE) — Copyright 2026 TeqBench
