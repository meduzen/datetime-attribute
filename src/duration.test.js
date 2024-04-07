import { describe, expect, test } from 'vitest'

import { duration } from './index.js'

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
