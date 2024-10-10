import { describe, expect, test } from 'vitest'
import { tzOffset } from './index.js'
import { Temporal } from '@js-temporal/polyfill'

const tzOffsetInMinutes = (new Date()).getTimezoneOffset() * -1

describe('tzOffset', () => {

  test('is a function', () => {
    expect(tzOffset).toBeInstanceOf(Function)
  })

  test('tzOffset(Z) throws', () => {
    expect(() => tzOffset('Z')).toThrow(TypeError)
  })

  // This one can’t be tested providing an exact value as the output depends on client timezone and daylight time saving.
  test('tzOffset() is the local timezone offset from UTC, in minutes', () => {
    expect(tzOffset()).toBe(tzOffset(0, tzOffsetInMinutes))
  })

  describe('in boundaries', () => {

    test('tzOffset(-23, -59)  is -23:59', () => {
      expect(tzOffset(-23, -59)).toBe('-23:59')
    })

    test('tzOffset(-9, -30)   is -09:30', () => {
      expect(tzOffset(-9, -30)).toBe('-09:30')
    })

    test('tzOffset(-9, 30)    is -08:30', () => {
      expect(tzOffset(-9, 30)).toBe('-08:30')
    })

    test('tzOffset(-8)        is -08:00', () => {
      expect(tzOffset(-8)).toBe('-08:00')
    })

    test('tzOffset(-4.5)      is -04:30', () => {
      expect(tzOffset(-4.5)).toBe('-04:30')
    })

    test('tzOffset(0, -30)    is -00:30', () => {
      expect(tzOffset(0, -30)).toBe('-00:30')
    })

    test('tzOffset(0)         is Z', () => {
      expect(tzOffset(0)).toBe('Z')
    })

    test('tzOffset(0, 30)     is +00:30', () => {
      expect(tzOffset(0, 30)).toBe('+00:30')
    })

    test('tzOffset(1)         is +01:00', () => {
      expect(tzOffset(1)).toBe('+01:00')
    })

    test('tzOffset(2, -200)   is -01:20', () => {
      expect(tzOffset(2, -200)).toBe('-01:20')
    })

    test('tzOffset(4, 30)     is +04:30', () => {
      expect(tzOffset(4, 30)).toBe('+04:30')
    })

    test('tzOffset(12, 45)    is +12:45', () => {
      expect(tzOffset(12, 45)).toBe('+12:45')
    })

    test('tzOffset(12.75)     is +12:45', () => {
      expect(tzOffset(12.75)).toBe('+12:45')
    })

    test('tzOffset(23, 59)    is +23:59', () => {
      expect(tzOffset(23, 59)).toBe('+23:59')
    })
  })

  describe('out of boundaries', () => {

    test('tzOffset(-24)            is Z', () => {
      expect(tzOffset(-24)).toBe('Z')
    })

    test('tzOffset(24)             is Z', () => {
      expect(tzOffset(24)).toBe('Z')
    })

    test('tzOffset(-24, 0, true)   is Z', () => {
      expect(tzOffset(-24, 0, true)).toBe('Z')
    })

    test('tzOffset(24, 0, true)    is Z', () => {
      expect(tzOffset(24, 0, true)).toBe('Z')
    })

    test('tzOffset(-24, -1)        is -00:01', () => {
      expect(tzOffset(-24, -1)).toBe('-00:01')
    })

    test('tzOffset(24, 1)          is 00:01', () => {
      expect(tzOffset(24, 1)).toBe('+00:01')
    })

    test('tzOffset(-35)            is -11:00', () => {
      expect(tzOffset(-35)).toBe('-11:00')
    })

    test('tzOffset(-35, 0, true)   is +13:00', () => {
      expect(tzOffset(-35, 0, true)).toBe('+13:00')
    })

    test('tzOffset(62.75)          is +14:45', () => {
      expect(tzOffset(62.75)).toBe('+14:45')
    })

    test('tzOffset(-12, 0, true)   is -12:00', () => {
      expect(tzOffset(-12, 0, true)).toBe('-12:00')
    })

    test('tzOffset(-12, -20, true) is +11:40', () => {
      expect(tzOffset(-12, -20, true)).toBe('+11:40')
    })

    test('tzOffset(-13, -20, true) is +10:40', () => {
      expect(tzOffset(-13, -20, true)).toBe('+10:40')
    })

    test('tzOffset(14, 45, true)   is -09:15', () => {
      expect(tzOffset(14, 45, true)).toBe('-09:15')
    })

    test('tzOffset(62.75, 0, true) is -09:15', () => {
      expect(tzOffset(62.75, 0, true)).toBe('-09:15')
    })
  })
})
