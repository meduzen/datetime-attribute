import { beforeEach, describe, expect, test } from 'vitest'

import { datetimeTz, tzOffset, setTzConfig, setTzInRealWorldRange, setTzSeparator } from '../index.js'
import { tzConfig } from './tz.js'

const togoIndependanceDay = new Date(1960, 3, 27)
const date = togoIndependanceDay // alias for the sake of brevity

// Reset default config between each test.
const defaultConfig = { ...tzConfig }
beforeEach(() => setTzConfig(defaultConfig))

describe('setTzSeparator', () => {
  test('is a function', () => expect(setTzSeparator).toBeInstanceOf(Function))

  test('throws with invalid separator', () => {
    expect(() => setTzSeparator(42)).toThrow(Error)
  })

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

describe('setTzInRealWorldRange', () => {
  test('is a function', () => expect(setTzInRealWorldRange).toBeInstanceOf(Function))
  test('throws with invalid value', () => expect(() => setTzInRealWorldRange(42)).toThrow(Error))

  test('default value disables real-world range', () => {
    expect(tzOffset(20)).toBe('+20:00')
    setTzInRealWorldRange()
    expect(tzOffset(20)).toBe('+20:00')
  })

  test('enable real-world range', () => {
    expect(tzOffset(20)).toBe('+20:00')
    setTzInRealWorldRange(true)
    expect(tzOffset(20)).toBe('-04:00')
  })

  test('disable real-world range', () => {
    setTzInRealWorldRange(false)
    expect(tzOffset(20)).toBe('+20:00')
  })

  test('enable real-world range with datetimeTz', () => {
    setTzInRealWorldRange(true)
    expect(datetimeTz(date, 'datetime second', 20)).toBe('1960-04-27T00:00:00-04:00')
  })
})

describe('setTzConfig', () => {

  describe('general', () => {
    test('is a function', () => expect(setTzConfig).toBeInstanceOf(Function))

    test('reset the default config without parameter', () => {
      setTzConfig({ separator: '', inRealWorldRange: true })
      expect(tzOffset(20)).toBe('-0400')

      setTzConfig()
      expect(tzOffset(20)).toBe('+20:00')
    })
  })

  describe('timezone separator', () => {
    test('throws with invalid separator', () => expect(() => setTzConfig({ separator: 42 })).toThrow(Error))

    test('empty string separator using tzOffset', () => {
      setTzConfig({ separator: '' })
      expect(tzOffset(3)).toBe('+0300')
    })

    test(': as separator using tzOffset', () => {
      setTzConfig({ separator: ':' })
      expect(tzOffset(3)).toBe('+03:00')
    })

    test(': as separator with datetimeTz', () => {
      setTzConfig({ separator: ':' })
      expect(datetimeTz(date, 'datetime second', -6)).toBe('1960-04-27T00:00:00-06:00')
    })
  })

  describe('real-world boundaries', () => {
    test('throws with invalid value', () => expect(() => setTzConfig({ inRealWorldRange: 42 })).toThrow(Error))

    test('inside boundaries using tzOffset', () => {
      setTzConfig({ inRealWorldRange: true })
      expect(tzOffset(20)).toBe('-04:00')
    })

    test('outside boundaries using tzOffset', () => {
      setTzConfig({ inRealWorldRange: false })
      expect(tzOffset(20)).toBe('+20:00')
    })

    test('inside boundaries using datetimeTz', () => {
      setTzConfig({ inRealWorldRange: true })
      expect(datetimeTz(date, 'datetime second', 20)).toBe('1960-04-27T00:00:00-04:00')
    })

    test('outside boundaries using datetimeTz', () => {
      setTzConfig({ inRealWorldRange: false })
      expect(datetimeTz(date, 'datetime second', 20)).toBe('1960-04-27T00:00:00+20:00')
    })
  })
})
