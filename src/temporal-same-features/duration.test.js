import { describe, expect, test } from 'vitest'

import { duration } from './index.js'

describe('duration', () => {
  const durationObject = { w: 3, d: 5, h: 10, m: 43, s: 2.61 }
  const durationWithTooHighValues = { w: 3, d: 19, h: 36, m: 53, s: 175.3 }
  const durationInHours = { h: 17 }
  const durationInDays = { d: 43 }

  test('is a function', () => {
    expect(duration).toBeInstanceOf(Function)
  })

  test('duration(null) throws', () => {
    expect(() => duration(null)).toThrow(Error)
  })

  describe('empty or missing object', () => {

    test('duration()', () => {
      expect(duration()).toBe('PT0S')
    })

    test('duration({})        is PT0S', () => {
      expect(duration({})).toBe('PT0S')
    })

    test('duration({}, true)  is PT0S', () => {
      expect(duration({}, true)).toBe('PT0S')
    })

    test('duration({}, false) is PT0S', () => {
      expect(duration({}, false)).toBe('PT0S')
    })
  })

  describe('complete object', () => {

    test('{ w: 3, d: 5, h: 10, m: 43, s: 2.61 } is P3W5DT10H43M2.61S', () => {
      expect(duration(durationObject)).toBe('P3W5DT10H43M2.61S')
    })

    test('with too high values', () => {
      expect(duration(durationWithTooHighValues)).toBe('P5W6DT12H55M55.3S')
    })
  })

  describe('partial object', () => {

    test('hours only', () => {
      expect(duration(durationInHours)).toBe('PT17H')
    })

    test('days only', () => {
      expect(duration(durationInDays)).toBe('P6W1D')
    })

  })

  describe('conversion of excess values', () => {

    test('is enabled by default', () => {
      expect(duration(durationWithTooHighValues)).toBe(duration(durationWithTooHighValues, true))
    })

    test('disabled: full object without excess', () => {
      expect(duration(durationObject, false)).toBe('P3W5DT10H43M2.61S')
    })

    test('disabled: full object with excess', () => {
      expect(duration(durationWithTooHighValues, false)).toBe('P3W19DT36H53M175.3S')
    })

    test('disabled: partial object without excess', () => {
      expect(duration(durationInHours, false)).toBe('PT17H')
    })

    test('disabled: partial object with excess', () => {
      expect(duration(durationInDays, false)).toBe('P43D')
    })

    test('enabled: full object without excess', () => {
      expect(duration(durationObject, true)).toBe('P3W5DT10H43M2.61S')
    })

    test('enabled: full object with excess', () => {
      expect(duration(durationWithTooHighValues, true)).toBe('P5W6DT12H55M55.3S')
    })

    test('enabled: partial object without excess', () => {
      expect(duration(durationInHours, true)).toBe('PT17H')
    })

    test('enabled: partial object with excess', () => {
      expect(duration(durationInDays, true)).toBe('P6W1D')
    })
  })
})
