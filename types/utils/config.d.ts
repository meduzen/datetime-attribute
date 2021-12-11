/**
 * @typedef {Object} TimezoneOptions
 * @property {(':'|'')=} separator
 */
/**
 * @type TimezoneOptions
 */
export let tzConfig: TimezoneOptions;

/**
 * Set timezone related configuration
 *
 * @param {TimezoneOptions} options
 * @returns {TimezoneOptions}
 */
export function setTzConfig({ separator }: TimezoneOptions): TimezoneOptions;
/**
 * Set timezone separator
 *
 * @param {(':'|'')=} separator
 * @returns {TimezoneOptions}
 */
export function setTzSeparator(separator?: (':' | '') | undefined): TimezoneOptions;
export type TimezoneOptions = {
    separator?: (':' | '') | undefined;
};
