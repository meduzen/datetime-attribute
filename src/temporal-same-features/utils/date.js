/**
 * @todo
 * - `weekNumber` and `daysBetween` could accept Temporal objects as parameters
 * - make sur to understand zoned datetime (https://tc39.es/proposal-temporal/docs/zoneddatetime.html#weekOfYear)
 */

import { dateToPlainDate } from './temporal.js'

/**
 * Calculate the difference between 2 dates in days, discarding the time of day.
 *
 * @todo Consider renaming it daysDiff when there’s a breaking change, since it
 * can returns a negative number when date > furtherDate.
 *
 * @param {Date} date The oldest of the two dates.
 * @param {Date} furtherDate Another date, greater than the first one.
 * @returns {number}
 */
export const daysBetween = (date, furtherDate) => dateToPlainDate(date).until(dateToPlainDate(furtherDate)).days

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
export const weekNumber = date => dateToPlainDate(date).weekOfYear
// export const weekNumber = date => date.toTemporalInstant().toZonedDateTimeISO('UTC').weekOfYear

/**
 * Get the day index of the week, Monday is 1 and Sunday is 7.
 *
 * @param {Date} date
 * @returns {number}
 */
export const getTemporalDay = date => dateToPlainDate(date).dayOfWeek
