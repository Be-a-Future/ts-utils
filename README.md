# Utils

Shared TypeScript utilities used across the BaF platform.

## What is included

- Array helpers such as `head`, `tail`, `groupBy`, `map`, and `filter`
- Date helpers built on `luxon`
- Functional helpers such as `compose`, `pipe`, and `curry`
- Either helpers for `Left` / `Right` style error handling
- Type guards and common utility functions

## Installation

This package is intended to be consumed from the monorepo workspace.

```bash
yarn add @bafx/utils
```

## Usage

```ts
import { pipe, trim, lower, toReadable } from '@bafx/utils';

const value = pipe('  HELLO  ', trim, lower);
// "hello"
```

```ts
import { addDay, toReadableDate } from '@bafx/utils';

const nextDay = addDay('Europe/Prague', new Date());
const label = toReadableDate('Europe/Prague', nextDay);
```

```ts
import { Left, Right, whenRight } from '@bafx/utils';

const getValue = whenRight((value: number) => value * 2);

await getValue(Right(21));
await getValue(Left(new Error('failed')));
```

## Scripts

- `npm run test` runs the Jest test suite
- `npm run testWithCoverage` runs tests with coverage output
- `npm run build:code` compiles the TypeScript sources
- `npm run build:docs` generates API documentation
- `npm run build` runs both build steps

## Notes

- The package entry point re-exports modules from `array`, `date`, `either`, `functional-programming`, `typeHelpers`, and `utils`
- Date helpers expect an explicit timezone when a function needs one
- The public API is covered by unit tests in `src/**/__tests__`
