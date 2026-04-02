# @teqbench/tbx-models

![Build Status](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/teqbench-shields-bot/a69600f4ed4ebed89ffb35d808e05eb4/raw/tbx-models-main-build-status.json) ![Tests](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/teqbench-shields-bot/a69600f4ed4ebed89ffb35d808e05eb4/raw/tbx-models-main-tests.json) ![Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/teqbench-shields-bot/a69600f4ed4ebed89ffb35d808e05eb4/raw/tbx-models-main-coverage.json) ![Version](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/teqbench-shields-bot/a69600f4ed4ebed89ffb35d808e05eb4/raw/tbx-models-main-version.json) ![Build Number](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/teqbench-shields-bot/a69600f4ed4ebed89ffb35d808e05eb4/raw/tbx-models-main-build-number.json)

> [TypeScript ↗](https://www.typescriptlang.org/) domain model interfaces for the TeqBench application framework. Provides TbxModel contracts consumed by all @teqbench packages.

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

```typescript
import type { TbxModel } from '@teqbench/tbx-models';

// Extend TbxModel for your domain entities
interface User extends TbxModel {
    email: string;
}

// Use a numeric identifier
interface LegacyRecord extends TbxModel<number> {
    label: string;
}
```

## API Reference

### `TbxModel<TId = string>`

Base interface for all TeqBench domain models. Every persistable entity extends this contract.

| Property    | Type     | Description                              |
| ----------- | -------- | ---------------------------------------- |
| `id`        | `TId`    | Unique identifier (defaults to `string`) |
| `createdAt` | `string` | [ISO 8601 ↗](https://www.iso.org/iso-8601-date-and-time-format.html) timestamp of record creation    |
| `updatedAt` | `string` | [ISO 8601 ↗](https://www.iso.org/iso-8601-date-and-time-format.html) timestamp of last record update |

## Compatibility

| Dependency | Version  |
| ---------- | -------- |
| [TypeScript ↗](https://www.typescriptlang.org/) | ~5.9.0   |
| [Node.js ↗](https://nodejs.org/)                | >=24.0.0 |

## Feedback

- [Report a bug ↗](https://github.com/teqbench/tbx-models/issues/new?template=bug_report.md)
- [Request a feature ↗](https://github.com/teqbench/tbx-models/issues/new?template=feature_request.md)

## License

[Apache-2.0](LICENSE) — Copyright 2025 TeqBench
