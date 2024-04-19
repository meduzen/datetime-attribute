/**
 * @typedef {Object} DateTimeOptions
 * @property {('T'|' ')} separator
 */

/**
 * @type DateTimeOptions
 */
export const config = {
  separator: 'T',
}

/**
 * Set datetime related configuration
 *
 * @param {DateTimeOptions} options
 * @returns {DateTimeOptions}
 */
export const setConfig = options => {

  /**
   * The separator can only be 'T' or ' '.
   * https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#local-dates-and-times
   */
  if (options.separator != 'T' && options.separator != ' ') {
    throw new Error(`Invalid timezone separator. Use 'T' or ' '.`)
  }

  return Object.assign(config, options)
}

/**
 * Set separator between date and time
 *
 * @param {('T'|' ')} [separator=T]
 * @returns {DateTimeOptions}
 */
export const setTimeSeparator = (separator = 'T') => setConfig({ separator })
