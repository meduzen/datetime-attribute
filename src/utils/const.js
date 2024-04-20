export const MINUTES_PER_DAY = 60 * 24
export const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
export const MILLISECONDS_PER_WEEK = MILLISECONDS_PER_DAY * 7

/**
 * The farthest timezone offset **behind** UTC time.
 */
export const REAL_LIFE_LOWER_TIMEZONE = -12 * 60 // -12:00

/**
 * The farthest timezone offset **ahead of** UTC time.
 */
export const REAL_LIFE_UPPER_TIMEZONE = 14 * 60 // +14:00

/**
 * Local timezone offset from UTC, in minutes.
 */
export const LOCAL_TZ_OFFSET = (new Date()).getTimezoneOffset() * -1
