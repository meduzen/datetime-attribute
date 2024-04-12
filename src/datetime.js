import { getNormalizeDay, weekNumber } from './utils/date.js'
import { p } from './utils/string.js'
import { tzOffset } from './timezone.js'
import { config } from './config/datetime.js'

/**
 * Create `datetime="2021-12-02"` attribute for `<time>`.
 *
 * Support all format from the spec.
 * https://html.spec.whatwg.org/multipage/text-level-semantics.html#attr-time-datetime
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLTimeElement/datetime
 *
 * See also: https://www.brucelawson.co.uk/2012/best-of-time/
 *
 * @param {Date} [date=new Date()] - default to now
 * @param {Precision} [precision='day']
 * @returns {string}
 */
export function datetime(date = (new Date()), precision = 'day') {
  if (!(date instanceof Date)) {
    throw new TypeError('Input date should be of type `Date`')
  }

  let year = date.getFullYear()

  // Year 0 doesn’t exists in real life, but does in the ISO-8601 spec.
  const sign = year < 0 ? '-' : '' // no sign if year is not negative

  // Remove sign (stored separately, see previous line).
  year = Math.abs(year)

  let bigYearDigits = ''

  // Cut last 4 digits of the year from the others to ease further computation.
  if (year > 9999) {
    [bigYearDigits, year] = (year / 10000).toFixed(4).split('.')
    year = parseInt(year)

    // Set a 4-digits year.
    date.setFullYear(year)
  }

  /**
   * If the week started the previous year (see `weekNumber` documentation) and
   * the requested precision is 'week', we decrement the year by 1.
   */
  if (
    precision == 'week'
    && date.getMonth() == 0 // January
    && date.getDate() < 4 // month date: 1, 2 or 3
    && (getNormalizeDay(date)) > 4 // Fri., Sat. or Sun. (normalized as Sun. == 0)
  ) {
    year--
  }

  // Local datetime at milliseconds precision (1960-04-27T00:00:00.123)
  const localMs = p(year.toString(), 4) // zero-pad years, as per spec
    + '-' + p(date.getMonth() + 1) // `+ 1` because 0 is January and 11 is December
    + '-' + p(date.getDate())
    + 'T' + p(date.getHours())
    + ':' + p(date.getMinutes())
    + ':' + p(date.getSeconds())
    + '.' + p(date.getMilliseconds(), 3)

  const withSignAndYearDigits = shouldAdd => shouldAdd ? sign + bigYearDigits : ''

  /**
   * Extract substring from local date. When `start` is 0, the year is wanted:
   * its sign and missing digits (for years with 5+ digits) are prepended.
   */

  const local = (start, length) => withSignAndYearDigits(!start) + localMs.substr(start, length)
  const utc = (start, length) => withSignAndYearDigits(!start) + date.toJSON().substr(start, length) + 'Z'

  const formats = {
    'year': () => local(0, 4),   // 1960
    'month': () => local(0, 7),  // 1960-04
    'day': () => local(0, 10),   // 1960-04-27

    'week': () => local(0, 5) + 'W' + p(weekNumber(date)), // 1960-W17
    'yearless': () => local(5, 5), // 04-27

    'time': () => local(11, 5),   // 00:00
    'second': () => local(11, 8), // 00:00:00
    'ms': () => local(11, 12),    // 00:00:00.123

    'datetime': () => local(0, 16),          // 1960-04-27T00:00
    'datetime second': () => local(0, 19),   // 1960-04-27T00:00:00
    'datetime ms': () => local(0, 23),       // 1960-04-27T00:00:00.123

    'datetime utc': () => utc(0, 16),        // 1960-04-26T23:00Z
    'datetime second utc': () => utc(0, 19), // 1960-04-26T23:00:00Z
    'datetime ms utc': () => sign + bigYearDigits + date.toJSON(),  // 1960-04-26T23:00:00.000Z

    'time utc': () => utc(11, 5),   // 23:00Z
    'second utc': () => utc(11, 8), // 23:00:00Z
    'ms utc': () => utc(11, 12),    // 23:00:00.000Z
  }

  return (formats[precision] || formats.day)().replace('T', config.separator)
}

/**
 * Shortcut for `datetime` with UTC output.
 *
 * For exemple, these two are the same:
 * - `datetime(someDate, 'somePrecision utc')`
 * - `utc(someDate, 'somePrecision')`
 *
 *
 * @param {Date} [date=new Date()] - default to now
 * @param {'datetime'|'datetime second'|'datetime ms'|'time'|'second'|'ms'} [precision=datetime]
 * @returns {string}
 */
export const utc = (date = (new Date()), precision = 'datetime') => datetime(date, `${precision} utc`)

/**
 * Create `datetime="2021-12-02T17:34-06:00"` attribute for `<time>`.
 *
 * @param {Date} [date=new Date()] - default to now
 * @param {Precision} [precision=datetime]
 * @param {number} [offsetHours=0]
 * @param {number} [offsetMinutes=0]
 * @param {boolean} [inRealLifeBoundaries=false]
 * @returns {string}
 */
export function datetimeTz(
  date = new Date(),
  precision = 'datetime',
  offsetHours = 0,
  offsetMinutes = 0,
  inRealLifeBoundaries = false,
) {
  let timezoneOffset = ''

  if (!precision.includes('utc')) { // ignore request for UTC conversion
    timezoneOffset = ('2' in arguments) // see similar line in tzOffset()
      ? tzOffset(offsetHours, offsetMinutes, inRealLifeBoundaries)
      : tzOffset()
  }

  return datetime(date, precision) + timezoneOffset
}

/**
 * Supported precision keywords.
 *
 * @typedef { 'day' | 'year' | 'yearless' | 'month' | 'week' |
 *            'time' | 'second' | 'ms' |
 *            'time utc' | 'second utc' | 'ms utc' |
 *            'datetime' | 'datetime second' | 'datetime ms' |
 *            'datetime utc' | 'datetime second utc' | 'datetime ms utc' } Precision
 */
