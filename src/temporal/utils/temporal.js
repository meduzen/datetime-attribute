import { Temporal } from '@js-temporal/polyfill'

export const dateToPlainDate = d => new Temporal.PlainDate(d.getFullYear(), d.getMonth() + 1, d.getDate())
