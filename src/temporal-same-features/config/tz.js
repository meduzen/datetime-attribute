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
export const tzConfig = {
  inRealWorldRange: false,
  separator: ':',
}

const defaultConfig = { ...tzConfig }

/**
 * Set timezone related configuration
 *
 * @param {TimezoneOptions} options
 * @returns {TimezoneOptions}
 */
export const setTzConfig = (options = defaultConfig) => {
  const { separator, inRealWorldRange } = options

  /**
   * The separator can only be ':' or ''.
   * https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#time-zones
   */
  if ('separator' in options && separator != ':' && separator != '') {
    throw new Error(`Invalid timezone separator. Use ':' or ''.`)
  }

  if ('inRealWorldRange' in options && typeof inRealWorldRange != 'boolean') {
    throw new Error(`Invalid value for 'inRealWorldRange'. Use true or false.`)
  }

  return Object.assign(tzConfig, options)
}

/**
 * Set timezone separator
 *
 * @param {TimezoneOptions['separator']} [separator='']
 * @returns {TimezoneOptions}
 */
export const setTzSeparator = (separator = '') => setTzConfig({ separator })

/**
 * Shift timezones to be inside the real-world (IANA) range
 *
 * @param {TimezoneOptions['inRealWorldRange']} [inRealWorldRange=false]
 * @returns {TimezoneOptions}
 */
export const setTzInRealWorldRange = (inRealWorldRange = false) => setTzConfig({ inRealWorldRange })
