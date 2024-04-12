/**
 * @typedef {Object} TimezoneOptions
 * @property {(':'|'')} separator
 */

/**
 * @type TimezoneOptions
 */
export const tzConfig = {
  separator: ':',
}

/**
 * Set timezone related configuration
 *
 * @param {TimezoneOptions} options
 * @returns {TimezoneOptions}
 */
export const setTzConfig = options => {

  /**
   * The separator can only be ':' or ''.
   * https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#time-zones
   */
  if (options.separator != ':' && options.separator != '') {
    throw new Error(`Invalid timezone separator. Use ':' or ''.`)
  }

  return Object.assign(tzConfig, options)
}

/**
 * Set timezone separator
 *
 * @param {(':'|'')} [separator='']
 * @returns {TimezoneOptions}
 */
export const setTzSeparator = (separator = '') => setTzConfig({ separator })
