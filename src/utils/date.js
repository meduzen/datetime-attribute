import { MILLISECONDS_PER_DAY } from './const.js'

/**
 * Calculate the difference between 2 dates in days, discarding the time of day.
 *
 * @param {Date} date The oldest of the two dates.
 * @param {Date} furtherDate Another date, greater than the first one.
 * @returns {number}
 */
export function daysBetween(date, furtherDate) {

  // discard time of day
  [date, furtherDate] = [date, furtherDate].map(d => new Date(d.getFullYear(), d.getMonth(), d.getDate()))

  /**
   * The commented code below could be accurate if we cared about time of day.
   */
  // return Math.ceil((furtherDate - date) / MILLISECONDS_PER_DAY)

  return (furtherDate - date) / MILLISECONDS_PER_DAY
}

/**
 * Get the week number (`1`–`53`) of a date according to local time, as defined
 * by the WHATWG and the ISO-8601 specs:
 *
 * - a week starts on Monday (https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#concept-week);
 * - the first week of the year includes a Thursday;
 * - week numbers go from 1 to 53 (https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#week-number-of-the-last-day).
 *
 * @param {Date} date
 * @returns {number}
 */
export function weekNumber(date) {
  const dayIndex = date.getDay() || 7 // normalize index because Sunday == 0

  const sameWeekThursday = new Date(date)
  sameWeekThursday.setDate(date.getDate() + 4 - dayIndex)

  const january1st = new Date(sameWeekThursday.getFullYear(), 0, 1)
  const daysDifference = daysBetween(january1st, sameWeekThursday)

  return Math.ceil(daysDifference / 7)
}
