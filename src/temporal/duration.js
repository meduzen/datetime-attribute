/**
 * @todo
 * - check balancing (https://tc39.es/proposal-temporal/docs/balancing.html)
 * - add support for sub-second units (ms, mis, ns)
 */

import { Temporal } from '@js-temporal/polyfill'
// import { Temporal } from 'temporal-polyfill'
import { round } from './utils/math.js'

/**
 * Create `datetime="P3DT2H8M32.541S"` duration attribute for `<time>`.
 * https://html.spec.whatwg.org/multipage/text-level-semantics.html#attr-time-datetime
 * https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#concept-duration
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLTimeElement/datetime
 *
 * See also: https://www.brucelawson.co.uk/2012/best-of-time/
 *
 * @param {DurationObject} duration
 * @param {boolean} convertExcess
 * @returns {string}
 */
export function duration(duration = {}, convertExcess = true) {

  if (!duration) {
    throw new Error('No duration provided.')
  }

  // Set default values for missing keys.

  duration = Object.assign({ w: 0, d: 0, h: 0, m: 0, s: 0, ms: 0 }, duration)

  /**
   * At least one duration must be different than zero.
   * Not needed with the Temporal API, only here for
   * early return.
   */
  if (!Object.values(duration).some(value => value)) {
    return 'PT0S'
  }

  // Transfer decimals as they aren’t accepted by `Temporal.Duration` constructor.

  const processDecimals = (unit, smallerUnit, howManySmallInUnit) => {
    if (!Number.isInteger(duration[unit])) {
      duration[smallerUnit] += duration[unit] / howManySmallInUnit
      duration[unit] = Math.floor(duration[unit])
    }
  }

  processDecimals('w', 'd', 7)
  processDecimals('d', 'h', 24)
  processDecimals('h', 'm', 60)
  processDecimals('m', 's', 60)
  processDecimals('s', 'ms', 1) // last item of the chain (`ms`) is a special use case, we process it in the next line
  duration.ms = round((duration.ms - duration.s) * 1000) //

  let { w = 0, d = 0, h = 0, m = 0, s = 0, ms = 0 } = duration

  // Create a Duration object

  let dur = new Temporal.Duration(0, 0, w, d, h, m, s, ms)

  if (convertExcess) {
    dur = dur.round({ largestUnit: 'weeks', relativeTo: '2019-01-01' })
  }

  return dur.toString()
}

/**
 * @typedef {Object} DurationObject
 *
 * @property {number=} y – Number of years
 * @property {number=} mo – Number of months
 * @property {number=} w – Number of weeks
 * @property {number=} d – Number of days
 * @property {number=} h – Number of hours
 * @property {number=} m – Number of minutes
 * @property {number=} s – Number of seconds
 * @property {number=} ms – Number of milliseconds
 * @property {number=} mis – Number of microseconds
 * @property {number=} ns – Number of nanoseconds
*
 * The chosen propertie abbreviations follow the spec algorithm:
 * https://tc39.es/proposal-temporal/#sec-temporal.duration
 */
