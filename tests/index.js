import { datetime, datetimeDuration, datetimeTz, daysBetween, weekNumber } from '..'

const togoIndependanceDay = new Date(1960, 3, 27)
const date = togoIndependanceDay // alias for the sake of brevity

const january1st                      = new Date(2021, 0, 1, 10, 10, 12)
const january11th                     = new Date(2021, 0, 11, 10, 10, 12)
const january19th                     = new Date(2021, 0, 19, 10, 10, 12)
const december31th2020                = new Date(2020, 11, 31, 10, 10, 12)
const december31th2020OneMinuteLater  = new Date(2020, 11, 31, 10, 11, 12)
const december31th2021                = new Date(2021, 11, 31, 10, 10, 12)

describe('datetime', () => {
  test('is a function', () => expect(datetime).toBeInstanceOf(Function))
  test('wrong type', () => expect(() => datetime(123)).toThrow(TypeError))
  test('()', () => expect(datetime()).toBe(datetime((new Date()))))
  test('no precision', () => expect(datetime(date)).toBe('1960-04-27'))
  test('day', () => expect(datetime(date, 'day')).toBe('1960-04-27'))
  test('year', () => expect(datetime(date, 'year')).toBe('1960'))
  test('month', () => expect(datetime(date, 'month')).toBe('1960-04'))
  test('yearless', () => expect(datetime(date, 'yearless')).toBe('04-27'))
  test('time', () => expect(datetime(date, 'time')).toBe('00:00'))
  test('second', () => expect(datetime(date, 'second')).toBe('00:00:00'))
  test('ms', () => expect(datetime(date, 'ms')).toBe('00:00:00.000'))
  test('local', () => expect(datetime(date, 'local')).toBe('1960-04-27T00:00'))
  test('local second', () => expect(datetime(date, 'local second')).toBe('1960-04-27T00:00:00'))
  test('local ms', () => expect(datetime(date, 'local ms')).toBe('1960-04-27T00:00:00.000'))
  test('week on 1960-04-27', () => expect(datetime(date, 'week')).toBe('1960-W17'))
  test('week on 2021-01-01', () => expect(datetime(january1st, 'week')).toBe('2021-W53'))
  test('week on 2021-01-11', () => expect(datetime(january11th, 'week')).toBe('2021-W02'))
  test('week on 2021-01-19', () => expect(datetime(january19th, 'week')).toBe('2021-W03'))
  test('week on 2020-12-31', () => expect(datetime(december31th2020, 'week')).toBe('2020-W53'))
  test('week on 2021-12-31', () => expect(datetime(december31th2021, 'week')).toBe('2021-W52'))

  // This one can’t be tested providing an exact value as the output depends on client timezone.
  test('global ms', () => expect(datetime(date, 'global ms')).toBe(date.toJSON()))

  test('non supported precision', () => expect(datetime(date, 'n00t')).toBe('1960-04-27'))
})

describe('datetimeDuration', () => {
  const duration = { w: 3, d: 5, h: 10, m: 43, s: 2.61 }
  const durationWithTooHighValues = { w: 3, d: 19, h: 36, m: 53, s: 175.3 }
  const durationInHours = { h : 17 }
  const durationInDays = { d: 43 }

  test('is a function', () => expect(datetimeDuration).toBeInstanceOf(Function))
  test('()', () => expect(() => datetimeDuration()).toThrow())
  test('empty object {}', () => expect(datetimeDuration({})).toBeNull())
  test('complete object', () => expect(datetimeDuration(duration)).toBe('P3W5DT10H43M2.61S'))
  test('complete object with too high values', () => expect(datetimeDuration(durationWithTooHighValues)).toBe('P5W6DT12H55M55.3S'))
  test('hours only', () => expect(datetimeDuration(durationInHours)).toBe('PT17H'))
  test('days only', () => expect(datetimeDuration(durationInDays)).toBe('P6W1D'))
})

describe('datetimeTz', () => {
  test('is a function', () => expect(datetimeTz).toBeInstanceOf(Function))
  test('0', () => expect(datetimeTz(0)).toBe('Z'))
  test('-3', () => expect(datetimeTz(-3)).toBe('-03:00'))
  test('0, -30', () => expect(datetimeTz(0, -30)).toBe('-00:30'))
  test('0, 30', () => expect(datetimeTz(0, 30)).toBe('+00:30'))
  test('1', () => expect(datetimeTz(1)).toBe('+01:00'))
  test('-4.5', () => expect(datetimeTz(-4.5)).toBe('-04:30'))
  test('4, 30', () => expect(datetimeTz(4, 30)).toBe('+04:30'))
  test('12, 45', () => expect(datetimeTz(12, 45)).toBe('+12:45'))
  test('12.75', () => expect(datetimeTz(12.75)).toBe('+12:45'))
  test('-8', () => expect(datetimeTz(-8)).toBe('-08:00'))
  test('2, -200', () => expect(datetimeTz(2, -200)).toBe('-01:20'))
  test('non number', () => expect(() => datetimeTz('Z')).toThrow(TypeError))

  // This one can’t be tested providing an exact value as the output depends on client timezone and daylight time saving.
  test('()', () => expect(datetimeTz()).toBe(datetimeTz(0, (new Date()).getTimezoneOffset() * -1)))
})

describe('weekNumber', () => {
  test('is a function', () => expect(weekNumber).toBeInstanceOf(Function))
  test('1960-04-27', () => expect(weekNumber(date)).toBe(17))
  test('2021-01-01', () => expect(weekNumber(january1st)).toBe(53))
  test('2021-01-11', () => expect(weekNumber(january11th)).toBe(2))
  test('2020-12-31', () => expect(weekNumber(december31th2020)).toBe(53))
  test('2021-12-31', () => expect(weekNumber(december31th2021)).toBe(52))
})

describe('daysBetween', () => {
  test('is a function', () => expect(daysBetween).toBeInstanceOf(Function))
  test('1/1 and 11/1', () => expect(daysBetween(january1st, january11th)).toBe(10))
  test('11/1 and 1/1', () => expect(daysBetween(january11th, january1st)).toBe(-10))
  test('same day, different time', () => expect(daysBetween(december31th2020, december31th2020OneMinuteLater)).toBe(0))
})
