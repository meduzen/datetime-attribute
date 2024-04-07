import { describe, expect, test } from 'vitest'

import { tzOffset } from './index.js'

const tzOffsetInMinutes = (new Date()).getTimezoneOffset() * -1

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
