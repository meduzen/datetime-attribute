import {
  MINUTES_PER_DAY,
  REAL_LIFE_LOWER_TIMEZONE,
  REAL_LIFE_UPPER_TIMEZONE,
  LOCAL_TZ_OFFSET,
} from './utils/const.js'

import { p } from './utils/string.js'
import { tzConfig } from './config/tz.js'

import { Temporal, toTemporalInstant } from '@js-temporal/polyfill'

Date.prototype.toTemporalInstant = toTemporalInstant

/**
 * Create `datetime="+04:00"` timezone attribute for `<time>`.
 * https://html.spec.whatwg.org/multipage/text-level-semantics.html#attr-time-datetime
 * https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#concept-timezone
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLTimeElement/datetime
 *
 * @param {number=} hours The number of hours from UTC
 * @param {number=} minutes The number of minutes from UTC
 * @param {boolean=} inRealLifeBoundaries Make sure the timezone stays in spec boundaries.
 * @returns {string}
 */
export function tzOffset(hours = 0, minutes = 0, inRealLifeBoundaries = false) {

  // No arguments received: the local timezone offset is returned.
  if (!('0' in arguments)) {
    return tzOffset(0, LOCAL_TZ_OFFSET)
  }

  if (typeof hours != 'number' || typeof minutes != 'number') {
    throw new TypeError('hours and (optional) minutes must be numbers.')
  }

  // Convert given offset in minutes and ignore the decimal part.
  minutes = Math.trunc(hours * 60 + minutes)

  // Compute minutes to remove in order to suppress the excess of minutes.
  const suppressMinutesExcess = limit => Math.floor(minutes / limit) * MINUTES_PER_DAY

  if (inRealLifeBoundaries) {

    /**
     * Because lower and upper boundaries are not necessarily symetric,
     * suppressing the minutes excess can lead to another excess but
     * on the other side (e.g. by jumping from beyond +14 to -12).
     */

    // Upper boundary
    if (minutes > REAL_LIFE_UPPER_TIMEZONE) {
      minutes -= suppressMinutesExcess(REAL_LIFE_UPPER_TIMEZONE)
      return tzOffset(0, minutes, true)
    }

    // Lower boundary
    if (minutes < REAL_LIFE_LOWER_TIMEZONE) {
      minutes += suppressMinutesExcess(REAL_LIFE_LOWER_TIMEZONE)
      return tzOffset(0, minutes, true)
    }
  }

  if (minutes == 0) { return 'Z' }

  const utcMidnight = Temporal.ZonedDateTime.from({
    timeZone: 'UTC',
    year: 2023,
    month: 11,
    day: 11,
  })

  /**
   * The timezone offset must stay between -23:59 and +23:59:
   * https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#concept-timezone
   * Using `Temporal.ZonedDatetime.add` helps with overflow while `.from`
   * ignores it.
   */
  let zonedTime = utcMidnight.add({ minutes })

  /**
   * Offset sign: `+` (UTC > 0) or `-` (UTC < 0).
   * We don’t have condition when minutes is 0: `'Z'` was returned earlier.
   */
  const sign =
    Temporal.ZonedDateTime.compare(utcMidnight, zonedTime) > 0
      ? '-'
      : '+'

  if (sign == '-') {
    // time goes from -21:00 to 03:00
    zonedTime = zonedTime.subtract({ minutes: minutes * 2 })
  }

  return `${sign}${p(zonedTime.hour)}${tzConfig.separator}${p(zonedTime.minute)}`
}
