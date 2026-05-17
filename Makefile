# === SpikeBulls local dev shortcuts ===
# Usage:
#   make help        list commands
#   make install     install backend + frontend deps
#   make db          start MongoDB in Docker
#   make backend     run FastAPI on :8001 (auto-reload)
#   make frontend    run React dev server on :3000
#   make seed        idempotent reseed of catalog/admin/testimonials
#   make reset-seed  drop catalog + testimonials + email_outbox, reseed
#   make stack       run the full stack via docker compose (db + backend + frontend)
#   make stop-db     stop the local MongoDB container
#   make clean       remove .venv and node_modules

.PHONY: help install install-backend install-frontend db backend frontend seed reset-seed stack stop-db clean

help:
	@grep -E '^[a-zA-Z_-]+:.*?##' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

install: install-backend install-frontend ## Install both backend (pip) and frontend (yarn) deps

install-backend:
	cd backend && python3 -m venv .venv && . .venv/bin/activate && pip install --upgrade pip && pip install -r requirements.txt

install-frontend:
	cd frontend && yarn install

db: ## Start MongoDB in Docker
	bash scripts/dev-db.sh

stop-db: ## Stop the local MongoDB container
	docker compose stop mongo

backend: ## Run FastAPI backend locally
	bash scripts/dev-backend.sh

frontend: ## Run React frontend locally
	bash scripts/dev-frontend.sh

seed: ## Idempotent seed (admin + 6 products + testimonials)
	bash scripts/seed.sh

reset-seed: ## Drop catalog + testimonials, then reseed
	bash scripts/seed.sh --reset

stack: ## Run full stack via docker compose (db + backend + frontend)
	docker compose --profile full up --build

clean: ## Remove .venv and node_modules
	rm -rf backend/.venv frontend/node_modules
