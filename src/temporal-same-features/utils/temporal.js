import { Temporal } from '@js-temporal/polyfill'
// import { Temporal } from 'temporal-polyfill'

// Date.prototype.toTemporalInstant = toTemporalInstant

export const dateToPlainDate = d => new Temporal.PlainDate(d.getFullYear(), d.getMonth() + 1, d.getDate())

/** @todo check https://tc39.es/proposal-temporal/docs/cookbook.html#date-only-values-legacy-date--temporalplaindate */
// export const dateToPlainDate = d => d.toTemporalInstant().toZonedDateTimeISO(Temporal.Now.timeZoneId()).toPlainDate()
