import { round } from './utils/math.js'

/**
 * Create `datetime="P3DT2H8M32.541S"` duration attribute for `<time>`.
 * https://html.spec.whatwg.org/multipage/text-level-semantics.html#attr-time-datetime
 * https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#concept-duration
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLTimeElement/datetime
 *
 * See also: https://www.brucelawson.co.uk/2012/best-of-time/
 *
 * @param {DurationObject} [duration={}]
 * @param {boolean} [convertExcess=true]
 * @returns {string}
 */
export function duration(duration = {}, convertExcess = true) {

  // Set default values for missing keys.
  let { w = 0, d = 0, h = 0, m = 0, s = 0 } = duration

  // At least one duration must be different than zero.
  if (![w, d, h, m, s].some(value => value)) {
    return 'PT0S'
  }

  // Convert units in excess (e.g. `{ m: 65 }` becomes `{ h: 1, m: 5 }`).
  if (convertExcess) {

    // Total duration in seconds.
    let time = s
      + 60 * m
      + 60 * 60 * h
      + 60 * 60 * 24 * d
      + 60 * 60 * 24 * 7 * w

    // Reduce remaining time by given cx.
    const divideRemainingTimeBy = cx => time = Math.floor(time / cx)

    s = round(time % 60, 3)
    divideRemainingTimeBy(60)

    m = time % 60
    divideRemainingTimeBy(60)

    h = time % 24
    divideRemainingTimeBy(24)

    d = time % 7
    w = divideRemainingTimeBy(7)
  }

  const getStr = (value, unit) => (value ? `${value}${unit}` : '')

  return 'P' + getStr(w, 'W') + getStr(d, 'D') // weeks and days
    + (h || m || s ? 'T' : '') // separator
    + getStr(h, 'H') + getStr(m, 'M') + getStr(s, 'S') // hours, minutes, seconds

  // // Alternative implementation: 1848 bytes vs 1826 B for the active one.
  // Checked on: https://skalman.github.io/UglifyJS-online/
  /**
   * @todo: measure performances of both implementations
   */

  // /**
  //  * Base durations by unit + total duration. We’ll iterate over those to split
  //  * the total duration at the right time (= turn 71 min. into 1 h 11 min.).
  //  */
  // duration = {
  //   s: 60, // seconds in minute
  //   m: 60, // minutes in hour
  //   h: 24, // hours in day
  //   d: 7, // days in week

  //   w: s + 60 * m // total duration in seconds
  //     + 60 * 60 * h
  //     + 60 * 60 * 24 * d
  //     + 60 * 60 * 24 * 7 * w,
  // }

  // // Reduce total duration and overwrite `duration` keys with computed values.
  // Object.entries(duration).reduce((acc, [key, max]) => {
  //   const res = key != 'w' ? round(acc % max, 3) : acc

  //   // Savagely overwrite “units” with computed value.
  //   duration[key] = res ? `${res}${key.toUpperCase()}` : ''

  //   return Math.floor(acc / max)
  // }, duration.w)

  // return 'P' + duration.w + duration.d
  //   + (duration.h || duration.m || duration.s ? 'T' : '') // separator
  //   + duration.h + duration.m + duration.s
}

/**
 * @typedef {Object} DurationObject
 * @property {number} [w=0] – Number of weeks
 * @property {number} [d=0] – Number of days
 * @property {number} [h=0] – Number of hours
 * @property {number} [m=0] – Number of minutes
 * @property {number} [s=0] – Number of seconds
 */
