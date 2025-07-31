# Apollo Book Library

A monorepo demonstrating a simple book library built with **Apollo** and **React**. The project is managed with **Turborepo** and uses **Bun** as the package manager.

![Screenshot of the library](assets/app.png)

## Repository structure

```
apps/
  client/  - React + Vite front‑end
  server/  - Apollo GraphQL server
  docs/    - Documentation site built with Next.js
packages/
  eslint-config-custom/ - shared ESLint rules
  tailwind-config/      - shared Tailwind setup
  tsconfig/             - shared TypeScript configs
```

## Getting started

1. Install dependencies
   ```bash
   bun install
   ```
2. Start all apps in development mode
   ```bash
   bun dev
   ```

### Useful scripts

- `bun build` – build every app and package
- `bun lint`  – run ESLint across the workspace
- `bun format` – format files with Prettier

Each application can also be run individually using `bun run --filter=<app> <script>`.

## Tech stack

- **React**, **React Router**, **Tailwind CSS**, **Headless UI**, **Radix UI**
- **Apollo Client** on the frontend and **Apollo Server** with an in-memory LRU cache on the backend
- **Next.js** and **Nextra** for the documentation site
- Entirely written in **TypeScript**

## Building

Create optimized builds for every package:

```bash
bun build
```

The output of each task is cached by Turborepo for faster subsequent runs.


