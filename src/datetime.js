import { weekNumber } from './utils/date.js'
import { p } from './utils/string.js'
import { tzOffset } from './timezone.js'

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
 * @param {string=} precision
 * @returns {string}
 */
export function datetime(date = (new Date()), precision = 'day') {
  if (!(date instanceof Date)) {
    throw new TypeError('Input date should be of type `Date`')
  }

  // Local datetime at milliseconds precision (1960-04-27T00:00:00.123)
  const localMs = date.getFullYear().toString()
    + '-' + p(date.getMonth() + 1) // `+ 1` because 0 is January and 11 is December
    + '-' + p(date.getDate())
    + 'T' + p(date.getHours())
    + ':' + p(date.getMinutes())
    + ':' + p(date.getSeconds())
    + '.' + p(date.getMilliseconds(), 3)

  // Extract substring from local date.
  const local = (start, end) => localMs.substr(start, end)
  const utc = (start, end) => date.toJSON().substr(start, end)

  const formats = {
    'year': () => local(0, 4),          // 1960
    'month': () => local(0, 7),         // 1960-04
    'day': () => local(0, 10),          // 1960-04-27

    'week': () => local(0, 5) + 'W' + p(weekNumber(date)), // 1960-W17
    'yearless': () => local(5, 5),      // 04-27

    'time': () => local(11, 5),         // 00:00
    'second': () => local(11, 8),       // 00:00:00
    'ms': () => local(11, 12),          // 00:00:00.123

    'datetime': () => local(0, 16),        // 1960-04-27T00:00
    'datetime second': () => local(0, 19), // 1960-04-27T00:00:00
    'datetime ms': () => local(0, 23),     // 1960-04-27T00:00:00.123

    'datetime utc': () => utc(0, 16) + 'Z',        // 1960-04-26T23:00Z
    'datetime second utc': () => utc(0, 19) + 'Z', // 1960-04-26T23:00:00Z
    'datetime ms utc': () => date.toJSON(),        // 1960-04-26T23:00:00.000Z

    'time utc': () => utc(11, 5) + 'Z',   // 23:00Z
    'second utc': () => utc(11, 8) + 'Z', // 23:00:00Z
    'ms utc': () => utc(11, 12) + 'Z',    // 23:00:00.000Z
  }

  return (formats[precision] || formats.day)()
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
 * @param {string=} precision
 * @returns {string}
 */
export const utc = (date = (new Date()), precision = 'datetime') => datetime(date, `${precision} utc`)

/**
 * Create `datetime="2021-12-02T17:34-06:00"` attribute for `<time>`.
 *
 * @param {Date=} date
 * @param {string=} precision
 * @param {number=} offsetHours
 * @param {number=} offsetMinutes
 * @param {boolean=} inRealLifeBoundaries
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
