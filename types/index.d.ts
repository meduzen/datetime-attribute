/**
 * Create `datetime="2021-12-02"` attribute for `<time>`.
 *
 * Support all format from the spec.
 * https://html.spec.whatwg.org/multipage/text-level-semantics.html#attr-time-datetime
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLTimeElement/datetime
 *
 * See also: https://www.brucelawson.co.uk/2012/best-of-time/
 */
export declare function datetime(date?: Date, precision?: string): string;

/**
 * Shortcut for `datetime` with UTC output.
 *
 * For exemple, these two are the same:
 * - `datetime(someDate, 'somePrecision utc')`
 * - `utc(someDate, 'somePrecision')`
 */
 export declare function utc(date?: Date, precision?: string): string;

/**
 * Create `datetime="2021-12-02T17:34-06:00"` attribute for `<time>`.
 */
export declare function datetimeTz(
  date?: Date,
  precision?: string,
  offsetHours?: number,
  offsetMinutes?: number,
  inRealLifeBoundaries?: boolean
): string;

/**
 * Create `datetime="+04:00"` timezone attribute for `<time>`.
 * https://html.spec.whatwg.org/multipage/text-level-semantics.html#attr-time-datetime
 * https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#concept-timezone
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLTimeElement/datetime
 */
export declare function tzOffset(
  hours?: number,
  minutes?: number,
  inRealLifeBoundaries?: boolean
): string;

/**
 * Create `datetime="P3DT2H8M32.541S"` duration attribute for `<time>`.
 * https://html.spec.whatwg.org/multipage/text-level-semantics.html#attr-time-datetime
 * https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#concept-duration
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLTimeElement/datetime
 *
 * See also: https://www.brucelawson.co.uk/2012/best-of-time/
 */
export declare function duration(duration?: DurationObject, convertExcess?: boolean): string;

/**
 * Weeks, days, hours, minutes, seconds. All optional.
 */
export type DurationObject = {
  w?: number,
  d?: number,
  h?: number,
  m?: number,
  s?: number,
}

/**
 * Calculate the difference between 2 dates in days, discarding the time of day.
 */
export declare function daysBetween(date: Date, furtherDate: Date): number;

/**
 * Get the week number as defined by the WHATWG and the ISO-8601 specs:
 *
 * - a week starts on Monday (https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#concept-week);
 * - the first week of the year includes a Thursday;
 * - week numbers go from 1 to 53 (https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#week-number-of-the-last-day).
 *
 * @param {Date} date
 */
export declare function weekNumber(date: Date): number;

export declare class DateTime extends Date {
  getWeekNumber(): number;
  setWeekNumber(weekNumber: number): number;
  to(precision?: string): string;
}
