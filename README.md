# datetime-attribute

Get a [valid `datetime` attribute](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTimeElement/datetime) for HTML `<time>` (among [others](#not-only-in-time)).

Lightweight ([~ 1 KB compressed](https://bundlephobia.com/result?p=datetime-attribute) and tree-shakeable), datetime-attribute covers the [whole `datetime` specification](https://html.spec.whatwg.org/multipage/text-level-semantics.html#attr-time-datetime) in 4 functions:
- [**`datetime()`**](#expressing-moments-with-datetime) for a specific moment;
- [**`datetimeTz()`**](#adding-a-timezone-offset-to-a-moment-with-datetimetz) for a specific moment in a given timezone;
- [**`duration()`**](#expressing-durations-with-duration) for a duration;
- [**`tzOffset()`**](#expressing-timezone-offsets-with-tzoffset) for a timezone offset.

[![Node.js CI](https://github.com/meduzen/datetime-attribute/actions/workflows/node.js.yml/badge.svg)](https://github.com/meduzen/datetime-attribute/actions/workflows/node.js.yml)

## Table of contents

- [Summary usage](#summary-usage)
- [Installation](#installation)
- Usage
  - [**`datetime()`**](#expressing-moments-with-datetime) to express a **moment** at different [levels of precision](#available-precision-keywords):
	- [date](#date)
	- [time and UTC time](#time-and-utc-time)
	- [datetime and UTC datetime](#datetime-and-utc-datetime)
	- alternative to the UTC syntax with [`utc()`](#the-utc-shortcut)
  - [**`tzOffset()`**](#expressing-timezone-offsets-with-tzoffset) to express a **timezone offset**
  - [**`datetimeTz()`**](#adding-a-timezone-offset-to-a-moment-with-datetimetz) to express a **moment with a specific timezone** offset
  - [**`duration()`**](#expressing-durations-with-duration) to expressing a **duration**
- Various:
  - [Changelog](#changelog)
  - [Browser and tooling support](#browser-and-tooling-support)
  - [Not only in `<time>`](#not-only-in-time)
  - [License](#license)

## Summary usage

```js
import { datetime, datetimeTz, duration, tzOffset } from 'datetime-attribute'

const now = new Date()

datetime(now)                   // '2021-03-14'
datetime(now, 'time')           // '10:29'
datetimeTz(now, 'datetime', -7) // '2021-03-14T10:29-07:00'
utc(now, 'time')                // '09:29Z'

tzOffset(-9, 30) // '-09:30' (Marquesas Islands)
duration({ d: 4, h: 3, m: 17 }) // 'P4DT3H17M'

```

## Installation

`npm install datetime-attribute`

Import the functions you need in your script:

```js
// if you only need `datetime`
import { datetime } from 'datetime-attribute'

// if you need all functions
import { datetime, datetimeTz, duration, tzOffset } from 'datetime-attribute'
```

Not a NPM users? Copy/paste [the code](https://raw.githubusercontent.com/meduzen/datetime-attribute/main/index.js) in your project.

## Expressing moments with `datetime()`

`datetime()` accepts two optional arguments: a [Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date), and a [_precision_ keywords](#available-precision-keywords).

```js
import { datetime } from 'datetime-attribute'

const now = new Date() // We’re 14 March 2021 and it’s 10:29 in Brussels.

datetime(now)          // '2021-03-14'
datetime(now, 'local') // '2021-03-14T10:29'
```

Without argument, it defaults to _today_:
```js
datetime() // today formatted in YYYY-mm-dd
datetime((new Date()), 'day') // same
```

### Available precision keywords

By default, `datetime()` precision is `day`, resulting in a `YYYY-mm-dd`
output. Many other values are available.

#### Date

|  precision | example output | description
|--|--|--|
| `day` | `2021-03-14` | the default, fitting a calendar |
| `year` | `2021` | only the year |
| `yearless` | `03-14` | a day in a month |
| `month` | `2021-03` | a month in a year |
| `week` | `2021W10` | the week number ([ISO-8601 spec](https://en.wikipedia.org/wiki/ISO_week_date)) and its year |

#### Time and UTC time

Time:

|  precision | example output | description
|--|--|--|
| `time` | `10:29` | hours and minutes, like most clocks
| `second` | `10:29:00` | time with precision up to seconds
| `ms` | `10:29:00.000` | time with precision up to milliseconds

To get UTC time, add ` utc` to the time keyword:

|  precision | example output | description
|--|--|--|
| `time utc` | `09:29Z` | `time`, shifted to UTC time
| `second utc` | `09:29:00Z` | `second`, shifted to UTC time
| `ms utc` | `09:29:00.000Z` | `ms`, shifted to UTC time

#### Datetime and UTC datetime

Datetime:

|  precision | example output | description
|--|--|--|
`datetime` | `2021-03-14T10:29` | a local datetime (= date + time separated by `T`)
`datetime second` | `2021-03-14T10:29:00` | time with precision up to seconds
`datetime ms` | `2021-03-14T10:29:00.000` | time with precision up to milliseconds

To get UTC datetime, add ` utc` to the datetime keyword:

|  precision | example output | description
|--|--|--|
`datetime utc` | `2021-03-14T09:29Z` | `datetime`, shifted to UTC time
`datetime second utc` | `2021-03-14T09:29:00Z` | `datetime second`, shifted to UTC time
`datetime ms utc` | `2021-03-14T09:29:00.000Z` | `datetime ms`, shifted to UTC time

#### The `utc` shortcut

💡 Instead of adding ` utc` to a [time](#time-and-utc-time) or [datetime](#datetime-and-utc-datetime) keyword, you can use `utc(date, precision)`, which has `datetime` as default precision:

```js
import { datetime, utc } from 'datetime-attribute'

const now =  new  Date()  // We’re 14 March 2021 and it’s 10:29 in Brussels.

// These are the same:
utc(now, 'time') // `09:29Z`
datetime(now, 'time utc') // `09:29Z`

// These are the same:
utc(now)             // `2021-03-14T09:29Z`
utc(now, 'datetime') // `2021-03-14T09:29Z`
datetime(now, 'datetime utc') // `2021-03-14T09:29Z`
```

## Expressing timezone offsets with `tzOffset()`

Timezone offsets are a comparison against [UTC time](https://en.wikipedia.org/wiki/Coordinated_Universal_Time). For example, `+01:00` means “one hour ahead of UTC time” and `-05:00` means “five hours behind UTC time”.

`tzOffset()` accepts three optional arguments for hours, minutes, and [compliance to real-life boundaries](#real-life-timezone-offset). Without argument, the local timezone offset is returned (and may differ based on daylight saving time).

```js
import { tzOffset } from 'datetime-attribute'

tzOffset(3)      // '+03:00' (Moscow)

tzOffset(-9, 30) // '-09:30' (Marquesas Islands)
tzOffset(-9.5)   // '-09:30' (same with 1 parameter)

tzOffset(0)      //      'Z' (Ghana; 'Z' is equal to '+00:00')

// in Belgium
tzOffset()       // '+01:00'
tzOffset()       // '+02:00' (under daylight time saving)
```

### Real-life timezone offset

The timezone offset will be adjusted to fit in the spec range (from `-23:59` to `+23:59`). This means `tzOffset(44)` will output `+20:00` instead of `+44:00`.

However, timezone offsets of countries in the world are all between `-12:00` and `+14:00`. If you want `tzOffset(44)` to output `-04:00` so that it matches real-life boundaries, give it a third parameter (default: `false`):

```js
tzOffset(44) // '+20:00'
tzOffset(44, 0, true) // '-04:00'
```

Curious about timezones? Have a look at [the timezone map](https://fr.m.wikipedia.org/wiki/Fichier:World_Time_Zones_Map.png) and the [daylight time saving chaos](https://en.wikipedia.org/wiki/Daylight_saving_time_by_country).

## Adding a timezone offset to a moment with `datetimeTz()`

As `datetime()` doesn’t care about timezones, you can use `datetimeTz()` when you need to be explicit about the timezone of a moment.

💡 `datetimeTz()` is basically a concatenation of [`datetime(date, precision)`](#expressing-moments-with-datetime) and [`tzOffset(hours, minutes)`](#expressing-timezone-offsets-with-tzoffset), so be sure to read about them.

It accepts the same 5 parameters, all optional:

```js
datetimeTz(date, precision, offsetHours, offsetMinutes, inRealLifeBoundaries)
```

1. A date object (default: `new Date()`)
2. A [precision keywords](#available-precision-keywords) among:
	- `time`
	- `second`
	- `ms`
	- `datetime` (default)
	- `datetime second`
	- `datetime ms`
3. Hours offset like in [`tzOffset()`](#expressing-timezone-offsets-with-tzoffset)
4. Minutes offset like in [`tzOffset()`](#expressing-timezone-offsets-with-tzoffset)
5. Boundaries of the timezone offset like in [`tzOffset()`](#real-life-timezone-offset)

When hours and minutes are not specified, the local timezone offset is used.

```js
import { datetime, datetimeTz } from 'datetime-attribute'

const now = new Date() // We’re 2 April 2021 and it’s 23:51 in Brussels.

datetime(now) 	// '2021-04-02'
datetimeTz(now) // '2021-04-02T23:51+02:00'

datetime(now, 'time')           // '23:51'
datetime(now, 'time utc')       // '21:51Z' (same as previous, converted to UTC)
datetimeTz(now, 'time', 0)      // '23:51Z' (datetimeTz does not convert)
datetimeTz(now, 'time')         // '23:51+02:00' (fall back on local timezone)
datetimeTz(now, 'time', 9) 	    // '23:51+09:00'
datetimeTz(now, 'time', -3, 30) // '23:51-03:30'
datetimeTz(now, 'time', -14, 0, true) // '23:51+10:00'
```

`datetimeTz()` **does not convert** your moment to another timezone: it **only adds the wanted timezone** to the moment. Its purpose is to generate a valid `datetime` attribute saying “here’s a moment, it has this [hours, minutes] timezone offset”.

Let’s take this sentence and its  HTML:

> When I’m in Brussels, I wake up at 8 o’clock every day.

```html
<p>When I’m in Brussels, I wake up <time datetime="08:00+02:00">at 8 o’clock</time> every day.</p>
```

Here’s how you can get the `datetime` attribute fitting this sentence:

```js
// const awakeningAt = new Date(…) // a Date object with 08:00 as time

datetimeTz(awakeningAt, 'time', 2) // '08:00+02:00'
```

## Expressing durations with `duration()`

`duration()` requires an object with entries for different levels of durations, from seconds to weeks. It also accepts a second parameter to control the [conversion of units overflow](#units-overflow) (default: `true`).

```js
import { duration } from 'datetime-attribute'

const duration = {
  w: 3,   //     3 weeks
  d: 5,   //     5 days
  h: 10,  //    10 hours
  m: 43,  //    43 minutes
  s: 2.61 // 2.610 seconds
}

duration(duration) // 'P3W5DT10H43M2'
```

All object keys are optional:

```js
duration({ h: 17 }) // 'PT17H'
```

### Units overflow

Values exceeding a unit are converted to upper units:

```js
duration({ h: 31, m: 63, s: 175 }) // 'P1DT8H5M55S'
```

If you don’t need this behaviour, pass `false` as second parameter (default valut: `true`).
```js
duration({ m: 175 }) // 'PT2H55M'
duration({ m: 175 }, false) // 'PT175M'
```

## Changelog

See [CHANGELOG.md](https://github.com/meduzen/datetime-attribute/blob/main/CHANGELOG.md) or the [releases](https://github.com/meduzen/datetime-attribute/releases).

## Browser and tooling support

`datetime-attribute` is provided for [modern browsers usage](https://github.com/meduzen/datetime-attribute/blob/main/browserslist) with standard JavaScript syntax:
- it is up to you to transpile it for legacy browsers;
- you can’t import it using `require('datetime-attribute')`.

If you’d like one of those features, feel free to open an issue and/or a PR that won’t have any side effects for modern usage. [Read more about ESModules](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

## Not only in `<time>`

[`<time>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time) is not alone! Other elements can benefit from `datetime-attribute`:
- `<input>` of the following types: [`date`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date), [`datetime-local`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local), [`month`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/month), [`week`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/week), [`time`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time): check their `min`, `max`, `value`, `datalist` attributes.
-  [`<del>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/del#attributes) and [`<ins>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ins#attributes) accept a `datetime` attribute.
- Microdata types: [DateTime](https://schema.org/DateTime) and [Time](https://schema.org/Time) properties.
- Open Graph [dates properties](https://ogp.me/#datetime): `release_date`, `published_time`, `modified_time` and `expiration_time`.
- The browser [WebExtensions history search API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/history/search).

## License

The _datetime-attribute_ package is open-sourced software licensed under the [DWTFYWTPL](https://github.com/meduzen/datetime-attribute/blob/main/LICENSE).
