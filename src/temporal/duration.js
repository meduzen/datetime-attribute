/**
 * @todo
 * Continue the work once the following issue is clarified:
 * https://github.com/tc39/proposal-temporal/issues/2711:
 * - check decimal parameters
 * - check balancing (https://tc39.es/proposal-temporal/docs/balancing.html)
 * - add support for sub-second units (ms, mis, ns)
 */

import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill'

// Date.prototype.toTemporalInstant = toTemporalInstant

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

  // Set default values for missing keys.
  let { w = 0, d = 0, h = 0, m = 0, s = 0 } = duration

  // At least one duration must be different than zero.
  // if (![w, d, h, m, s].some(value => value)) {
  //   return 'PT0S'
  // }

  /**
   * @var {import('@js-temporal/polyfill').DurationLike} temporalDuration
   */
  // const temporalDuration = {
  //   ...(w ? { weeks: w } : null),
  //   // ...('w' in duration ? { weeks: duration.w } : null),
  //   ...(d ? { days: d } : null),
  //   // ...('d' in duration ? { days: duration.d } : null),
  //   ...(h ? { hours: h } : null),
  //   // ...('h' in duration ? { hours: duration.h } : null),
  //   ...(m ? { minutes: m } : null),
  //   // ...('m' in duration ? { minutes: duration.m } : null),
  //   ...(s ? { seconds: s } : null),
  //   // ...('s' in duration ? { seconds: duration.s } : null),
  // }

  // let dur = Temporal.Duration.from(temporalDuration)

  /**
   * “non-integer numerical arguments are rounded to the nearest integer, towards zero”
   * https://tc39.es/proposal-temporal/docs/duration.html#new-Temporal-Duration
   */
  // let dur = new Temporal.Duration(0, 0, w, d, h, m, s)
  let dur = new Temporal.Duration(0, 0, Math.floor(w), Math.floor(d), Math.floor(h), Math.floor(m), Math.floor(s))

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
