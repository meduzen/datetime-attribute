import { beforeEach, describe, expect, test } from 'vitest'

import { DateTime, datetime } from './index.js'
import { MILLISECONDS_PER_DAY } from './utils/const.js'

const FOURTEEN_DAYS_IN_MS = MILLISECONDS_PER_DAY * 14

describe('DateTime class', () => {
  /** @type {Date} */ let summer
  /** @type {Date} */ let twoWeeksIntoSummer
  /** @type {Date} */ let winter
  /** @type {Date} */ let twoWeeksIntoWinter

  beforeEach(() => {
    summer = new DateTime(2021, 5, 21)
    twoWeeksIntoSummer = new DateTime(summer.getTime() + FOURTEEN_DAYS_IN_MS) // same as `new DateTime(2021, 6, 5)`

    winter = new DateTime(2021, 11, 21)
    twoWeeksIntoWinter = new DateTime(winter.getTime() + FOURTEEN_DAYS_IN_MS) // same as `new DateTime(2022, 1, 4)`
  })

  test('extends the Date class', () => {
    expect(summer).toBeInstanceOf(DateTime)
    expect(summer).toBeInstanceOf(Date)
  })

  describe('.to() == datetime()', () => {

    test('with default precision', () => {
      expect(summer.to()).toBe('2021-06-21')
      expect(datetime(summer)).toBe('2021-06-21')
    })

    test(`with 'month' precision`, () => {
      expect(twoWeeksIntoSummer.to('month')).toBe('2021-07')
      expect(datetime(twoWeeksIntoSummer, 'month')).toBe('2021-07')
    })

    test(`with 'week' precision, after the week is changed to a new year`, () => {
      winter.setDate(winter.getDate() + 14)

      expect(winter.to('week')).toBe(twoWeeksIntoWinter.to('week'))
      expect(winter.to('week')).toBe('2022-W01')
      expect(datetime(winter, 'week')).toBe('2022-W01')
    })
  })

  describe('.getWeek()', () => {

    test('returns the week number', () => {
      expect(summer.getWeek()).toBe(25)
    })

    test('returns the week number after the date is changed', () => {
      summer.setDate(summer.getDate() + 14)

      expect(summer.getWeek()).toBe(twoWeeksIntoSummer.getWeek())
    })

    test('returns the week number after the date is changed to a new year', () => {
      winter.setDate(winter.getDate() + 14)

      expect(winter.getWeek()).toBe(twoWeeksIntoWinter.getWeek())
    })
  })

  test('.setWeek() returns the timestamp of the changed date', () => {
    expect(summer.setWeek(27)).toBe(twoWeeksIntoSummer.getTime())
  })
})
