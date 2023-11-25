import { weekNumber } from './utils/date.js'
import { p } from '../utils/string.js'
import { tzOffset } from '../timezone.js'
import { config } from '../config/datetime'
import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill'

Date.prototype.toTemporalInstant = toTemporalInstant

/**
 * Create `datetime="2021-12-02"` attribute for `<time>`.
 *
 * Support all format from the spec.
 * https://html.spec.whatwg.org/multipage/text-level-semantics.html#attr-time-datetime
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLTimeElement/datetime
 *
 * See also: https://www.brucelawson.co.uk/2012/best-of-time/
 *
 * @param {Date=} date
 * @param {Precision=} precision
 * @returns {string}
 */
export function datetime(date = new Date(), precision = 'day') {
  if (!(date instanceof Date)) {
    throw new TypeError('Input date should be of type `Date`')
  }

  const instant = date.toTemporalInstant();
  const zoned = instant.toZonedDateTimeISO(Temporal.Now.timeZoneId())

  const yearISO = y => {

    // Year 0 doesn’t exists in real life, but does in the ISO-8601 spec.
    const sign = y < 0 ? '-' : '' // no sign if year is not negative

    // Remove sign (stored separately, see previous line).
    y = Math.abs(y)

    let bigYearDigits = ''

    // Cut last 4 digits of the year from the others to ease further computation.
    if (y > 9999) {
      [bigYearDigits, y] = (y / 10000).toFixed(4).split('.')
    }

    return sign + bigYearDigits + y.toString().padStart(4, 0)
  }

  // const iso = date.toISOString();

  const temporalFormat = {
    year: () => yearISO(Temporal.PlainYearMonth.from(zoned).year), // 1960
    // year: () => date.getFullYear(), // 1960
    month: () => Temporal.PlainYearMonth.from(zoned), // 1960-04
    day: () => Temporal.PlainDate.from(zoned), // 1960-04-27

    week: () => date.getFullYear() + '-W' + p(weekNumber(date)), // 1960-W17
    yearless: () => Temporal.PlainMonthDay.from(zoned), // 04-27

    time: () => Temporal.PlainTime.from(zoned).toString({ smallestUnit: 'minutes' }), // 00:00
    second: () => Temporal.PlainTime.from(zoned), // 00:00:00
    ms: () => Temporal.PlainTime.from(zoned).toString({ smallestUnit: 'milliseconds' }), // 00:00:00.123

    datetime: () => Temporal.PlainDateTime.from(zoned).toString({ smallestUnit: 'minutes' }), // 1960-04-27T00:00
    'datetime second': () => Temporal.PlainDateTime.from(zoned), // 1960-04-27T00:00:00
    'datetime ms': () => Temporal.PlainDateTime.from(zoned).toString({ smallestUnit: 'milliseconds' }), // 1960-04-27T00:00:00.123

    'datetime utc': () => instant.toString({ smallestUnit: 'minute' }), // 1960-04-26T23:00Z
    'datetime second utc': () => instant, // 1960-04-26T23:00:00Z
    'datetime ms utc': () => instant.toString({ fractionalSecondDigits: 3 }), // 1960-04-26T23:00:00.000Z

    'time utc': () =>
      instant.toString({ smallestUnit: 'minute' }).substr(11, 6), // 23:00Z
    'second utc': () => instant.toString().substr(11, 9), // 23:00:00Z
    'ms utc': () =>
      instant.toString({ fractionalSecondDigits: 3 }).substr(11, 13), // 23:00:00.000Z
  }

  return (temporalFormat[precision] || temporalFormat.day)().toString().replace('T', config.separator)
}

/**
 * Shortcut for `datetime` with UTC output.
 *
 * For exemple, these two are the same:
 * - `datetime(someDate, 'somePrecision utc')`
 * - `utc(someDate, 'somePrecision')`
 *
 *
 * @param {Date=} date
 * @param {'datetime'|'datetime second'|'datetime ms'|'time'|'second'|'ms'} precision
 * @returns {string}
 */
export const utc = (date = new Date(), precision = 'datetime') =>
  datetime(date, `${precision} utc`)

/**
 * Supported precision keywords.
 *
 * @typedef { 'day' | 'year' | 'yearless' | 'month' | 'week' |
 *            'time' | 'second' | 'ms' |
 *            'time utc' | 'second utc' | 'ms utc' |
 *            'datetime' | 'datetime second' | 'datetime ms' |
 *            'datetime utc' | 'datetime second utc' | 'datetime ms utc' } Precision
 */
