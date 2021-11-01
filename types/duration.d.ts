/**
 * Create `datetime="P3DT2H8M32.541S"` duration attribute for `<time>`.
 * https://html.spec.whatwg.org/multipage/text-level-semantics.html#attr-time-datetime
 * https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#concept-duration
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLTimeElement/datetime
 *
 * See also: https://www.brucelawson.co.uk/2012/best-of-time/
 *
 * @param {DatetimeDuration} duration
 * @param {boolean} convertExcess
 * @returns {string}
 */
export function duration(duration?: DatetimeDuration, convertExcess?: boolean): string;
export type DatetimeDuration = {
    /**
     * – Number of week
     */
    w?: number | undefined;
    /**
     * – Number of day
     */
    d?: number | undefined;
    /**
     * – Number of hours
     */
    h?: number | undefined;
    /**
     * – Number of minutes
     */
    m?: number | undefined;
    /**
     * – Number of seconds
     */
    s?: number | undefined;
};
