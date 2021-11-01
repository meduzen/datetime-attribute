# Changelog

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Before 1.0.0, many _MINOR_ releases have breaking changes.

## Unreleased

Compare with [last published version](https://github.com/meduzen/datetime-attribute/compare/1.1.0...main).

## v1.1.0 (2021-11-01)

Compare with [last published version](https://github.com/meduzen/datetime-attribute/compare/1.0.0...1.1.0).

### New

- Add a [`DateTime()` class](https://github.com/meduzen/datetime-attribute#the-datetime-class) extending the native `Date` object. Available methods: `getWeek()`, `setWeek()` and `to()`.

### Fixed

- Allow `datetimeTz()` without parameters. Before, the date was mandatory.
- Improve types declaration.

### Under the hood

- Add a NPM script to generate types.
- Update ESLint rules.

## v1.0.0 (2021-10-30) 🎉

Compare with [previous version](https://github.com/meduzen/datetime-attribute/compare/0.7.0...1.0.0).

The usage remains the same as in the previous version.

## v0.7.0 (2021-07-11)

Compare with [previous version](https://github.com/meduzen/datetime-attribute/compare/0.6.0...0.7.0).

### Changed

- Forbid `null` as valid `duration()` argument: `duration(null)` now throws an error.

### New

- Add [types](https://github.com/meduzen/datetime-attribute/tree/main/types) for TypeScript users.

### Fixed

- Fix zero-seconds `duration()` returning `null` instead of `PT0S`.

## v0.6.0 (2021-07-10)

Compare with [previous version](https://github.com/meduzen/datetime-attribute/compare/0.5.1...0.6.0).

### Changed

- `datetimeDuration()` has been renamed [`duration()`](https://github.com/meduzen/datetime-attribute#expressing-durations-with-duration).

### New

- Add [`utc()`](https://github.com/meduzen/datetime-attribute#the-utc-shortcut) as a shortcut to `datetime(myDateObject, 'datetime utc')`.

### Under the hood

- The project now has an ESLint configuration.

## v0.5.1 (2021-07-05)

Compare with [previous version](https://github.com/meduzen/datetime-attribute/compare/0.5.0...0.5.1).

### Fixed

The _day_ number in `datetime()` and `datetimeTz()` was wrong before the 10th of the month. For example, the 5th of July became `2021-07-5T` instead of `2021-07-5T`.

## v0.5.0 (2021-05-02)

Compare with [previous version](https://github.com/meduzen/datetime-attribute/compare/0.4.2...0.5.0).

### Changed

- `tzOffset()` and `datetimeTz()` now adjust the timezone to fit the spec boundaries (from `-23:59` to `+23:59`). There was no limits before.

### New

- `tzOffset()` now accepts a [third parameter](https://github.com/meduzen/datetime-attribute#real-life-timezone-offset). When set to `true`, it enforce the provided timezone to stay in real-life boundaries (from `-12:00` to `+14:00`).
- This also applies to `datetimeTz()`, which now accepts a fifth parameter to be on par with how `tzOffset()` works.

## v0.4.2 (2021-05-02)

Compare with [previous version](https://github.com/meduzen/datetime-attribute/compare/0.4.1...0.4.2).

### New

- `datetimeDuration()` now accepts a [second parameter](https://github.com/meduzen/datetime-attribute#units-overflow). When set to `false`, overflow units won’t be converted anymore. 

### Documentation

- Add a table of contents, summary usage and package size.
- Improve various parts of the documentation and the release notes.

## v0.4.1 (2021-04-03)

Compare with [previous version](https://github.com/meduzen/datetime-attribute/compare/0.3.0...0.4.1).

### New

- Add `datetimeTz()` to indicate that a `datetime` attribute belongs to the specified timezone offset.

### Changed

- Rename `datetimeTz()` to `tzOffset()`

## v0.3.0 (2021-04-02)

Compare with [previous version](https://github.com/meduzen/datetime-attribute/compare/0.2.1...0.3.0).

### Changed

- `datetime()`: `local` and `global` precision keywords are now `datetime` and `utc`.

### New

- Add `datetime()` missing global precisions.

## v0.2.1 (2021-04-02)

Compare with [previous version](https://github.com/meduzen/datetime-attribute/compare/0.1.7...0.2.1).

### Changed

- `datetime()` without parameter is now accepted: instead of throwing an error it defaults to _now_ with the default precision (`YYYY-mm-dd`).

### New

- [`tzOffset()`](https://github.com/meduzen/datetime-attribute#expressing-timezone-offsets-with-tzOffset) to express timezone offsets

### Documentation

- Rewrite most of the documentation.

## v0.1.7 (2021-04-01)

Compare with [previous version](https://github.com/meduzen/datetime-attribute/compare/0.1.6...0.1.7).

### Improved

- Shorten `datetimeDuration()` footprint by a couple of bytes.

### Documentation

- Fix duration datetime output in documentation.

## v0.1.6 (2021-03-21)

Compare with [previous version](https://github.com/meduzen/datetime-attribute/compare/0.1.5...0.1.6).

### Improved

- Rewrite how `datetime()` works to shorten its footprint.

## v0.1.5 (2021-03-14)

Compare with [previous version](https://github.com/meduzen/datetime-attribute/compare/0.1.4...0.1.5).

### New

- Mark the package as being side effects free.

## v0.1.4 (2021-03-14)

First published version.
