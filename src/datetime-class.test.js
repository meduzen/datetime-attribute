import { describe, expect, test } from 'vitest'

import { DateTime } from './index.js'

const summer = new DateTime(2021, 5, 21)
const twoWeeksAfterSummer = new DateTime(2021, 6, 5)

describe('DateTime class', () => {
  test('extends Date', () => expect(summer).toBeInstanceOf(Date))
  test('DateTime.getWeek', () => expect(summer.getWeek()).toBe(25))
  test("DateTime.to('day')", () => expect(summer.to('day')).toBe('2021-06-21'))
  test("DateTime.to('month')", () => expect(twoWeeksAfterSummer.to('month')).toBe('2021-07'))
  test('DateTime.setWeek()', () => expect(summer.setWeek(27)).toBe(twoWeeksAfterSummer.getTime()))
  test('weeks is changed when day changes', () => {
    summer.setDate(summer.getDate() + 14)
    return expect(summer.getWeek()).toBe(29)
  })
})
