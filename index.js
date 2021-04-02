/**
 * Create `datetime="2021-12-02"` attribute for `<time>`, from a `Date` object.
 *
 * Support all format from the spec aside from time-zone offset string.
 * https://html.spec.whatwg.org/multipage/text-level-semantics.html#attr-time-datetime
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLTimeElement/datetime
 *
 * See also: https://www.brucelawson.co.uk/2012/best-of-time/
 */
export function datetime(date = (new Date()), precision = 'day', offset = 'Z') {
  if (!(date instanceof Date)) {
      throw new TypeError('Input date should be of type `Date`');
  }

  // Local datetime at milliseconds precision (1960-04-27T00:00:00.123)
  const localMs = date.getFullYear().toString()
    + '-' + p(date.getMonth() + 1)
    + '-' + date.getDate()
    + 'T' + p(date.getHours())
    + ':' + p(date.getMinutes())
    + ':' + p(date.getSeconds())
    + '.' + p(date.getMilliseconds(), 3)

  // Extract substring from local date.
  const local = (start, end) => localMs.substr(start, end)
  const utc = (start, end) => date.toJSON().substr(start, end)

  const formats = {
    'year': () => local(0, 4),          // 1960
    'month': () => local(0, 7),         // 1960-04
    'day': () => local(0, 10),          // 1960-04-27

    'week': () => local(0, 5) + 'W' + p(weekNumber(date)), // 1960-W17
    'yearless': () => local(5, 5),      // 04-27

    'time': () => local(11, 5),         // 00:00
    'second': () => local(11, 8),       // 00:00:00
    'ms': () => local(11, 12),          // 00:00:00.123

    'datetime': () => local(0, 16),        // 1960-04-27T00:00
    'datetime second': () => local(0, 19), // 1960-04-27T00:00:00
    'datetime ms': () => local(0, 23),     // 1960-04-27T00:00:00.123

    'datetime utc': () => utc(0, 16) + 'Z',        // 1960-04-26T23:00Z
    'datetime second utc': () => utc(0, 19) + 'Z', // 1960-04-26T23:00:00Z
    'datetime ms utc': () => date.toJSON(),                // 1960-04-26T23:00:00.000Z

    'time utc': () => utc(11, 5) + 'Z',   // 23:00Z
    'second utc': () => utc(11, 8) + 'Z', // 23:00:00Z
    'ms utc': () => utc(11, 12) + 'Z',    // 23:00:00.000Z
  }

  return (formats[precision] || formats.day)()
}

/**
 * Create `datetime="+04:00"` timezone attribute for `<time>`.
 * https://html.spec.whatwg.org/multipage/text-level-semantics.html#attr-time-datetime
 * https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#concept-timezone
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLTimeElement/datetime
 */
export function datetimeTz(hours = 0, minutes = 0) {

  // No arguments received: the local timezone offset is returned.
  if (!('0' in arguments)) {
    return datetimeTz(0, (new Date()).getTimezoneOffset() * -1)
  }

  if (typeof hours != 'number' || typeof minutes != 'number') {
    throw new TypeError('hours and (optional) minutes must be numbers.');
  }

  // Convert given offset in minutes by merging parameters.
  minutes = hours * 60 + minutes

  // Offset sign: `+` (UTC ≥ 0) or `-` (UTC < 0).
  const sign = minutes > 0 ? '+' : '-'

  // Get hours and minutes.
  hours = Math.trunc(minutes / 60)
  minutes = minutes % 60

  if (hours == 0 && minutes == 0 ) { return 'Z' }

  // Remove sign (handled separately) and ignore the decimal part.
  [hours, minutes] = [hours, minutes].map(value => Math.trunc(Math.abs(value)))

  return sign + p(hours) + ':' + p(minutes)
}

/**
 * Create `datetime="P3DT2H8M32.541S"` duration attribute for `<time>`.
 * https://html.spec.whatwg.org/multipage/text-level-semantics.html#attr-time-datetime
 * https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#concept-duration
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLTimeElement/datetime
 *
 * See also: https://www.brucelawson.co.uk/2012/best-of-time/
 */
export function datetimeDuration(duration) {

  // Set default values for missing keys.
  let { w = 0, d = 0, h = 0, m = 0, s = 0 } = duration

  // At least one duration must be different than zero.
  if (![w, d, h, m, s].some(value => value)) {
    return null
  }

  // Total duration in seconds.
  let time = s
    + 60 * m
    + 60 * 60 * h
    + 60 * 60 * 24 * d
    + 60 * 60 * 24 * 7 * w

  // Reducing remaining time by given cx.
  const divideRemainingTimeBy = cx => time = Math.floor(time / cx)
  const getStr = (value, unit) => (value ? `${value}${unit}` : '')

  s = round(time % 60, 3)
  divideRemainingTimeBy(60)

  m = time % 60
  divideRemainingTimeBy(60)

  h = time % 24
  divideRemainingTimeBy(24)

  d = time % 7
  w = divideRemainingTimeBy(7)

  return 'P' + getStr(w, 'W') + getStr(d, 'D') // weeks and days
    + (h || m || s ? 'T' : '') // separator
    + getStr(h, 'H') + getStr(m, 'M') + getStr(s, 'S') // hours, minutes, seconds

  // // Alternative implementation: 1848 bytes vs 1826 B for the active one.
  // Checked on: https://skalman.github.io/UglifyJS-online/

  // /**
  //  * Base durations by unit + total duration. We’ll iterate over those to split
  //  * the total duration at the right time (= turn 71 min. into 1 h 11 min.).
  //  */
  // duration = {
  //   s: 60, // seconds in minute
  //   m: 60, // minutes in hour
  //   h: 24, // hours in day
  //   d: 7, // days in week

  //   w: s + 60 * m // total duration in seconds
  //     + 60 * 60 * h
  //     + 60 * 60 * 24 * d
  //     + 60 * 60 * 24 * 7 * w,
  // }

  // // Reduce total duration and overwrite `duration` keys with computed values.
  // Object.entries(duration).reduce((acc, [key, max]) => {
  //   const res = key != 'w' ? round(acc % max, 3) : acc

  //   // Savagely overwrite “units” with computed value.
  //   duration[key] = res ? `${res}${key.toUpperCase()}` : ''

  //   return Math.floor(acc / max)
  // }, duration.w)

  // return 'P' + duration.w + duration.d
  //   + (duration.h || duration.m || duration.s ? 'T' : '') // separator
  //   + duration.h + duration.m + duration.s
}

/**
 * Calculate the difference between 2 dates in days, discarding the time of day.
 */
export function daysBetween(date, furtherDate) {
  date = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  furtherDate = new Date(furtherDate.getFullYear(), furtherDate.getMonth(), furtherDate.getDate())

  const diffInDays = (furtherDate - date) / MILLISECONDS_PER_DAY

  return Math.ceil(diffInDays)
}

/**
 * Get the week number as defined by the WHATWG and the ISO-8601 specs:
 *
 * - a week starts on Monday (https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#concept-week);
 * - the first week of the year includes a Thursday;
 * - week numbers go from 1 to 53 (https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#week-number-of-the-last-day).
 *
 * @param {Date} date
 */
export function weekNumber(date) {
  const dayIndex = date.getDay() || 7 // normalize index because Sunday == 0

  const sameWeekThursday = new Date(date)
  sameWeekThursday.setDate(date.getDate() + 4 - dayIndex)

  const january1st = new Date(sameWeekThursday.getFullYear(), 0, 1)
  const daysDifference = daysBetween(january1st, sameWeekThursday)

  return Math.ceil(daysDifference / 7)
}

/* --------------------- *\
 * Non-exported helpers. *
\* --------------------- */

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24

// Round a number to the provided precision.
const round = (number, precision = 0) => {
  precision = 10 ** precision
  return Math.round(number * precision) / precision
}

// padStart a stringable variable by the provided number of 0.
const p = (value, length = 2) => value.toString().padStart(length, '0')
