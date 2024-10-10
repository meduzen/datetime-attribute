/**
 * Round a number to the provided precision.
 *
 * @param {number} number The number to round.
 * @param {number} [precision=0] The rounding precision.
 * @returns {number}
 */
export const round = (number, precision = 0) => {
  precision = 10 ** precision
  return Math.round(number * precision) / precision
}
