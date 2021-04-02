# Changelog

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Until it reaches 1.0.0, breaking changes will bump the _MINOR_ digit (the second one).

## v0.4.1 (2021-04-03)

Compare with [last version](https://github.com/meduzen/datetime-attribute/compare/0.3.0...main).

### New

- Add `datetimeTz()` to indicate a `datetime` attribute belongs to the specified timezone offset.

### Changed

- Rename `datetimeTz()` to `tzOffset()`

## v0.3.0 (2021-04-02)

Compare with [last version](https://github.com/meduzen/datetime-attribute/compare/0.2.1...0.3.0).

### New

- Add `datetime()` missing global precisions.

### Changed

- `datetime()`: `local` and `global` precision keywords are now `datetime` and `utc`.

## v0.2.1 (2021-04-02)

Compare with [previous version](https://github.com/meduzen/datetime-attribute/compare/0.1.7...0.2.1).

### New

- [`tzOffset()`](https://github.com/meduzen/datetime-attribute#expressing-timezone-offsets-with-tzOffset) to express timezone offsets

### Changed

- `datetime()` without parameter is now accepted: instead of throwing an error it defaults to now with the default precision (`YYYY-mm-dd`).

### Documentation

- Rewrite most of the documentation.

## v0.1.7 (2021-04-01)

Compare with [previous version](https://github.com/meduzen/datetime-attribute/compare/0.1.6...0.1.7).

### Improved

Shorten `datetimeDuration()` footprint by a couple of bytes.

### Documentation

Also fix duration datetime output in documentation.

## v0.1.6 (2021-03-21)

Compare with [previous version](https://github.com/meduzen/datetime-attribute/compare/0.1.5...0.1.6).

### Improved

Rewrite how `datetime()` works to shorten its footprint.

## v0.1.5 (2021-03-14)

### New

Compare with [previous version](https://github.com/meduzen/datetime-attribute/compare/0.1.4...0.1.5).

Mark the package as being side effects free.

## v0.1.4 (2021-03-14)

First published version.
