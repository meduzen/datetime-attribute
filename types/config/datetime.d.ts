/**
 * @typedef {Object} DateTimeOptions
 * @property {('T'|' ')} separator The separator between date and time
 *                                 (`'2024-04-21T10:34'`) can be a
 *                                 'T' (default) or a space.
 */
/** @type DateTimeOptions */
export const config: DateTimeOptions;
export function setConfig(options: DateTimeOptions): DateTimeOptions;
export function setTimeSeparator(separator?: DateTimeOptions['separator']): DateTimeOptions;
export type DateTimeOptions = {
    /**
     * The separator between date and time
     * (`'2024-04-21T10:34'`) can be a
     * 'T' (default) or a space.
     */
    separator: ('T' | ' ');
};
