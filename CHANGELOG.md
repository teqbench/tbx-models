# Changelog

## [3.2.4](https://github.com/teqbench/tbx-models/compare/v3.2.3...v3.2.4) (2026-05-09)


### Bug Fixes

* **ci:** pin reusable workflows to [@v2](https://github.com/v2).6.0 ([6d45616](https://github.com/teqbench/tbx-models/commit/6d456165fffbdc77d7bc2fc4dadde72d5cba1bad))

## [3.2.3](https://github.com/teqbench/tbx-models/compare/v3.2.2...v3.2.3) (2026-05-04)


### Reverts

* **readme:** keep Compatibility as pipe table for CI version-check ([0592314](https://github.com/teqbench/tbx-models/commit/05923145a2499305fdc7ec4c00eb19072748ad84))

## [3.2.2](https://github.com/teqbench/tbx-models/compare/v3.2.1...v3.2.2) (2026-04-21)


### Bug Fixes

* **build:** include CHANGELOG.md in published tarball ([3e466ac](https://github.com/teqbench/tbx-models/commit/3e466ac899f2b55f2c66f7da5d8d0ef485f36180))
* **build:** include CHANGELOG.md in published tarball ([4e6a2fa](https://github.com/teqbench/tbx-models/commit/4e6a2fade3b05ac1fcc9c820ea321a3404ff7026))

## [3.2.1](https://github.com/teqbench/tbx-models/compare/v3.2.0...v3.2.1) (2026-04-20)


### Bug Fixes

* **docs:** address findings from post-3.2.0 code review ([e61dab0](https://github.com/teqbench/tbx-models/commit/e61dab0de7201494118cf3db8765c46ba4e9634d))
* **docs:** repair README links to community health files ([0e2cf62](https://github.com/teqbench/tbx-models/commit/0e2cf628bfd3a4d58d704a43d94f70100e37fa41))

## [3.2.0](https://github.com/teqbench/tbx-models/compare/v3.1.0...v3.2.0) (2026-04-19)


### Features

* **community:** adopt org-default community health files ([ad2b2a6](https://github.com/teqbench/tbx-models/commit/ad2b2a65f5da8a2f72294fa2d0f1517106f33316))
* **community:** adopt org-default community health files ([796978a](https://github.com/teqbench/tbx-models/commit/796978ab1f0ce9f2fdf371bef3eba1c999589d57))


### Bug Fixes

* **security:** correct public-repo vulnerability reporting channel ([114d52a](https://github.com/teqbench/tbx-models/commit/114d52aa5475e02207fb9f0bfe7af85874595f17)), closes [#52](https://github.com/teqbench/tbx-models/issues/52)

## [3.1.0](https://github.com/teqbench/tbx-models/compare/v3.0.2...v3.1.0) (2026-04-13)


### Features

* **docs:** overhaul README and adopt the per-package docs pipeline ([d740c79](https://github.com/teqbench/tbx-models/commit/d740c799cd8759dbd106564425510883f17c242f))
* **docs:** overhaul README and adopt the per-package docs pipeline ([c5ecfe7](https://github.com/teqbench/tbx-models/commit/c5ecfe78a64b05b80045fe860227adc76db90f03))

## [3.0.2](https://github.com/teqbench/tbx-models/compare/v3.0.1...v3.0.2) (2026-04-06)


### Bug Fixes

* **deps:** update vite to 8.0.5 via vitest 4.1.2 to resolve CVEs ([1db3917](https://github.com/teqbench/tbx-models/commit/1db391702487d62b05487a24fefd0f47209e702e))
* **deps:** update vite to 8.0.5 via vitest 4.1.2 to resolve CVEs ([100d8ca](https://github.com/teqbench/tbx-models/commit/100d8cae80567ed267edfff27b0a67b539510f08))

## [3.0.1](https://github.com/teqbench/tbx-models/compare/v3.0.0...v3.0.1) (2026-04-06)


### Bug Fixes

* **deps:** trigger release for coordinated dependency updates ([6088307](https://github.com/teqbench/tbx-models/commit/6088307c2989443873de83aecc68510935d53ce7))
* **deps:** trigger release for coordinated dependency updates ([f88ac3f](https://github.com/teqbench/tbx-models/commit/f88ac3fbec3389cdb59c7e69d9067631706b4f22))

## [3.0.0](https://github.com/teqbench/tbx-models/compare/v2.0.0...v3.0.0) (2026-04-04)


### ⚠ BREAKING CHANGES

* **models:** the TbxModel export is removed; use TbxDomainEntityModel instead.

### Code Refactoring

* **models:** rename TbxModel to TbxDomainEntityModel and reorganize source layout ([d6bba09](https://github.com/teqbench/tbx-models/commit/d6bba09df86d0ebaec22a24ceb027e4f06e50e2e))

## [2.0.0](https://github.com/teqbench/tbx-models/compare/v1.0.0...v2.0.0) (2026-04-03)


### ⚠ BREAKING CHANGES

* **models:** rename TbxBaseModel to TbxModel

### Features

* **docs:** add TSDoc convention with custom tags and eslint-plugin-tsdoc ([d956c0f](https://github.com/teqbench/tbx-models/commit/d956c0f59b63fe48ff34b5e7260f546fcfa24003))


### Code Refactoring

* **models:** rename TbxBaseModel to TbxModel ([38494a0](https://github.com/teqbench/tbx-models/commit/38494a078c42a3031d8e209ec35f9feb13486598))

## [1.0.0](https://github.com/teqbench/tbx-models/compare/v0.1.0...v1.0.0) (2026-03-27)


### ⚠ BREAKING CHANGES

* **models:** BaseModel is now exported as TbxBaseModel.

### Code Refactoring

* **models:** prefix public exports with Tbx per naming convention ([a630ec0](https://github.com/teqbench/tbx-models/commit/a630ec0d034f242a765683d51dd70a2132d637f7))

## 0.1.0 (2026-03-25)


### Features

* **setup:** configure @teqbench/tbx-models package ([3e6b4e9](https://github.com/teqbench/tbx-models/commit/3e6b4e9c64742fc280202e3ff9421c9db777425b))
* **setup:** configure package as @teqbench/tbx-models with BaseModel interface ([8403741](https://github.com/teqbench/tbx-models/commit/8403741f2debc501749df3a3daff6af3a921efb2))


### Bug Fixes

* **build:** exclude spec files from tsconfig.build.json ([db334da](https://github.com/teqbench/tbx-models/commit/db334da2ab3236bfce0ec791f35b4f6e1f3c80ef)), closes [#3](https://github.com/teqbench/tbx-models/issues/3)

## Changelog
