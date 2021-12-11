/**
 * @typedef {Object} TimezoneOptions
 * @property {(':'|'')=} separator
 */

/**
 * @type TimezoneOptions
 */
export let tzConfig = {
  separator: ':',
}

/**
 * Set timezone related configuration
 *
 * @param {TimezoneOptions} options
 * @returns {TimezoneOptions}
 */
export const setTzConfig = ({ separator }) => {

  /**
   * The separator can only be ':' or ''.
   * https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#time-zones
   */
  if (separator != ':' && separator != '') {
    throw new Error(`Separator can only be ':'' or ''.`)
  }

  return Object.assign(tzConfig, { separator })
}

/**
 * Set timezone separator
 *
 * @param {(':'|'')=} separator
 * @returns {TimezoneOptions}
 */
export const setTzSeparator = (separator = '') => setTzConfig({ separator })
