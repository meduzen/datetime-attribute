/**
 * padStart a stringable variable by the provided number of 0.
 *
 * @param {*} value A stringable value (string, number…).
 * @param {number} [length=2] The number of 0 at the beginning of the result.
 * @returns {string}
 */
export const p = (value, length = 2) => value.toString().padStart(length, '0')
