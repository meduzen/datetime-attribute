/**
 * Create `datetime="+04:00"` timezone attribute for `<time>`.
 * https://html.spec.whatwg.org/multipage/text-level-semantics.html#attr-time-datetime
 * https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#concept-timezone
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLTimeElement/datetime
 *
 * @param {number} [hours=0] The number of hours from UTC
 * @param {number} [minutes=0] The number of minutes from UTC
 * @param {boolean} [inRealLifeBoundaries=false] Make sure the timezone stays in spec boundaries.
 * @returns {string}
 */
export function tzOffset(hours?: number, minutes?: number, inRealLifeBoundaries?: boolean, ...args: any[]): string;
