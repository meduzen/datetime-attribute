/**
 * Create `datetime="P3DT2H8M32.541S"` duration attribute for `<time>`.
 * https://html.spec.whatwg.org/multipage/text-level-semantics.html#attr-time-datetime
 * https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#concept-duration
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLTimeElement/datetime
 *
 * See also: https://www.brucelawson.co.uk/2012/best-of-time/
 *
 * @param {DurationObject} [duration={}]
 * @param {boolean} [convertExcess=true] Convert overflow values to their
 *                                       higher unit (e.g. `{ m: 90 }`
 *                                       equals `{ h: 1, m: 30 }`.
 * @returns {string}
 */
export function duration(duration?: DurationObject, convertExcess?: boolean): string;
export type DurationObject = {
	/**
	 * – Number of weeks
	 */
	w?: number;
	/**
	 * – Number of days
	 */
	d?: number;
	/**
	 * – Number of hours
	 */
	h?: number;
	/**
	 * – Number of minutes
	 */
	m?: number;
	/**
	 * – Number of seconds
	 */
	s?: number;
};
export function setTzConfig(options?: TimezoneOptions): TimezoneOptions;
export function setTzSeparator(separator?: TimezoneOptions["separator"]): TimezoneOptions;
export function setTzInRealWorldRange(inRealWorldRange?: TimezoneOptions["inRealWorldRange"]): TimezoneOptions;
export type TimezoneOptions = {
	/**
	 * Adapt the timezone value to be inside
	 *  the real-world IANA range. `false`
	 *   by default.
	 */
	inRealWorldRange?: boolean;
	/**
	 * The separator between hours and minutes
	 *  (`'+02:00'`) can be ':' (default) or
	 *  an empty string.
	 */
	separator?: (":" | "");
};
/**
 * Create `datetime="+04:00"` timezone attribute for `<time>`.
 * https://html.spec.whatwg.org/multipage/text-level-semantics.html#attr-time-datetime
 * https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#concept-timezone
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLTimeElement/datetime
 *
 * @param {number} [hours=0] The number of hours from UTC
 * @param {number} [minutes=0] The number of minutes from UTC
 * @param {import('./config/tz.js').TimezoneOptions['inRealWorldRange']} [inRealWorldRange=false] Make sure the timezone stays in spec boundaries.
 * @returns {string}
 */
export function tzOffset(hours?: number, minutes?: number, inRealWorldRange?: TimezoneOptions["inRealWorldRange"], ...args: any[]): string;
/**
 * Create `datetime="2021-12-02"` attribute for `<time>`.
 *
 * Support all format from the spec.
 * https://html.spec.whatwg.org/multipage/text-level-semantics.html#attr-time-datetime
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLTimeElement/datetime
 *
 * See also: https://www.brucelawson.co.uk/2012/best-of-time/
 *
 * @param {Date} [date=new Date()] - default to now
 * @param {Precision} [precision='day']
 * @returns {string}
 */
export function datetime(date?: Date, precision?: Precision): string;
/**
 * Create `datetime="2021-12-02T17:34-06:00"` attribute for `<time>`.
 *
 * @param {Date} [date=new Date()] - default to now
 * @param {Precision} [precision=datetime]
 * @param {number} [offsetHours=0]
 * @param {number} [offsetMinutes=0]
 * @param {import('./config/tz.js').TimezoneOptions['inRealWorldRange']} [inRealWorldRange=false]
 * @returns {string}
 */
export function datetimeTz(date?: Date, precision?: Precision, offsetHours?: number, offsetMinutes?: number, inRealWorldRange?: TimezoneOptions["inRealWorldRange"], ...args: any[]): string;
export function utc(date?: Date, precision?: "datetime" | "datetime second" | "datetime ms" | "time" | "second" | "ms"): string;
/**
 * Supported precision keywords.
 */
export type Precision = "day" | "year" | "yearless" | "month" | "week" | "time" | "second" | "ms" | "time utc" | "second utc" | "ms utc" | "datetime" | "datetime second" | "datetime ms" | "datetime utc" | "datetime second utc" | "datetime ms utc";
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
	getWeek: () => number;
	/**
	 * Set the week number.
	 *
	 * If the week number is outside the year range, the `DateTime` object is
	 * updated accordingly.
	 *
	 * @param {number} weekNumber
	 * @returns {number} Milliseconds since midnight on January 1, 1970, UTC
	 */
	setWeek(weekNumber: number): number;
	/**
	 * Converts a date to a string following the ISO 8601 Extended Format.
	 *
	 * @param {import('./datetime.js').Precision} precision
	 * @returns {string}
	 */
	to: (precision: Precision) => string;
}
export function setTimeSeparator(separator?: DateTimeOptions["separator"]): DateTimeOptions;
export type DateTimeOptions = {
	/**
	 * The separator between date and time
	 * (`'2024-04-21T10:34'`) can be a
	 * 'T' (default) or a space.
	 */
	separator: ("T" | " ");
};
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
export function daysBetween(date: Date, furtherDate: Date): number;
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
export function weekNumber(date: Date): number;

export {};
