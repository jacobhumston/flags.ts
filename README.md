# flag.ts

A simple and easy to use TypeScript based package for creating and using command-line flags.

```bash
npm install flags.ts
# bun install flags.ts
# deno install npm:flags.ts
```

Docs: [https://flags.lovely.sh](https://flags.lovely.sh).

## Example

```bash
bun run src/example.ts -p 80 --name "example message"
```

```ts
import { FlagParser } from 'flags.ts';

const flagParser = new FlagParser([
    { name: 'port', type: 'number', short: ['p'], required: true },
    { name: 'url', type: 'url' },
    { name: 'name', type: 'string' }
] as const);

const parsedFlags = flagParser.parse();
console.log(parsedFlags);

/*
    Result:
    {
        port: 1,
        url: undefined,
        name: "example name",
    }
*/
```

You can also pass your own args if needed.

```ts
/* 
    Note: When an array is provided, the parser will not remove the first two 
    items of the array like it does when using the default `process.argv`.
*/
const parsedFlags = flagParser.parse(['--example', '1', '-m', '"hello', 'world"']);
```

## Purpose & Design

flags.ts is meant to be an extremely simple and easy to use library. The code behind it is pretty simple as well, which allows forks and modifications to be made rather easily.

As of writing it supports `string`, `boolean`, `number`, and `url`. All you need is a name and a type; descriptions and etc are optional.

The way flags are written with this package are meant to be easily readable, however it includes support for aliases/short versions.

| Type      | Format                            |
| --------- | --------------------------------- |
| `string`  | `--flag [string/"spaced string"]` |
| `boolean` | `--flag <false/off/no>`           |
| `number`  | `--flag [number]`                 |
| `url`     | `--flag [url]`                    |
