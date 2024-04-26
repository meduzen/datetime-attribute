> [!INFO]  
>
> Work in progress document. Very drafty.

## Parity between `Date` and `Temporal` implementations

function | in `Date` | in `Temporal` | note
---|---|---|---
`tzOffset` | yes | yes | @todo accept a `Temporal.TimeZone` (or any temporal) and output its “real-world” timezone.
`datetime` | yes | yes | @todo evaluate
`utc` | yes | yes | @todo evaluate
`datetimeTz` | yes | yes | @todo evaluate
`DateTime` | yes | yes | @todo evaluate
`duration` | yes | yes | @todo evaluate
`daysBetween` | yes | yes | @todo evaluate
`weekNumber` | yes | yes | @todo evaluate
(config feature…)| yes | yes | @todo evaluate
