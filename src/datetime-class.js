import { MILLISECONDS_PER_WEEK } from './utils/const.js'
import { weekNumber } from './index.js'

export class DateTime extends Date {

  /**
   * Returns the week of the year (`1`–`53`) of the specified date according to
   * local time, as defined by the WHATWG and the ISO-8601 specs:
   *
   * - a week starts on Monday (https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#concept-week);
   * - the first week of the year includes a Thursday;
   * - week numbers go from 1 to 53 (https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#week-number-of-the-last-day).
   *
   * @returns {number}
   */
  getWeekNumber() {
    return weekNumber(this)
  }

  /**
   * Set the week number.
   *
   * @param {number} weekNumber
   * @returns {number} Milliseconds since midnight on January 1, 1970, UTC
   */
  setWeekNumber(weekNumber) {
    const weeksDiffInMs = (weekNumber - this.getWeekNumber()) * MILLISECONDS_PER_WEEK
    return this.setTime(this.getTime() + weeksDiffInMs)
  }
}
