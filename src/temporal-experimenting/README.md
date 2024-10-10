> [!INFO]  
>
> Work in progress document. Very drafty.

This folder will contain the implementation of `datetime-attribute` where functions will accept [`Temporal`](https://tc39.es/proposal-temporal/docs) objects while keeping current parameters.

It’s possible that some functions will not require to accept a `Temporal` object because what they accomplish is maybe already available as a `Temporal.{className}` feature.

It’s also possible that new functions are created to facilitate the usage of `Temporal` objects, and the extended scope they cover in comparison with `Date`.

## Parity between `Date` and `Temporal` implementations

**Drafty.**

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

## `tzOffset` notes

```js
const tz = new Temporal.TimeZone('-23:59')
console.log(tz.id) // -23:59
```
