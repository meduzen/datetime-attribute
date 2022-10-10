import { expectAssignable, expectError, expectType } from 'tsd'
import { DurationObject } from './duration'
import { TimezoneOptions, setTzConfig } from './config/tz'
import { DateTimeOptions, setConfig } from './config/datetime'
import {
  DateTime,
  datetime,
  utc,
  datetimeTz,
  duration,
  tzOffset,
  daysBetween,
  weekNumber,
  setTimeSeparator,
  setTzSeparator,
} from '.'

const togoIndependanceDay = new Date(1960, 3, 27)
const date = togoIndependanceDay // alias for the sake of brevity
const january11th = new Date(2021, 0, 11, 10, 10, 12)

// datetime and utc

expectError(() => datetime(123))
expectType<string>(datetime())
expectType<string>(datetime(date))
expectType<string>(datetime(date, 'time'))
expectError(datetime(date, 'unsupported precision'))

expectError(() => utc(123))
expectType<string>(utc())
expectType<string>(utc(date))
expectType<string>(utc(date, 'time'))
expectError(utc(date, 'unsupported precision'))

// setTimeSeparator and setConfig

expectType<DateTimeOptions>(setTimeSeparator('T'))
expectType<DateTimeOptions>(setTimeSeparator(' '))
expectType<DateTimeOptions>(setTimeSeparator())
expectError(() => setTimeSeparator(123))

expectType<DateTimeOptions>(setConfig({ separator: 'T' }))
expectType<DateTimeOptions>(setConfig({ separator: ' ' }))
expectError(() => setConfig({ separator: 123 }))

// duration

const emptyDurationObject = {}
const durationObject = { w: 3, d: 5, h: 10, m: 43, s: 2.61 }
const durationWithTooHighValues = { w: 3, d: 19, h: 36, m: 53, s: 175.3 }
const durationInHours = { h: 17 }
const durationInDays = { d: 43 }

expectAssignable<DurationObject>(emptyDurationObject)
expectAssignable<DurationObject>(durationObject)
expectAssignable<DurationObject>(durationWithTooHighValues)
expectAssignable<DurationObject>(durationInHours)
expectAssignable<DurationObject>(durationInDays)

expectType<string>(duration())
expectType<string>(duration(emptyDurationObject))
expectType<string>(duration({}))
expectType<string>(duration({}, false))
expectType<string>(duration(durationObject))
expectType<string>(duration(durationObject, false))
expectType<string>(duration(durationWithTooHighValues))
expectType<string>(duration(durationWithTooHighValues, false))
expectType<string>(duration(durationInHours))
expectType<string>(duration(durationInHours, false))
expectType<string>(duration(durationInDays))
expectType<string>(duration(durationInDays, false))
expectError(duration(null))

// tzOffset

expectType<string>(tzOffset())
expectType<string>(tzOffset(0))
expectType<string>(tzOffset(0, -30))
expectType<string>(tzOffset(-12, 0, true))
expectError(() => tzOffset('Z'))

// datetimeTz

expectType<string>(datetimeTz())
expectType<string>(datetimeTz(date))
expectType<string>(datetimeTz(date, 'time'))
expectType<string>(datetimeTz(date, 'time', 0))
expectType<string>(datetimeTz(date, 'datetime', 12, 45))
expectType<string>(datetimeTz(date, 'datetime', 17, 30, true))
expectError(() => datetimeTz(123))

// setTzSeparator and setTzConfig

expectType<TimezoneOptions>(setTzSeparator(':'))
expectType<TimezoneOptions>(setTzSeparator(''))
expectType<TimezoneOptions>(setTzSeparator())
expectError(() => setTzSeparator(123))

expectType<TimezoneOptions>(setTzConfig({ separator: ':' }))
expectType<TimezoneOptions>(setTzConfig({ separator: '' }))
expectError(() => setTzConfig({ separator: 123 }))

// weekNumber, daysBetween

expectType<number>(weekNumber(date))
expectType<number>(daysBetween(date, january11th))

// DateTime class

const summer = new DateTime(2021, 5, 21)

expectType<DateTime>(summer)
expectType<number>(summer.getWeek())
expectType<number>(summer.setWeek(26))
expectType<string>(summer.to('year'))
expectError(() => summer.to('unsupported precision'))
