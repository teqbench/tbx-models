# @teqbench/tbx-models

![Build Status](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/teqbench-shields-bot/a69600f4ed4ebed89ffb35d808e05eb4/raw/tbx-models-main-build-status.json) ![Tests](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/teqbench-shields-bot/a69600f4ed4ebed89ffb35d808e05eb4/raw/tbx-models-main-tests.json) ![Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/teqbench-shields-bot/a69600f4ed4ebed89ffb35d808e05eb4/raw/tbx-models-main-coverage.json) ![Version](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/teqbench-shields-bot/a69600f4ed4ebed89ffb35d808e05eb4/raw/tbx-models-main-version.json) ![Build Number](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/teqbench-shields-bot/a69600f4ed4ebed89ffb35d808e05eb4/raw/tbx-models-main-build-number.json)

> TypeScript domain model interfaces for the TeqBench application framework. Provides TbxBaseModel contracts consumed by all @teqbench packages.

## Installation

Configure npm to use GitHub Packages for the `@teqbench` scope:

```bash
echo "@teqbench:registry=https://npm.pkg.github.com" >> .npmrc
```

Install the package:

```bash
npm install @teqbench/tbx-models
```

## Usage

```typescript
import type { TbxBaseModel } from '@teqbench/tbx-models';

// Extend TbxBaseModel for your domain entities
interface User extends TbxBaseModel {
    email: string;
}

// Use a numeric identifier
interface LegacyRecord extends TbxBaseModel<number> {
    label: string;
}
```

## API Reference

### `TbxBaseModel<TId = string>`

Base interface for all TeqBench domain models. Every persistable entity extends this contract.

| Property    | Type     | Description                              |
| ----------- | -------- | ---------------------------------------- |
| `id`        | `TId`    | Unique identifier (defaults to `string`) |
| `createdAt` | `string` | ISO-8601 timestamp of record creation    |
| `updatedAt` | `string` | ISO-8601 timestamp of last record update |

## Compatibility

| Dependency | Version  |
| ---------- | -------- |
| TypeScript | ~5.9.0   |
| Node.js    | >=24.0.0 |

## License

[Apache-2.0](LICENSE) — Copyright 2025 TeqBench
