/**
 * @typedef {Object} TimezoneOptions
 *
 * @property {boolean} [inRealWorldRange] Adapt the timezone value to be inside
 *                                        the real-world IANA range. `false`
 *                                         by default.
 *
 * @property {(':'|'')} [separator] The separator between hours and minutes
 *                                  (`'+02:00'`) can be ':' (default) or
 *                                  an empty string.
 */
/** @type TimezoneOptions */
export const tzConfig: TimezoneOptions;
export function setTzConfig(options?: TimezoneOptions): TimezoneOptions;
export function setTzSeparator(separator?: TimezoneOptions['separator']): TimezoneOptions;
export function setTzInRealWorldRange(inRealWorldRange?: TimezoneOptions['inRealWorldRange']): TimezoneOptions;
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
    separator?: (':' | '');
};
