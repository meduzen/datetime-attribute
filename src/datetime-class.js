import { MILLISECONDS_PER_WEEK } from './utils/const.js'
import { weekNumber } from './index.js'

export class DateTime extends Date {
  // // Properties used as cache to avoid useless computations.
  // _weekNumber

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
    if (!this._weekNumber) {
      this._weekNumber = weekNumber(this)
    }

    return this._weekNumber
  }

  /**
   * Set the week number.
   *
   * @param {number} weekNumber
   * @returns {number} Milliseconds since midnight on January 1, 1970, UTC
   */
  setWeekNumber(weekNumber) {
    const weeksDiffInMs = (weekNumber - this.getWeekNumber()) * MILLISECONDS_PER_WEEK
    this._weekNumber = weekNumber // update cached property
    return this.setTime(this.getTime() + weeksDiffInMs)
  }
}
