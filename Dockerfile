# -------- Build stage --------
FROM node:18 AS builder
WORKDIR /app

# Install dependencies and build all workspaces
COPY package*.json bun.lock turbo.json ./
COPY apps ./apps
COPY packages ./packages
RUN npm install
RUN npm run build

# -------- Runtime stage --------
FROM node:18-slim
WORKDIR /app

# Install server runtime dependencies only
COPY apps/server/package*.json ./server/
RUN npm install --omit=dev --prefix ./server

# Copy compiled server and built client
COPY --from=builder /app/apps/server/dist ./server/dist
COPY --from=builder /app/apps/client/dist ./client/dist

# 'serve' will host the static client build
RUN npm install -g serve

COPY start.sh .

EXPOSE 4000 3000
CMD ["./start.sh"]
