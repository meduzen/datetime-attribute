# Changelog

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

Nothing for now.

Compare with [last published version](https://github.com/meduzen/datetime-attribute/compare/1.3.3...main).

### Fixed

- Fix incorrect year for `datetime(date, 'week')` when the week started the previous year. For example, `2021-01-01` is a Friday and its week belongs to 2020 (as [per spec](./README.md#weeknumber)). In that case, the output was `2021-W53` instead of `2020-W53`.

### Improved

- Improve type definitions where `?` and `undefined` are redundant by removing `undefined`:
  - for some signatures of optional parameters from `datetime(date?: Date | undefined` to `datetime(date?: Date`
  - for some optional properties from `{ w?: number | undefined }` to `{ w?: number }`

### Under the hood

- Enforce type definitions for optional properties of the internal config functions `setConfig` and `setTzConfig`: it was possible to omit their `separator` property, it’s not anymore.
- Upgrade ESLint from 8 to [9](https://eslint.org/blog/2024/04/eslint-v9.0.0-released/) and lint tests using [`eslint-plugin-vitest`](https://github.com/veritem/eslint-plugin-vitest).
- Split test file and move tests closer to the code.

## v1.3.3 (2024-02-23)

Compare with [previous version](https://github.com/meduzen/datetime-attribute/compare/1.3.2...1.3.3).

### Fixed
 
- Fix `.js` file extension missing in an `import` statement when trying to `import { datetime }`, which worked in some bundlers but could fail in others or when not using any bundler. This issue was [introduced](https://github.com/meduzen/datetime-attribute/pull/38/files#diff-5146f40a8c8111b14e5ab3407eff80c7a6d2f3c92a4bf4ccd4647bff32d47e38R4) in version 1.3.0.

### Documentation

- Fix typos.

### Under the hood

- The NPM command to test types has been changed from `test-types` to `test:types`.
- Update tooling for Node 20.
- Configure the dependencies update automation to group them by categories.
- Monitor package size on pull request.

## v1.3.2 (2023-08-05)

Compare with [previous version](https://github.com/meduzen/datetime-attribute/compare/1.3.1...1.3.2).

### Improved

- Shorten `daysBetween()` and `DateTime` footprint by a couple of bytes.

> [!WARNING]  
> When not transpiled, `DateTime` now requires support for [`class` fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields#browser_compatibility) (Safari 14.0).

### Under the hood

- Replace NPM by pnpm.

## v1.3.1 (2023-02-10)

Compare with [previous version](https://github.com/meduzen/datetime-attribute/compare/1.3.0...1.3.1).

### Fixed

- Typo (grammar) in types documentation.

### Under the hood

- Add code of conduct, issue template, contributing guidelines, code analysis, dependabot, CodeQL.
- Replace Jest by Vitest.

## v1.3.0 (2022-10-10)

Compare with [previous version](https://github.com/meduzen/datetime-attribute/compare/1.2.0...1.3.0).

### New

- Support years with more then 4 digits (`12345-01-01`).
- Support years prior to year 1 (`-0051-01-01`).
- Add [`setTimeSeparator()`](https://github.com/meduzen/datetime-attribute#datetime-separator) to customize the separator between date and time.

### Fixed

- Missing zero-padding in front of years with less then 4 digits (`0537-01-01`).

### Documentation

- Update bundle sizes and related links.
- Fix links in this changelog.

### Under the hood

- Update development dependencies.
- Update `package.json` description and keywords fields.
- Update GitHub actions.

## v1.2.0 (2022-03-10)

Compare with [previous](https://github.com/meduzen/datetime-attribute/compare/1.1.0...1.2.0).

### New

- Add [`setTzSeparator()`](https://github.com/meduzen/datetime-attribute#hours-minutes-separator) to customize the hours-minutes separator of timezone offsets.
- Add a [Precision](https://github.com/meduzen/datetime-attribute/blob/7b80e254c57e0f05dcdf9a452535cb66f70a1c90/types/datetime.d.ts#L30) type for the `precision` parameter of `datetime`, `datetimeTz` and `DateTime.to`, and a subset of this new type for `utc`. It autocompletes the parameter (in modern code editors) with the available keywords.

### Under the hood

- Improve types generation.

## v1.1.0 (2021-11-01)

Compare with [previous](https://github.com/meduzen/datetime-attribute/compare/1.0.0...1.1.0).

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
