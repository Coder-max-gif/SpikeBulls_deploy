#!/usr/bin/env bash
# Start MongoDB in Docker for local development.
set -euo pipefail

cd "$(dirname "$0")/.."

if ! command -v docker >/dev/null 2>&1; then
  echo "[error] Docker is not installed. Install Docker Desktop or run a local mongod manually."
  exit 1
fi

echo "[run] Starting MongoDB container (data persisted in volume spikebulls_mongo_data)"
docker compose up -d mongo
echo "[ok]  MongoDB is up at mongodb://localhost:27017"
echo "      Stop with: docker compose stop mongo"
echo "      Wipe with: docker compose down -v"
