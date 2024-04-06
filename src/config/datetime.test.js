import { describe, expect, test } from 'vitest'

import { datetime, setTimeSeparator } from '../index.js'

import { setConfig } from './datetime.js'

const togoIndependanceDay = new Date(1960, 3, 27)
const date = togoIndependanceDay // alias for the sake of brevity

describe('setTimeSeparator', () => {
  test('is a function', () => expect(setTimeSeparator).toBeInstanceOf(Function))
  test('throws with invalid separator', () => expect(() => setTimeSeparator(42)).toThrow(Error))

  test('no time separator', () => {
    setTimeSeparator()
    expect(datetime(date, 'datetime')).toBe('1960-04-27T00:00')
  })

  test('T as time separator', () => {
    setTimeSeparator('T')
    expect(datetime(date, 'datetime')).toBe('1960-04-27T00:00')
  })

  test('space as time separator', () => {
    setTimeSeparator(' ')
    expect(datetime(date, 'datetime')).toBe('1960-04-27 00:00')
  })

})

describe('setConfig', () => {
  test('is a function', () => expect(setConfig).toBeInstanceOf(Function))
  test('throws without parameter', () => expect(() => setConfig()).toThrow(TypeError))
  test('throws without proper parameter', () => expect(() => setConfig({})).toThrow(Error))
  test('throws with invalid separator', () => expect(() => setConfig({ separator: 42 })).toThrow(Error))

  test('T as time separator using datetime', () => {
    setConfig({ separator: 'T' })
    expect(datetime(date, 'datetime')).toBe('1960-04-27T00:00')
  })

  test('space as time separator using datetime', () => {
    setConfig({ separator: ' ' })
    expect(datetime(date, 'datetime')).toBe('1960-04-27 00:00')
  })
})
