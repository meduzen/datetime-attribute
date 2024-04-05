/**
 * @typedef {Object} DateTimeOptions
 * @property {('T'|' ')} separator
 */
/**
 * @type DateTimeOptions
 */
export const config: DateTimeOptions;
export function setConfig(options: DateTimeOptions): DateTimeOptions;
export function setTimeSeparator(separator?: ('T' | ' ')): DateTimeOptions;
export type DateTimeOptions = {
    separator: ('T' | ' ');
};
