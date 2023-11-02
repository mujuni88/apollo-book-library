# Apollo Book Library

This is an app that displays a library of books. The goal is to use it to practice how to use Apollo Client

## Using this example

Run the following command to start:

```
bun install && bun dev
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `client`: the UI for the library app lives here
- `server`: the Apollo server lives here
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
bun build
```

### Develop

To develop all apps and packages, run the following command:

```
bun dev
```