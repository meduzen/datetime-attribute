/**
 * Create `datetime="2021-12-02"` attribute for `<time>`.
 *
 * Support all format from the spec.
 * https://html.spec.whatwg.org/multipage/text-level-semantics.html#attr-time-datetime
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLTimeElement/datetime
 *
 * See also: https://www.brucelawson.co.uk/2012/best-of-time/
 *
 * @param {Date=} date
 * @param {precisionKeyword=} precision
 * @returns {string}
 */
export function datetime(date?: Date | undefined, precision?: precisionKeyword | undefined): string;
/**
 * Create `datetime="2021-12-02T17:34-06:00"` attribute for `<time>`.
 *
 * @param {Date=} date
 * @param {precisionKeyword=} precision
 * @param {number=} offsetHours
 * @param {number=} offsetMinutes
 * @param {boolean=} inRealLifeBoundaries
 * @returns {string}
 */
export function datetimeTz(date?: Date | undefined, precision?: precisionKeyword | undefined, offsetHours?: number | undefined, offsetMinutes?: number | undefined, inRealLifeBoundaries?: boolean | undefined, ...args: any[]): string;
export function utc(date?: Date | undefined, precision?: precisionKeyword | undefined): string;
/**
 * Supported precision keywords.
 */
export type precisionKeyword = 'day' | 'year' | 'yearless' | 'month' | 'week' | 'time' | 'second' | 'ms' | 'time utc' | 'second utc' | 'ms utc' | 'datetime' | 'datetime second' | 'datetime ms' | 'datetime utc' | 'datetime second utc' | 'datetime ms utc';
