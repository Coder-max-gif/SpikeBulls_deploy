#!/usr/bin/env bash
# Manually (re)seed the SpikeBulls database.
#
# Usage:
#   ./scripts/seed.sh         # ensure admin + products + testimonials exist (idempotent)
#   ./scripts/seed.sh --reset # wipe the catalog + testimonials then reseed
set -euo pipefail

cd "$(dirname "$0")/../backend"

if [ ! -d ".venv" ]; then
  python3 -m venv .venv
  # shellcheck disable=SC1091
  source .venv/bin/activate
  pip install --upgrade pip >/dev/null
  pip install -r requirements.txt
else
  # shellcheck disable=SC1091
  source .venv/bin/activate
fi

if [ ! -f ".env" ]; then
  cp .env.example .env
fi

python -m seed_cli "$@"
