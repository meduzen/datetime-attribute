# datetime-attribute

Get a [valid HTML `datetime` attribute](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTimeElement/datetime) for the HTML `<time>` element:

- [`datetime()`](#expressing-moments-with-datetime) for a specific moment;
- [`datetimeDuration()`](#expressing-durations-with-datetimeduration) for a duration;
- [`tzOffset()`](#expressing-timezone-offsets-with-tzOffset) for a timezone offset.

The whole package is [~ 1 KB compressed](https://bundlephobia.com/result?p=datetime-attribute) and tree-shakeable. It aims to be [spec](https://html.spec.whatwg.org/multipage/text-level-semantics.html#attr-time-datetime) complete.

## Installation

`npm install datetime-attribute`

Import the functions you need in your script:

```js
import { datetime, datetimeDuration, tzOffset } from 'datetime-attribute'
```

Not a NPM users? Copy/paste [the code](https://raw.githubusercontent.com/meduzen/datetime-attribute/main/index.js) in your project.

## Expressing moments with `datetime()`

`datetime()` accepts two optional arguments: a [Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date), and a [_precision_ keywords](#available-precision-keywords).

```js
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
output. A lot of other values are accepted, covering most of the spec.

#### Date

|  precision | example output | description
|--|--|--|
| `day` | `2021-03-14` | the default, fitting a calendar |
| `year` | `2021` | only the year |
| `yearless` | `03-14` | a day in a month |
| `month` | `2021-03` | a month in a year |
| `week` | `2021W10` | the week number ([ISO-8601 spec](https://en.wikipedia.org/wiki/ISO_week_date)) and its year |

#### Time and UTC time

|  precision | example output | description
|--|--|--|
| `time` | `10:29` | hours and minutes, like most clock
| `time utc` | `09:29Z` | same as previous, shifted to UTC time
| `second` | `10:29:00` | time with precision up to seconds
| `second utc` | `09:29:00Z` | same as previous, shifted to UTC time
| `ms` | `10:29:00.000` | time with precision up to milliseconds
| `ms utc` | `09:29:00.000Z` | same as previous, shifted to UTC time

💡 Basically, you get UTC time by adding ` utc` behind a time keyword.

#### Datetime and UTC datetime

|  precision | example output | description
|--|--|--|
`datetime` | `2021-03-14T10:29` | a local datetime (= date + time separated by `T`)
`datetime utc` | `2021-03-14T09:29Z` | same as previous, shifted to UTC time
`datetime second` | `2021-03-14T10:29:00` | time with precision up to seconds
`datetime second utc` | `2021-03-14T09:29:00Z` | same as previous, shifted to UTC time
`datetime ms` | `2021-03-14T10:29:00.000` | time with precision up to milliseconds
`datetime ms utc` | `2021-03-14T09:29:00.000Z` | same as previous, shifted to UTC time

💡 Basically, you get UTC datetime by adding ` utc` behind a datetime keyword.

## Expressing durations with `datetimeDuration()`

`datetimeDuration()` requires an object with entries for different levels of durations, from seconds to weeks.

```js
const duration = {
  w: 3,   //     3 weeks
  d: 5,   //     5 days
  h: 10,  //    10 hours
  m: 43,  //    43 minutes
  s: 2.61 // 2.610 seconds
}

datetimeDuration(duration) // 'P3W5DT10H43M2'
```

All object keys are optional:

```js
datetimeDuration({ h: 17 }) // 'PT17H'
```

Values exceeding a unit are not thrown away:

```js
datetimeDuration({ h: 31, m: 63, s: 175 }) // 'P1DT8H5M55S'
```

## Expressing timezone offsets with `tzOffset()`

Timezone offsets are a comparison against [UTC time](https://en.wikipedia.org/wiki/Coordinated_Universal_Time). For example, `+01:00` means “one hour ahead of UTC time” and `-05:00` means “five hours behind UTC time”.

`tzOffset()` accepts two optional arguments for hours and minutes. Without argument, the local timezone offset is returned (and may differ based on daylight saving time).

```js
tzOffset(3)      // '+03:00' (Moscow)

tzOffset(-9, 30) // '-09:30' (Marquesas Islands)
tzOffset(-9.5)   // '-09:30' (same with 1 parameter)

tzOffset(0)      //      'Z' (Ghana; 'Z' is equal to '+00:00')

// when in Belgium
tzOffset()       // '+01:00'
tzOffset()       // '+02:00' (under daylight time saving)
```

Note: values outside the real-life range (`-12:00` to `+14:00`) are currently not adjusted to fit in it. This means `tzOffset(26)` will output `+26:00` instead of `+02:00`.

Curious about timezones? Have a look at [the timezone map](https://fr.m.wikipedia.org/wiki/Fichier:World_Time_Zones_Map.png) and the [daylight time saving chaos](https://en.wikipedia.org/wiki/Daylight_saving_time_by_country).

## Changelog

See [CHANGELOG.md](https://github.com/meduzen/datetime-attribute/blob/main/CHANGELOG.md) or the [releases](https://github.com/meduzen/datetime-attribute/releases).

## Browser and tooling support

`datetime-attribute` is provided for [modern browsers usage](https://github.com/meduzen/datetime-attribute/blob/main/browserslist) with standard JavaScript syntax:
- it is up to you to transpile it for legacy browsers;
- you can’t import it using `require('datetime-attribute')`.

If you’d like one of those features, feel free to open an issue and/or a PR that won’t have any side effects for modern usage.
