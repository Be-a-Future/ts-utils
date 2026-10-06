# @bafx/utils

Small, typed TypeScript utilities for functional-style code: array helpers, timezone-aware date helpers, `pipe` / `compose` / `curry`, an `Either` type for error handling, type guards, and a few general helpers.

- Written in TypeScript and ships with type declarations
- Compiled to CommonJS (ES2017 target)
- Most helpers are curried and take the data last, so they work well with `pipe`

## Installation

```bash
npm install @bafx/utils
```

Requires Node.js 26.10 or newer.

## Quick start

Everything is exported from the package root:

```ts
import { pipe, trim, lower, filter, map, propEq, prop } from '@bafx/utils';

const name = pipe('  HELLO  ', trim, lower);
// "hello"

type User = { name: string; status: string };
const users: User[] = [
  { name: 'Ann', status: 'active' },
  { name: 'Bob', status: 'disabled' },
];

const activeNames = pipe(users, filter(propEq<User, string>('status', 'active')), map(prop<User>('name')));
// ["Ann"]
```

## Table of contents

- [Functional programming](#functional-programming): `pipe`, `compose`, `curry`
- [Either](#either): `Left`, `Right`, `isLeft`, `isRight`, `either`, `whenRight`, `tryCatch`
- [Arrays](#arrays)
- [Dates](#dates)
- [Objects and properties](#objects-and-properties)
- [Type guards](#type-guards)
- [General helpers](#general-helpers)
- [Types](#types)
- [Testing helper](#testing-helper)

## Functional programming

### `pipe(value, ...fns)`

Passes a value through functions from left to right. Accepts up to 11 functions.

```ts
import { pipe } from '@bafx/utils';

pipe(
  5,
  (n) => n * 2,
  (n) => `${n}!`,
);
// "10!"
```

### `compose(...fns)`

Builds a function that applies `fns` from right to left. If any function returns a Promise, the next function receives the resolved value and the result is a Promise.

```ts
import { compose } from '@bafx/utils';

const shout = compose(
  (s: string) => `${s}!`,
  (s: string) => s.toUpperCase(),
);
shout('hi');
// "HI!"
```

### `curry(fn)`

Lets a function be called with all of its arguments at once or one group at a time.

```ts
import { curry } from '@bafx/utils';

const add = curry((a: number, b: number, c: number) => a + b + c);

add(1, 2, 3); // 6
add(1)(2)(3); // 6
add(1, 2)(3); // 6
```

`curry` counts arguments with `fn.length`, so the function must not use default or rest parameters. The returned function is loosely typed. The helpers in this package declare overloaded signatures to keep both forms typed:

```ts
type Add = {
  (a: number, b: number): number;
  (a: number): (b: number) => number;
};
const add: Add = curry((a: number, b: number) => a + b);
```

## Either

`Either<L, R>` holds either a `Left` (usually an error) or a `Right` (a successful value). `Maybe<T>` is a shorthand for `Either<Error, T>`.

```ts
import { Left, Right, isLeft, isRight, Either } from '@bafx/utils';

const parsePositive = (n: number): Either<string, number> => (n > 0 ? Right(n) : Left('not positive'));

const result = parsePositive(3);
if (isRight(result)) {
  result.value; // 3 (typed as number)
}
isLeft(parsePositive(-1)); // true
```

### `either(onLeft, onRight, value)`

Handles both cases and returns the result of the matching function.

```ts
import { either, Left, Right } from '@bafx/utils';

either(
  (error: string) => `Error: ${error}`,
  (n: number) => `Value: ${n}`,
  Right(42),
);
// "Value: 42"
```

### `whenRight(fn)`

Wraps `fn` so it runs only on a `Right`. A `Left` passes through unchanged. Accepts an `Either` or a Promise of one and always returns a Promise, which makes it useful for chaining async steps.

```ts
import { whenRight, Left, Right } from '@bafx/utils';

const double = whenRight((value: number) => value * 2);

await double(Right(21)); // 42
await double(Left(new Error('failed'))); // Left(Error('failed'))
```

### `tryCatch(asyncFn)`

Runs an async function and returns `Right(result)`, or `Left(error)` if it throws.

```ts
import { tryCatch, isLeft } from '@bafx/utils';

const result = await tryCatch(() => fetch('https://example.com').then((r) => r.json()));

if (isLeft(result)) {
  console.error(result.value.message);
}
```

### Chaining example

```ts
import { compose, whenRight, prop, Left, Right, Maybe } from '@bafx/utils';

const login = (ok: boolean): Maybe<{ authToken: string }> => (ok ? Right({ authToken: 'abc' }) : Left(new Error('Authentication error')));

const getProfile = async (token: string): Promise<Maybe<{ username: string }>> => Right({ username: `user-${token}` });

const getUsername = async (ok: boolean) => {
  const profile = await whenRight(compose(getProfile, prop<{ authToken: string }>('authToken')))(login(ok));
  return whenRight(prop<{ username: string }>('username'))(profile);
};

await getUsername(true); // "user-abc"
await getUsername(false); // Left(Error('Authentication error'))
```

## Arrays

| Function                             | Description                                                                       |
| ------------------------------------ | --------------------------------------------------------------------------------- |
| `head(array?)`                       | First element, or `undefined`                                                     |
| `last(array)`                        | Last element, or `undefined`                                                      |
| `tail(array = [])`                   | All elements except the first                                                     |
| `cutHead(array)`                     | `{ head, tail }`                                                                  |
| `splitAt(index, array)`              | `[before, from]`, splitting at `index` (does not mutate)                          |
| `length(array)`                      | Array length                                                                      |
| `isArray(value)`                     | Type guard for arrays                                                             |
| `isEmpty(array)`                     | `true` if the array has no elements                                               |
| `isEmptyOptional(array)`             | `true` if the array is `null`, `undefined`, or contains only `null` / `undefined` |
| `isLast(index, array)`               | `true` if `index` is the last index                                               |
| `toArray(value)`                     | Wraps a single value in an array; returns arrays unchanged                        |
| `uniqueBy(array, keyFn)`             | Removes duplicates by key and keeps the first occurrence                          |
| `groupBy(array, keyFn)`              | Groups into a `Map<key, items[]>`                                                 |
| `groupByAndMap(array, keyFn, mapFn)` | Groups, then maps each group: `Map<key, mapFn(items)>`                            |
| `transformMap(map, fn)`              | Maps the values of a `Map` and keeps the keys                                     |
| `map(fn, array)`                     | Curried `Array.prototype.map`                                                     |
| `filter(fn, array)`                  | Curried `Array.prototype.filter`                                                  |
| `find(fn, array)`                    | Curried `Array.prototype.find`                                                    |
| `remove(value, array)`               | Curried; removes all elements strictly equal to `value`                           |
| `concat(a, b)`                       | Curried `a.concat(b)`                                                             |
| `prepend(value, array)`              | Curried; returns `[value, ...array]`                                              |

```ts
import { head, last, tail, splitAt, uniqueBy, groupBy, groupByAndMap, toArray, isEmptyOptional } from '@bafx/utils';

head([1, 2, 3]); // 1
last([1, 2, 3]); // 3
tail([1, 2, 3]); // [2, 3]
splitAt(2, [1, 2, 3, 4]); // [[1, 2], [3, 4]]
toArray('a'); // ["a"]
isEmptyOptional([null, undefined]); // true

const items = [
  { id: 1, type: 'fruit', name: 'apple' },
  { id: 2, type: 'fruit', name: 'pear' },
  { id: 3, type: 'vegetable', name: 'carrot' },
];

uniqueBy(items, (i) => i.type).map((i) => i.name);
// ["apple", "carrot"]

groupBy(items, (i) => i.type);
// Map { "fruit" => [apple, pear], "vegetable" => [carrot] }

groupByAndMap(
  items,
  (i) => i.type,
  (group) => group.length,
);
// Map { "fruit" => 2, "vegetable" => 1 }
```

The curried helpers can be called with all arguments or partially applied:

```ts
import { pipe, map, filter, remove, prepend, find } from '@bafx/utils';

map((n: number) => n * 2, [1, 2, 3]); // [2, 4, 6]

pipe(
  [1, 2, 3, 2],
  remove(2),
  prepend(0),
  filter((n: number) => n < 3),
);
// [0, 1]

find((n: number) => n > 1)([1, 2, 3]); // 2
```

## Dates

The date helpers use [luxon](https://moment.github.io/luxon/). Functions that depend on a calendar day take an explicit IANA timezone such as `'Europe/Prague'` or `'America/New_York'`, so results don't depend on the server's timezone. All functions return plain JavaScript `Date` objects or strings.

### Formatting

```ts
import { toReadable, toReadableDate, toDateString, toReadableShortened, toISOStringWithOffset } from '@bafx/utils';

const date = new Date('2024-03-05T09:07:00Z');

toReadable('Europe/Prague', date); // "5.3.2024 10:07"
toReadableDate('Europe/Prague', date); // "5.3.2024"
toDateString('Europe/Prague', date); // "2024-3-5"
toISOStringWithOffset('Europe/Prague', date); // "2024-03-05T10:07:00+01:00"

toReadableShortened('Europe/Prague', date); // "5."
toReadableShortened('Europe/Prague', new Date('2024-03-01T12:00:00Z')); // "1.3." (month is shown on the 1st)
```

### Parsing and conversion

```ts
import { parseDate, toDate, isValidDate, toSeconds, toMilliSeconds, dateToTimestamp, secondsToDate, getNow } from '@bafx/utils';

// Format tokens: https://moment.github.io/luxon/#/parsing?id=table-of-tokens
parseDate('05.03.2024 10:07', 'dd.MM.yyyy HH:mm', 'Europe/Prague');
// 2024-03-05T09:07:00.000Z

toDate('2024-03-05T09:07:00Z'); // Date
isValidDate('2024-03-05'); // true
isValidDate('not a date'); // false

toSeconds(1_700_000_123_456); // 1700000123 (from milliseconds)
toSeconds(new Date('2024-03-05T09:07:00Z')); // 1709629620
dateToTimestamp(new Date('2024-03-05T09:07:00Z')); // 1709629620
toMilliSeconds(60); // 60000
secondsToDate(1709629620); // 2024-03-05T09:07:00.000Z

getNow(); // current time as a Date
```

### Arithmetic and ranges

```ts
import {
  addSeconds,
  addDays,
  addDay,
  startOfToday,
  endOfToday,
  startOfLastWeek,
  startOfXDaysBefore,
  startOfXWeeksBefore,
  startOfXMonthsBefore,
  startOfXTimeUnitsBefore,
  getMonthsArray,
} from '@bafx/utils';

const tz = 'Europe/Prague';
const date = new Date('2024-03-30T12:00:00Z');

addSeconds(90, tz, date); // 2024-03-30T12:01:30.000Z
addDays(2, tz, date); // 2024-04-01T11:00:00.000Z (same local time; DST started on 31 March)
addDay(tz, date); // 2024-03-31T11:00:00.000Z

startOfToday(tz); // today 00:00 in Prague
endOfToday(tz); // today 23:59:59.999 in Prague
startOfLastWeek(tz); // 00:00, 7 days ago
startOfXDaysBefore(tz, 3); // 00:00, 3 days ago
startOfXWeeksBefore(tz, 2); // 00:00, 2 weeks ago
startOfXMonthsBefore(tz, 1); // 00:00, 1 month ago
startOfXTimeUnitsBefore(tz, 2, 'weeks'); // 'days' | 'weeks' | anything else is treated as months
```

`getMonthsArray(start, end)` starts at midnight on the earlier date and adds one month at a time. It keeps going while the date is earlier than `end` plus one month, so the result usually includes the month after `end` as well. The order of the arguments does not matter. This function always uses the `Europe/Prague` timezone.

```ts
getMonthsArray(new Date('2024-04-02T10:00:00Z'), new Date('2024-06-03T10:00:00Z'));
// [2.4.2024, 2.5.2024, 2.6.2024, 2.7.2024] (00:00 Prague time)

getMonthsArray(new Date('2024-04-02T10:00:00Z'), new Date('2024-06-01T10:00:00Z'));
// [2.4.2024, 2.5.2024, 2.6.2024]
```

### Other

- `withTimezone(timeZone)(date)` returns a `Date` whose local fields (hours, day, ...) show the wall-clock time in `timeZone`. Prefer the formatting functions above when you can.
- `toStringDateTime(date)` is **deprecated**. It formats using the process timezone. Use `toReadable` instead.

## Objects and properties

```ts
import { prop, propEq, isObjectEmpty, parseJson } from '@bafx/utils';

type User = { name: string; role: string };
const user: User = { name: 'Ann', role: 'admin' };

prop('name', user); // "Ann"
prop<User>('name')(user); // "Ann"

propEq('role', 'admin', user); // true
propEq<User, string>('role', 'admin')(user); // true
propEq<User, string>('role')('admin')(user); // true

isObjectEmpty({}); // true

parseJson<{ a: number }>('{"a":1}'); // { a: 1 }
parseJson('{invalid'); // undefined (does not throw)
```

## Type guards

```ts
import { isNumber, isString, isTruthy, isAnyArray, isNumberArray, isStringArray, TypeGuard } from '@bafx/utils';

isNumber(1); // true
isNumber(NaN); // false
isString('a'); // true
isTruthy(0); // false
isTruthy('x'); // true

isNumberArray([1, 2, 3]); // true
isStringArray(['a', 1]); // false

// Build an array guard from any element guard
const isBoolean: TypeGuard<boolean> = (v: unknown): v is boolean => typeof v === 'boolean';
const isBooleanArray = isAnyArray(isBoolean);
isBooleanArray([true, false]); // true
```

## General helpers

```ts
import { is, not, bool, equals, notEqual, modulo, isOdd, pad, trim, lower, alwaysTrue, delay } from '@bafx/utils';

is(0); // true  (only null and undefined are false)
is(null); // false
not(''); // true
bool('text'); // true

equals(1, 1); // true (strict ===)
equals(1)(2); // false
notEqual('a')('b'); // true

modulo(3, 10); // 1  (divisor first: 10 % 3)
modulo(2)(7); // 1
isOdd(3); // true

pad(5); // "05"
pad(12); // "12"
trim('  a  '); // "a"
lower('ABC'); // "abc"

alwaysTrue(); // true
await delay(500); // waits 500 ms
```

`is` is a type guard, which makes it useful for filtering out empty values:

```ts
const values = [1, null, 2, undefined].filter(is); // number[]: [1, 2]
```

## Types

| Type                               | Definition                       |
| ---------------------------------- | -------------------------------- |
| `Optional<T>`                      | `T \| undefined`                 |
| `Nullable<T>`                      | `T \| null`                      |
| `ValueOf<T>`                       | `T[keyof T]`                     |
| `Either<L, R>`                     | `Left<L> \| Right<R>`            |
| `Maybe<T>`                         | `Either<Error, T>`               |
| `TypeGuard<T>`                     | `(value: unknown) => value is T` |
| `PartialTypeGuard<T, U extends T>` | `(value: T) => value is U`       |

## Testing helper

Jest has not had a built-in `fail()` since v27. `failTest(message)` throws an error to fail a test and is typed as `never`, so TypeScript narrows types after it:

```ts
import { failTest, isRight, tryCatch } from '@bafx/utils';

it('loads data', async () => {
  const result = await tryCatch(loadData);
  if (!isRight(result)) {
    return failTest('expected data');
  }
  expect(result.value).toBeDefined(); // result is narrowed to Right here
});
```

It throws, so don't call it inside a `try` block that catches the error.

## Development

```bash
npm install
npm test                                     # run all tests
npx jest src/utils/__tests__/prop.spec.ts    # run one test file
npm run lint                                 # ESLint check
npm run lint:fix                             # ESLint with auto-fix
npm run build                                # compile to build/ and generate API docs into docs/
npm run check                                # lint + build + test
```

Tests live next to the sources in `src/**/__tests__` and run with `TZ=Etc/UTC`.

## License

[MIT](LICENSE)
