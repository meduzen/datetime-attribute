/**
 * @typedef {Object} TimezoneOptions
 * @property {(':'|'')} separator
 */
/**
 * @type TimezoneOptions
 */
export const tzConfig: TimezoneOptions;
export function setTzConfig(options: TimezoneOptions): TimezoneOptions;
export function setTzSeparator(separator?: (':' | '')): TimezoneOptions;
export type TimezoneOptions = {
    separator: (':' | '');
};
