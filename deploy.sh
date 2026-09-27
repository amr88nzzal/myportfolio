#!/bin/bash
# ========================================================
# Automatic Deployment Script for Oracle Cloud VM
# ========================================================

echo "🚀 Starting Deployment for Amro Nazzal Portfolio on Port 3300..."

# Stop and remove previous container
echo "📦 Stopping old container instance..."
docker compose down

# Build new image and launch container in background
echo "🔨 Building Docker image and starting container..."
docker compose up -d --build

# Verify container status
echo "🔍 Checking container status..."
docker compose ps

echo "✅ Portfolio is now running in Docker on http://localhost:3300 !"
