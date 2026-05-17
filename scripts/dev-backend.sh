#!/usr/bin/env bash
# Start the SpikeBulls FastAPI backend locally with hot reload.
set -euo pipefail

cd "$(dirname "$0")/../backend"

if [ ! -d ".venv" ]; then
  echo "[setup] Creating Python virtualenv..."
  python3 -m venv .venv
fi

# shellcheck disable=SC1091
source .venv/bin/activate

echo "[setup] Installing/updating Python deps..."
pip install --upgrade pip >/dev/null
pip install -r requirements.txt

if [ ! -f ".env" ]; then
  echo "[setup] Copying .env.example -> .env (edit it after first run)"
  cp .env.example .env
fi

echo "[run]   Starting uvicorn on http://0.0.0.0:8001  (Ctrl+C to stop)"
exec uvicorn server:app --reload --host 0.0.0.0 --port 8001
