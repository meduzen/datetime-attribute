import {
  MINUTES_PER_DAY,
  REAL_LIFE_LOWER_TIMEZONE,
  REAL_LIFE_UPPER_TIMEZONE,
  LOCAL_TZ_OFFSET,
} from './utils/const'

import { p } from './utils/string'

/**
 * Create `datetime="+04:00"` timezone attribute for `<time>`.
 * https://html.spec.whatwg.org/multipage/text-level-semantics.html#attr-time-datetime
 * https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#concept-timezone
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLTimeElement/datetime
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
     * suppressing the minutes excess can lead to another excess, but
     * on the other side (e.g. going from beyond +14 to below -12).
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

  // Offset sign: `+` (UTC ≥ 0) or `-` (UTC < 0).
  const sign = minutes > 0 ? '+' : '-'

  // Remove sign (stored separately, see previous line).
  minutes = Math.abs(minutes)

  /**
   * The timezone offset must stay between -23:59 and +23:59:
   * https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#concept-timezone
   */
  if (minutes >= MINUTES_PER_DAY) {
    minutes -= suppressMinutesExcess(MINUTES_PER_DAY)
  }

  // Get hours and minutes.
  hours = Math.trunc(minutes / 60)
  minutes = minutes % 60

  if (hours == 0 && minutes == 0) { return 'Z' }

  return sign + p(hours) + ':' + p(minutes)
}
