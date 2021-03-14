# datetime-attribute

Get a [valid HTML `datetime` attribute](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTimeElement/datetime) for the HTML `<time>` element:

- `datetime` for a specific moment
- `datetimeDuration` for a duration
- **(not available yet)** `datetimeTz` for a timezone offset

## Installation

`npm install datetime-attribute`

In your script:

```js
import { datetime, datetimeDuration } from 'datetime-attribute'
```

This package is provided for modern usage with standard JavaScript syntax: it
is up to you to transpile it for legacy browsers. Also, you can’t import it
using `require('datetime-attribute')`. If it’s something you’d like, feel free
to open an issue and/or a PR that won’t have any side effects.

## Usage

`datetime` accepts a [Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date) as argument, and optionally a [`precision` string](#advanced-usage).

```js
const now = new Date() // We’re 14 March 2021 and it’s 10:29 in Brussels.

const datetimeAttr = datetime(now) // '2021-03-14'

const datetimeAttrWithTime = datetime(now, 'local') // '2021-03-14T:10:29'
```

`datetimeDuration` requires an object with keys for different levels of durations, from seconds to weeks.

```js
const duration = {
  w: 3, // 3 weeks
  d: 5, // 5 days
  h: 10, // 10 hours
  m: 43, // 43 minutes
  s: 2.61 // 2.610 seconds
}

const durationAttr = datetimeDuration(duration) // 'P3W5DT10H43M2'
```

All object keys are optional:

```js
const durationAttrWithHours = datetimeDuration({ h : 17 }) // 'PT17H'
```

Values exceeding a unit are not thrown away:

```js
const durationAttrWithHours = datetimeDuration({ h: 31, m: 63, s: 175 }) // 'P1DT8H5M55S'
```


## Advanced usage

By default, the `datetime` precision is `day`, resulting in a `YYYY-mm-dd`
output. A lot of other values are accepted, covering almost the whole spec.

Others will be added later. Feel free to open issues or pull requests!

```js
const now = new Date() // We’re 14 March 2021 and it’s 10:29 in Brussels.

const datetimeAttr = datetime(now) // '2021-03-14'
const datetimeAttrWithTime = datetime(now, 'local') // '2021-03-14T:10:29'
```

### Date precision

- `datetime(now, 'day')  // '2021-03-14'`: the default one, fitting a calendar
- `datetime(now, 'year') // '2021'`: only the year
- `datetime(now, 'yearless') // '03-14'`: a day in a month
- `datetime(now, 'month') // '2021-03'`: a month in a year
- `datetime(now, 'week') // '2021W10'`: the week number ([ISO-8601 spec](https://en.wikipedia.org/wiki/ISO_week_date)) and its year.

## Time precision

- `datetime(now, 'time') // '10:29'`: hours and minutes, like most clock
- `datetime(now, 'second') // '10:29:00'`: same, with precision up to seconds
- `datetime(now, 'ms') // '10:29:00.000'`: same, with precision up to milliseconds

## Date + time precision

- `datetime(now, 'local') // '2021-03-14T:10:29'`: a local datetime (= date + time)
- `datetime(now, 'local second') '2021-03-14T10:29:00' // `: same, with precision up to seconds
- `datetime(now, 'local ms') // '2021-03-14T10:29:00.000'`: same, with precision up to milliseconds
- `datetime(now, 'global ms') // 2021-03-14T09:29:00.000Z`: in UTC time: the same moment, shifted to the Greenwich timezone (1 hour behind Brussels).
- (later: global time with less precision)

## Changelog

See [releases](https://github.com/meduzen/datetime-attribute/releases).
