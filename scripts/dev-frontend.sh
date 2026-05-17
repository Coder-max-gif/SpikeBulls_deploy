#!/usr/bin/env bash
# Start the SpikeBulls React frontend locally.
set -euo pipefail

cd "$(dirname "$0")/../frontend"

if ! command -v yarn >/dev/null 2>&1; then
  echo "[error] yarn is not installed. Install it with: npm install -g yarn"
  exit 1
fi

if [ ! -d "node_modules" ]; then
  echo "[setup] Installing JS deps (yarn install)..."
  yarn install
fi

if [ ! -f ".env" ]; then
  echo "[setup] Copying .env.example -> .env"
  cp .env.example .env
fi

echo "[run]   Starting CRA dev server on http://0.0.0.0:3000  (Ctrl+C to stop)"
exec yarn start
