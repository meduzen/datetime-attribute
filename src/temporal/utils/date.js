/**
 * @todo
 * - weekNumber could accept more Temporal type, maybe
 * - make sur to understand zone datetime (https://tc39.es/proposal-temporal/docs/zoneddatetime.html#weekOfYear)
 */

import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill'
Date.prototype.toTemporalInstant = toTemporalInstant

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
export const weekNumber = date => date.toTemporalInstant().toZonedDateTimeISO('UTC').weekOfYear
