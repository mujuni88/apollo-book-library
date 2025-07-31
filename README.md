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



## Docker

The repository includes a `Dockerfile` that builds an image serving both the GraphQL server and the compiled React client.

### Build the image

```bash
docker build -t book-library .
```

### Run the container

```bash
docker run -p 3000:3000 -p 4000:4000 book-library
```

The server will be available on `http://localhost:4000` and the client on `http://localhost:3000`.

### Dockerfile explained

The Dockerfile uses a multi-stage build:

1. **Build stage** (`node:18`)
   - `COPY package*.json bun.lock turbo.json ./` – copy lock files and workspace config so dependencies can be installed.
   - `COPY apps ./apps` and `COPY packages ./packages` – copy all application and package source code.
   - `RUN npm install` – install dependencies for every workspace.
   - `RUN npm run build` – run `turbo run build` to generate `apps/client/dist` and `apps/server/dist`.
2. **Runtime stage** (`node:18-slim`)
   - `COPY apps/server/package*.json ./server/` – include only the server's manifest to install its runtime dependencies.
   - `RUN npm install --omit=dev --prefix ./server` – install production dependencies for the server.
   - `COPY --from=builder /app/apps/server/dist ./server/dist` and `COPY --from=builder /app/apps/client/dist ./client/dist` – copy built output from the first stage.
   - `RUN npm install -g serve` – install the small `serve` tool to host the static client build.
   - `COPY start.sh .` – add a helper script that starts both processes.
   - `EXPOSE 4000 3000` – document the ports used by the server and client.
   - `CMD ["./start.sh"]` – run the start script when the container starts.
