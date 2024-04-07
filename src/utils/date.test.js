import { describe, expect, test } from 'vitest'

import { daysBetween, weekNumber } from '../index.js'

const togoIndependanceDay = new Date(1960, 3, 27)

const january1st = new Date(2021, 0, 1, 10, 10, 12)
const january11th = new Date(2021, 0, 11, 10, 10, 12)
const december31th2020 = new Date(2020, 11, 31, 10, 10, 12)
const december31th2020OneMinuteLater = new Date(2020, 11, 31, 10, 11, 12)
const december31th2021 = new Date(2021, 11, 31, 10, 10, 12)

describe('weekNumber', () => {
  test('is a function', () => expect(weekNumber).toBeInstanceOf(Function))
  test('1960-04-27', () => expect(weekNumber(togoIndependanceDay)).toBe(17))
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
