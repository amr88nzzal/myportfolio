#!/bin/bash
# ========================================================
# Deployment script (Oracle Cloud VM / any Docker host)
# Rebuilds the image and restarts the container.
# Volumes (data + uploads) are kept.
# ========================================================
set -e
cd "$(dirname "$0")"

if [ ! -f .env ]; then
  echo "❌ .env not found. Run: cp .env.example .env  and fill in the values."
  exit 1
fi

echo "🚀 Building and (re)starting the portfolio on port 3300..."
docker compose up -d --build --remove-orphans

# Remove dangling images left by previous builds (safe)
docker image prune -f > /dev/null 2>&1 || true

echo "🔍 Container status:"
docker compose ps

echo "✅ Done. Logs: docker compose logs -f --tail=100 amro-portfolio"
