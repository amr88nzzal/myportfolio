# ==========================================
# Amro Nazzal Executive Portfolio - Dockerfile
# Optimized for Oracle Cloud ARM64 & x86_64
# Target Port: 3300
# ==========================================

# Stage 1: Build Application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package descriptors & install dependencies with peer resolution flag
COPY package*.json ./
RUN npm install --legacy-peer-deps

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

# Copy package descriptors & install production dependencies
COPY package*.json ./
RUN npm install --omit=dev --legacy-peer-deps

# Copy build artifacts and necessary source directories
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.ts ./server.ts
COPY --from=builder /app/src ./src
COPY --from=builder /app/public ./public

# Create directory for persistent user uploads
RUN mkdir -p /app/src/assets/images

# Expose Port 3300
EXPOSE 3300

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3300/ || exit 1

# Start Server
CMD ["tsx", "server.ts"]
