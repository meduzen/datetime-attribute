import { describe, expect, test } from 'vitest'

import { datetime, datetimeTz, tzOffset, utc } from './index.js'
import { getNormalizeDay } from './utils/date.js'

const togoIndependanceDay = new Date(1960, 3, 27)
const date = togoIndependanceDay // alias for the sake of brevity

const firstCerealHarvest = new Date(-23000, 6, 7)
const foundationOfSyracuse = new Date(-733, 6, 7)
const birthOfChineseEmpressWuZetian = new Date(624, 1, 17) // https://en.wikipedia.org/wiki/Wu_Zetian
const january1st2021 = new Date(2021, 0, 1, 10, 10, 12)
const january11th = new Date(2021, 0, 11, 10, 10, 12)
const january19th = new Date(2021, 0, 19, 10, 10, 12)
const december31th2020 = new Date(2020, 11, 31, 10, 10, 12)
const december31th2021 = new Date(2021, 11, 31, 10, 10, 12)
const year10k = new Date(10000, 0, 1)

const tzOffsetInMinutes = (new Date()).getTimezoneOffset() * -1

describe('datetime', () => {

  test('is a function', () => {
    expect(datetime).toBeInstanceOf(Function)
  })

  test('throws on wrong date type', () => {
    expect(() => datetime(123)).toThrow(TypeError)
  })

  test('“now” as default date parameter', () => {
    expect(datetime()).toBe(datetime((new Date())))
  })

  test('no precision', () => expect(datetime(date)).toBe('1960-04-27'))
  test('no precision before the 10th', () => expect(datetime(january1st2021)).toBe('2021-01-01'))

  describe('precision, no UTC', () => {

    test('day', () => {
      expect(datetime(date, 'day')).toBe('1960-04-27')
    })

    test('year', () => {
      expect(datetime(date, 'year')).toBe('1960')
    })

    test('month', () => {
      expect(datetime(date, 'month')).toBe('1960-04')
    })

    test('yearless', () => {
      expect(datetime(date, 'yearless')).toBe('04-27')
    })

    test('time', () => {
      expect(datetime(date, 'time')).toBe('00:00')
    })

    test('second', () => {
      expect(datetime(date, 'second')).toBe('00:00:00')
    })

    test('ms', () => {
      expect(datetime(date, 'ms')).toBe('00:00:00.000')
    })

    test('datetime', () => {
      expect(datetime(date, 'datetime')).toBe('1960-04-27T00:00')
    })

    test('datetime second', () => {
      expect(datetime(date, 'datetime second')).toBe('1960-04-27T00:00:00')
    })

    test('datetime ms', () => {
      expect(datetime(date, 'datetime ms')).toBe('1960-04-27T00:00:00.000')
    })
  })

  describe('week', () => {

    test('week on 1960-04-27 is 1960-W17', () => {
      expect(datetime(date, 'week')).toBe('1960-W17')
    })

    test('week on 2020-12-31 is 2020-W53', () => {
      expect(datetime(december31th2020, 'week')).toBe('2020-W53')
    })

    // 1st day of the year is after Thurdsay
    test('week on 2021-01-01 is 2020-W53', () => {
      expect(getNormalizeDay(january1st2021)).toBeGreaterThan(4)
      expect(datetime(january1st2021, 'week')).toBe('2020-W53')
    })

    test('week on 2021-01-08 is 2021-W01', () => {
      expect(datetime(new Date(2021, 0, 8), 'week')).toBe('2021-W01')
    })

    test('week on 2021-01-11 is 2021-W02', () => {
      expect(datetime(january11th, 'week')).toBe('2021-W02')
    })

    test('week on 2021-01-19 is 2021-W03', () => {
      expect(datetime(january19th, 'week')).toBe('2021-W03')
    })

    // 1st day of the month is after Thurdsay
    test('week on 2021-03-01 is 2021-W17', () => {
      const march1st2021 = new Date(2021, 4, 1)
      expect(getNormalizeDay(march1st2021)).toBeGreaterThan(4)
      expect(datetime(march1st2021, 'week')).toBe('2021-W17')
    })

    test('week on 2021-12-31 is 2021-W52', () => {
      expect(datetime(december31th2021, 'week')).toBe('2021-W52')
    })
  })

  // These ones can’t be tested providing an exact value as the output depends on client timezone.
  describe('precision, UTC', () => {

    test('time utc', () => {
      expect(datetime(date, 'time utc')).toBe(date.toJSON().substr(11, 5) + 'Z')
    })

    test('second utc', () => {
      expect(datetime(date, 'second utc')).toBe(date.toJSON().substr(11, 8) + 'Z')
    })

    test('ms utc', () => {
      expect(datetime(date, 'ms utc')).toBe(date.toJSON().substr(11, 12) + 'Z')
    })

    test('datetime utc', () => {
      expect(datetime(date, 'datetime utc')).toBe(date.toJSON().substr(0, 16) + 'Z')
    })

    test('datetime second utc', () => {
      expect(datetime(date, 'datetime second utc')).toBe(date.toJSON().substr(0, 19) + 'Z')
    })

    test('datetime ms utc', () => {
      expect(datetime(date, 'datetime ms utc')).toBe(date.toJSON())
    })
  })

  describe('year and yearless, but for years outside the ISO-8601 range', () => {

    test('3 digits year before 0', () => {
      expect(datetime(foundationOfSyracuse, 'year')).toBe('-0733')
    })

    test('3 digits year', () => {
      expect(datetime(birthOfChineseEmpressWuZetian, 'year')).toBe('0624')
    })

    test('5 digits year before 0', () => {
      expect(datetime(firstCerealHarvest, 'year')).toBe('-23000')
    })

    test('5 digits year after 9999', () => {
      expect(datetime(year10k, 'year')).toBe('10000')
    })

    test('yearless and year before 0', () => {
      expect(datetime(foundationOfSyracuse, 'yearless')).toBe('07-07')
    })

    test('yearless and 3 digits year', () => {
      expect(datetime(birthOfChineseEmpressWuZetian, 'yearless')).toBe('02-17')
    })
  })

  test('unsupported precision falls back on the default one', () => {
    expect(datetime(date, 'n00t')).toBe('1960-04-27')
  })
})

describe('datetimeTz', () => {

  test('is a function', () => {
    expect(datetimeTz).toBeInstanceOf(Function)
  })

  test('throws on wrong date type', () => {
    expect(() => datetimeTz(123)).toThrow(TypeError)
  })

  test('“now” as default date parameter', () => {
    expect(datetimeTz()).toBe(datetimeTz((new Date())))
  })

  test('no precision', () => {
    expect(datetimeTz(date)).toBe('1960-04-27T00:00' + tzOffset(0, tzOffsetInMinutes))
  })

  test('no offset', () => {
    expect(datetimeTz(date, 'time')).toBe('00:00' + tzOffset(0, tzOffsetInMinutes))
  })

  describe('precision, no UTC', () => {

    test('time 0', () => {
      expect(datetimeTz(date, 'time', 0)).toBe('00:00Z')
    })

    test('time +4', () => {
      expect(datetimeTz(date, 'time', 4)).toBe('00:00+04:00')
    })

    test('second -3', () => {
      expect(datetimeTz(date, 'second', -3)).toBe('00:00:00-03:00')
    })

    test('ms +3.5', () => {
      expect(datetimeTz(date, 'ms', 3.5)) .toBe('00:00:00.000+03:30')
    })

    test('datetime +12:45', () => {
      expect(datetimeTz(date, 'datetime', 12, 45)).toBe('1960-04-27T00:00+12:45')
    })

    test('datetime +17, 30, true', () => {
      expect(datetimeTz(date, 'datetime', 17, 30, true)).toBe('1960-04-27T00:00-06:30')
    })

    test('datetime second -6', () => {
      expect(datetimeTz(date, 'datetime second', -6)).toBe('1960-04-27T00:00:00-06:00')
    })

    test('datetime ms +1', () => {
      expect(datetimeTz(date, 'datetime ms', 1)).toBe('1960-04-27T00:00:00.000+01:00')
    })
  })

  // These ones can’t be tested providing an exact value as the output depends on client timezone.

  describe('precision, UTC', () => {

    test('time utc', () => {
      expect(datetimeTz(date, 'time utc')).toBe(date.toJSON().substr(11, 5) + 'Z')
    })

    test('second utc', () => {
      expect(datetimeTz(date, 'second utc')).toBe(date.toJSON().substr(11, 8) + 'Z')
    })

    test('ms utc', () => {
      expect(datetimeTz(date, 'ms utc')).toBe(date.toJSON().substr(11, 12) + 'Z')
    })

    test('datetime utc', () => {
      expect(datetimeTz(date, 'datetime utc')).toBe(date.toJSON().substr(0, 16) + 'Z')
    })

    test('datetime second utc', () => {
      expect(datetimeTz(date, 'datetime second utc')).toBe(date.toJSON().substr(0, 19) + 'Z')
    })

    test('datetime ms utc', () => {
      expect(datetimeTz(date, 'datetime ms utc')).toBe(date.toJSON())
    })
  })
})

describe('utc', () => {
  test('is a function', () => {
    expect(utc).toBeInstanceOf(Function)
  })

  test('throws on wrong date type', () => {
    expect(() => utc(123)).toThrow(TypeError)
  })

  test('“now” as default date parameter', () => {
    expect(utc()).toBe(utc((new Date())))
  })

  // These ones can’t be tested providing an exact value as the output depends on client timezone.

  describe('precision', () => {

    test(`'datetime' is the default precision`, () => {
      expect(utc(date)).toBe(date.toJSON().substr(0, 16) + 'Z')
    })

    test('time', () => {
      expect(utc(date, 'time')).toBe(date.toJSON().substr(11, 5) + 'Z')
    })

    test('second', () => {
      expect(utc(date, 'second')).toBe(date.toJSON().substr(11, 8) + 'Z')
    })

    test('ms', () => {
      expect(utc(date, 'ms')).toBe(date.toJSON().substr(11, 12) + 'Z')
    })

    test('datetime', () => {
      expect(utc(date, 'datetime')).toBe(date.toJSON().substr(0, 16) + 'Z')
    })

    test('datetime second', () => {
      expect(utc(date, 'datetime second')).toBe(date.toJSON().substr(0, 19) + 'Z')
    })

    test('datetime ms', () => {
      expect(utc(date, 'datetime ms')).toBe(date.toJSON())
    })
  })

  test('unsupported precision falls back on the default one', () => {
    expect(utc(date, 'n00t')).toBe('1960-04-27')
  })
})
