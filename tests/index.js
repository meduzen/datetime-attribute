import {
  DateTime,
  datetime,
  utc,
  datetimeTz,
  duration,
  tzOffset,
  daysBetween,
  weekNumber
} from '../src'

const togoIndependanceDay = new Date(1960, 3, 27)
const date = togoIndependanceDay // alias for the sake of brevity

const january1st = new Date(2021, 0, 1, 10, 10, 12)
const january11th = new Date(2021, 0, 11, 10, 10, 12)
const january19th = new Date(2021, 0, 19, 10, 10, 12)
const december31th2020 = new Date(2020, 11, 31, 10, 10, 12)
const december31th2020OneMinuteLater = new Date(2020, 11, 31, 10, 11, 12)
const december31th2021 = new Date(2021, 11, 31, 10, 10, 12)

const tzOffsetInMinutes = (new Date()).getTimezoneOffset() * -1

describe('datetime', () => {
  test('is a function', () => expect(datetime).toBeInstanceOf(Function))
  test('wrong type', () => expect(() => datetime(123)).toThrow(TypeError))
  test('()', () => expect(datetime()).toBe(datetime((new Date()))))
  test('no precision', () => expect(datetime(date)).toBe('1960-04-27'))
  test('no precision before the 10th', () => expect(datetime(january1st)).toBe('2021-01-01'))
  test('day', () => expect(datetime(date, 'day')).toBe('1960-04-27'))
  test('year', () => expect(datetime(date, 'year')).toBe('1960'))
  test('month', () => expect(datetime(date, 'month')).toBe('1960-04'))
  test('yearless', () => expect(datetime(date, 'yearless')).toBe('04-27'))
  test('time', () => expect(datetime(date, 'time')).toBe('00:00'))
  test('second', () => expect(datetime(date, 'second')).toBe('00:00:00'))
  test('ms', () => expect(datetime(date, 'ms')).toBe('00:00:00.000'))
  test('datetime', () => expect(datetime(date, 'datetime')).toBe('1960-04-27T00:00'))
  test('datetime second', () => expect(datetime(date, 'datetime second')).toBe('1960-04-27T00:00:00'))
  test('datetime ms', () => expect(datetime(date, 'datetime ms')).toBe('1960-04-27T00:00:00.000'))
  test('week on 1960-04-27', () => expect(datetime(date, 'week')).toBe('1960-W17'))
  test('week on 2021-01-01', () => expect(datetime(january1st, 'week')).toBe('2021-W53'))
  test('week on 2021-01-11', () => expect(datetime(january11th, 'week')).toBe('2021-W02'))
  test('week on 2021-01-19', () => expect(datetime(january19th, 'week')).toBe('2021-W03'))
  test('week on 2020-12-31', () => expect(datetime(december31th2020, 'week')).toBe('2020-W53'))
  test('week on 2021-12-31', () => expect(datetime(december31th2021, 'week')).toBe('2021-W52'))

  // These ones can’t be tested providing an exact value as the output depends on client timezone.
  test('time utc', () => expect(datetime(date, 'time utc')).toBe(date.toJSON().substr(11, 5) + 'Z'))
  test('second utc', () => expect(datetime(date, 'second utc')).toBe(date.toJSON().substr(11, 8) + 'Z'))
  test('ms utc', () => expect(datetime(date, 'ms utc')).toBe(date.toJSON().substr(11, 12) + 'Z'))
  test('datetime utc', () => expect(datetime(date, 'datetime utc')).toBe(date.toJSON().substr(0, 16) + 'Z'))
  test('datetime second utc', () => expect(datetime(date, 'datetime second utc')).toBe(date.toJSON().substr(0, 19) + 'Z'))
  test('datetime ms utc', () => expect(datetime(date, 'datetime ms utc')).toBe(date.toJSON()))

  test('non supported precision', () => expect(datetime(date, 'n00t')).toBe('1960-04-27'))
})

describe('utc', () => {
  test('is a function', () => expect(utc).toBeInstanceOf(Function))
  test('wrong type', () => expect(() => utc(123)).toThrow(TypeError))
  test('()', () => expect(utc()).toBe(utc((new Date()))))

  // These ones can’t be tested providing an exact value as the output depends on client timezone.
  test('no precision', () => expect(utc(date)).toBe(date.toJSON().substr(0, 16) + 'Z'))
  test('time', () => expect(utc(date, 'time')).toBe(date.toJSON().substr(11, 5) + 'Z'))
  test('second', () => expect(utc(date, 'second')).toBe(date.toJSON().substr(11, 8) + 'Z'))
  test('ms', () => expect(utc(date, 'ms')).toBe(date.toJSON().substr(11, 12) + 'Z'))
  test('datetime', () => expect(utc(date, 'datetime')).toBe(date.toJSON().substr(0, 16) + 'Z'))
  test('datetime second', () => expect(utc(date, 'datetime second')).toBe(date.toJSON().substr(0, 19) + 'Z'))
  test('datetime ms', () => expect(utc(date, 'datetime ms')).toBe(date.toJSON()))

  test('non supported precision', () => expect(utc(date, 'n00t')).toBe('1960-04-27'))
})

describe('duration', () => {
  const durationObject = { w: 3, d: 5, h: 10, m: 43, s: 2.61 }
  const durationWithTooHighValues = { w: 3, d: 19, h: 36, m: 53, s: 175.3 }
  const durationInHours = { h: 17 }
  const durationInDays = { d: 43 }

  test('is a function', () => expect(duration).toBeInstanceOf(Function))
  test('()', () => expect(() => duration(null)).toThrow())
  test('()', () => expect(duration()).toBe('PT0S'))
  test('empty object {}', () => expect(duration({})).toBe('PT0S'))
  test('empty object {}', () => expect(duration({}, false)).toBe('PT0S'))

  test('complete object', () => expect(duration(durationObject)).toBe('P3W5DT10H43M2.61S'))
  test('complete object with too high values', () => expect(duration(durationWithTooHighValues)).toBe('P5W6DT12H55M55.3S'))
  test('hours only', () => expect(duration(durationInHours)).toBe('PT17H'))
  test('days only', () => expect(duration(durationInDays)).toBe('P6W1D'))

  test('complete object without converting the excess', () => expect(duration(durationObject, false)).toBe('P3W5DT10H43M2.61S'))
  test('complete object with too high values without converting the excess', () => expect(duration(durationWithTooHighValues, false)).toBe('P3W19DT36H53M175.3S'))
  test('hours only without converting the excess', () => expect(duration(durationInHours, false)).toBe('PT17H'))
  test('days only without converting the excess', () => expect(duration(durationInDays, false)).toBe('P43D'))
})

describe('tzOffset', () => {
  test('is a function', () => expect(tzOffset).toBeInstanceOf(Function))
  test('0', () => expect(tzOffset(0)).toBe('Z'))
  test('-3', () => expect(tzOffset(-3)).toBe('-03:00'))
  test('0, -30', () => expect(tzOffset(0, -30)).toBe('-00:30'))
  test('0, 30', () => expect(tzOffset(0, 30)).toBe('+00:30'))
  test('1', () => expect(tzOffset(1)).toBe('+01:00'))
  test('-4.5', () => expect(tzOffset(-4.5)).toBe('-04:30'))
  test('4, 30', () => expect(tzOffset(4, 30)).toBe('+04:30'))
  test('12, 45', () => expect(tzOffset(12, 45)).toBe('+12:45'))
  test('12.75', () => expect(tzOffset(12.75)).toBe('+12:45'))
  test('-8', () => expect(tzOffset(-8)).toBe('-08:00'))
  test('2, -200', () => expect(tzOffset(2, -200)).toBe('-01:20'))
  test('-35', () => expect(tzOffset(-35)).toBe('-11:00'))
  test('62.75', () => expect(tzOffset(62.75)).toBe('+14:45'))
  test('-12, 0, true', () => expect(tzOffset(-12, 0, true)).toBe('-12:00'))
  test('-12, -20, true', () => expect(tzOffset(-12, -20, true)).toBe('+11:40'))
  test('-13, -20, true', () => expect(tzOffset(-13, -20, true)).toBe('+10:40'))
  test('14, 45, true', () => expect(tzOffset(14, 45, true)).toBe('-09:15'))
  test('62.75, 0, true', () => expect(tzOffset(62.75, 0, true)).toBe('-09:15'))
  test('non number', () => expect(() => tzOffset('Z')).toThrow(TypeError))

  // This one can’t be tested providing an exact value as the output depends on client timezone and daylight time saving.
  test('()', () => expect(tzOffset()).toBe(tzOffset(0, tzOffsetInMinutes)))
})

describe('datetimeTz', () => {
  test('is a function', () => expect(datetimeTz).toBeInstanceOf(Function))
  test('wrong type', () => expect(() => datetimeTz(123)).toThrow(TypeError))
  test('()', () => expect(datetimeTz()).toBe(datetimeTz((new Date()))))
  test('no precision', () => expect(datetimeTz(date)).toBe('1960-04-27T00:00' + tzOffset(0, tzOffsetInMinutes)))
  test('no offset', () => expect(datetimeTz(date, 'time')).toBe('00:00' + tzOffset(0, tzOffsetInMinutes)))
  test('time 0', () => expect(datetimeTz(date, 'time', 0)).toBe('00:00Z'))
  test('time +4', () => expect(datetimeTz(date, 'time', 4)).toBe('00:00+04:00'))
  test('second -3', () => expect(datetimeTz(date, 'second', -3)).toBe('00:00:00-03:00'))
  test('ms +3.5', () => expect(datetimeTz(date, 'ms', 3.5)).toBe('00:00:00.000+03:30'))
  test('datetime +12:45', () => expect(datetimeTz(date, 'datetime', 12, 45)).toBe('1960-04-27T00:00+12:45'))
  test('datetime +17, 30, true', () => expect(datetimeTz(date, 'datetime', 17, 30, true)).toBe('1960-04-27T00:00-06:30'))
  test('datetime second -6', () => expect(datetimeTz(date, 'datetime second', -6)).toBe('1960-04-27T00:00:00-06:00'))
  test('datetime ms +1', () => expect(datetimeTz(date, 'datetime ms', 1)).toBe('1960-04-27T00:00:00.000+01:00'))

  // These ones can’t be tested providing an exact value as the output depends on client timezone.
  test('time utc', () => expect(datetimeTz(date, 'time utc')).toBe(date.toJSON().substr(11, 5) + 'Z'))
  test('second utc', () => expect(datetimeTz(date, 'second utc')).toBe(date.toJSON().substr(11, 8) + 'Z'))
  test('ms utc', () => expect(datetimeTz(date, 'ms utc')).toBe(date.toJSON().substr(11, 12) + 'Z'))
  test('datetime utc', () => expect(datetimeTz(date, 'datetime utc')).toBe(date.toJSON().substr(0, 16) + 'Z'))
  test('datetime second utc', () => expect(datetimeTz(date, 'datetime second utc')).toBe(date.toJSON().substr(0, 19) + 'Z'))
  test('datetime ms utc', () => expect(datetimeTz(date, 'datetime ms utc')).toBe(date.toJSON()))
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

const summer = new DateTime(2021, 5, 21)
const oneWeekAfterSummer = new DateTime(2021, 5, 28)

describe('DateTime class', () => {
  test('extends Date', () => expect(summer).toBeInstanceOf(Date))
  test('.getWeekNumber', () => expect(summer.getWeekNumber()).toBe(25))
  test('.setWeekNumber', () => expect(summer.setWeekNumber(26)).toBe(oneWeekAfterSummer.getTime()))
  test(".to('day')", () => expect(summer.to('day')).toBe('2021-06-28'))
})
