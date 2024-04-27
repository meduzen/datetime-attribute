import { describe, expect, test } from 'vitest'

import { daysBetween, weekNumber } from '../index.js'

const togoIndependanceDay = new Date(1960, 3, 27)
const january1st2021 = new Date(2021, 0, 1, 10, 10, 12)
const january11th = new Date(2021, 0, 11, 10, 10, 12)
const december31th2020 = new Date(2020, 11, 31, 10, 10, 12)
const december31th2020OneMinuteLater = new Date(2020, 11, 31, 10, 11, 12)
const december31th2021 = new Date(2021, 11, 31, 10, 10, 12)
const january2nd2022 = new Date(2022, 0, 2, 10, 10, 12)
const january3rd2022 = new Date(2022, 0, 3, 10, 10, 12)

describe('weekNumber', () => {

  test('is a function', () => {
    expect(weekNumber).toBeInstanceOf(Function)
  })

  describe('weeks without year overlap', () => {

    test('1960-04-27 is week 17', () => {
      expect(weekNumber(togoIndependanceDay)).toBe(17)
    })

    test('2021-01-11 is week 2', () => {
      expect(weekNumber(january11th)).toBe(2)
    })
  })

  describe('weeks with potential year overlap', () => {

    test('2020-12-31 is week 53', () => {
      expect(weekNumber(december31th2020)).toBe(53)
    })

    test('2021-01-01 is week 53', () => {
      expect(weekNumber(january1st2021)).toBe(53)
    })

    test('2021-12-31 is week 52', () => {
      expect(weekNumber(december31th2021)).toBe(52)
    })

    test('2022-01-02 is week 52', () => {
      expect(weekNumber(january2nd2022)).toBe(52)
    })

    test('2022-01-03 is week 1', () => {
      expect(weekNumber(january3rd2022)).toBe(1)
    })
  })

})

describe('daysBetween', () => {

  test('is a function', () => expect(daysBetween).toBeInstanceOf(Function))

  test('10 days between 1/1 and 11/1', () => {
    expect(daysBetween(january1st2021, january11th)).toBe(10)
  })

  test('-10 days between 11/1 and 1/1', () => {
    expect(daysBetween(january11th, january1st2021)).toBe(-10)
  })

  test('same day, different time', () => {
    expect(daysBetween(december31th2020, december31th2020OneMinuteLater)).toBe(0)
  })
})
