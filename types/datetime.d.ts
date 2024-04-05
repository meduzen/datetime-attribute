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
 * @param {boolean} [inRealLifeBoundaries=false]
 * @returns {string}
 */
export function datetimeTz(date?: Date, precision?: Precision, offsetHours?: number, offsetMinutes?: number, inRealLifeBoundaries?: boolean, ...args: any[]): string;
export function utc(date?: Date, precision?: 'datetime' | 'datetime second' | 'datetime ms' | 'time' | 'second' | 'ms'): string;
/**
 * Supported precision keywords.
 */
export type Precision = 'day' | 'year' | 'yearless' | 'month' | 'week' | 'time' | 'second' | 'ms' | 'time utc' | 'second utc' | 'ms utc' | 'datetime' | 'datetime second' | 'datetime ms' | 'datetime utc' | 'datetime second utc' | 'datetime ms utc';
