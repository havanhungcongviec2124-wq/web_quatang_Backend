# ─── Stage 1: Build ─────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files first (layer cache)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source
COPY . .

# ─── Stage 2: Production image ───────────────────────────────────────────────
FROM node:22-alpine

# Tạo user không phải root để bảo mật
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy chỉ những gì cần thiết từ builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

# Không copy .env vào image (sẽ truyền qua docker-compose env_file hoặc environment)
RUN rm -f .env

USER appuser

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:5000/api/health || exit 1

CMD ["node", "server.js"]
