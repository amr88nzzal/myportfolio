# ==========================================
# Amro Nazzal Executive Portfolio - Dockerfile
# Optimized for Oracle Cloud VM & Cloudflare
# Target Port: 3300
# ==========================================

# Stage 1: Build Application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package descriptors & install all dependencies
COPY package*.json ./
RUN npm ci

# Copy full application code
COPY . .

# Build Vite static assets
RUN npm run build

# Stage 2: Production Execution Image
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3300

# Install tsx globally for lightweight TypeScript execution
RUN npm install -g tsx

# Copy package descriptors & install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Copy build artifacts and necessary source directories
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.ts ./server.ts
COPY --from=builder /app/src ./src
COPY --from=builder /app/public ./public 2>/dev/null || true

# Create directory for persistent user uploads
RUN mkdir -p /app/src/assets/images

# Expose Port 3300
EXPOSE 3300

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3300/ || exit 1

# Start Server
CMD ["tsx", "server.ts"]
