import { describe, expect, test } from 'vitest'

import { datetimeTz, tzOffset, setTzSeparator } from '../index.js'

import { setTzConfig } from './tz.js'

const togoIndependanceDay = new Date(1960, 3, 27)
const date = togoIndependanceDay // alias for the sake of brevity

describe('setTzSeparator', () => {
  test('is a function', () => expect(setTzSeparator).toBeInstanceOf(Function))
  test('throws with invalid separator', () => expect(() => setTzSeparator(42)).toThrow(Error))

  test('no timezone separator', () => {
    setTzSeparator()
    expect(tzOffset(3)).toBe('+0300')
  })

  test('empty string timezone separator', () => {
    setTzSeparator('')
    expect(tzOffset(3)).toBe('+0300')
  })

  test(': as timezone separator', () => {
    setTzSeparator(':')
    expect(tzOffset(3)).toBe('+03:00')
  })

  test('empty string timezone separator with datetimeTz', () => {
    setTzSeparator('')
    expect(datetimeTz(date, 'datetime second', -6)).toBe('1960-04-27T00:00:00-0600')
  })
})

describe('setTzConfig', () => {
  test('is a function', () => expect(setTzConfig).toBeInstanceOf(Function))
  test('throws without parameter', () => expect(() => setTzConfig()).toThrow(TypeError))
  test('throws without proper parameter', () => expect(() => setTzConfig({})).toThrow(Error))
  test('throws with invalid separator', () => expect(() => setTzConfig({ separator: 42 })).toThrow(Error))

  test('empty string timezone separator using tzOffset', () => {
    setTzConfig({ separator: '' })
    expect(tzOffset(3)).toBe('+0300')
  })

  test(': as timezone separator using tzOffset', () => {
    setTzConfig({ separator: ':' })
    expect(tzOffset(3)).toBe('+03:00')
  })

  test(': as timezone separator with datetimeTz', () => {
    setTzConfig({ separator: ':' })
    expect(datetimeTz(date, 'datetime second', -6)).toBe('1960-04-27T00:00:00-06:00')
  })
})
