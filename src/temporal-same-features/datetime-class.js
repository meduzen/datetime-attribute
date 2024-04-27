import { MILLISECONDS_PER_WEEK } from './utils/const.js'
import { datetime, weekNumber } from './index.js'

export class DateTime extends Date {

  /**
   * Returns the week of the year (`1`–`53`) of the specified date according to
   * local time, as defined by the WHATWG and the ISO-8601 specs:
   *
   * - a week starts on Monday (https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#concept-week);
   * - the first week of the year includes a Thursday;
   * - week numbers go from 1 to 53 (https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#week-number-of-the-last-day).
   *
   * @todo: cache the result of weekNumber as long as date isn’t changed:
   * compare the current object timestamp wuth a stored/cached one in
   * order to decide if the cache is stale.
   *
   * @returns {number}
   */
  getWeek = () => weekNumber(this)

  /**
   * Set the week number.
   *
   * If the week number is outside the year range, the `DateTime` object is
   * updated accordingly.
   *
   * @param {number} weekNumber
   * @returns {number} Milliseconds since midnight on January 1, 1970, UTC
   */
  setWeek(weekNumber) {
    const weeksDiffInMs = (weekNumber - this.getWeek()) * MILLISECONDS_PER_WEEK

    /**
     * Temporal API is less efficient here, it’s probably better with a
     * Temporal object while this class is really `Date` focused as
     * it extends it. Commented code: Temporal implementation.
     */
    // const temporalThis = Temporal.Instant.fromEpochMilliseconds(
    //   this.getTime() + weeksDiffInMs
    // )
    // return this.setTime(temporalThis.epochMilliseconds)

    return this.setTime(this.getTime() + weeksDiffInMs)
  }

  /**
   * Converts a date to a string following the ISO 8601 Extended Format.
   *
   * @param {import('./datetime.js').Precision} precision
   * @returns {string}
   */
  to = precision => datetime(this, precision)
}
