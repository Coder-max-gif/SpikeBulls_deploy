# SpikeBulls — Local Development Guide

Premium forex trading platform: MT5 indicators, algo strategies, forex signals, and automation tools.

**Stack:** React 19 + Tailwind + Framer Motion · FastAPI + Motor · MongoDB · JWT auth · Stripe (gated) · Email (console / SMTP / Resend).

This document covers everything you need to run, modify, and extend the project on your own machine.

---

## 📦 What's Included

```
/app
├── backend/                FastAPI + MongoDB
│   ├── server.py           entrypoint (mounts routers, auto-seeds on first boot)
│   ├── seed_cli.py         standalone seed CLI (re-runnable, supports --reset and --wipe-all)
│   ├── .env.example        template — copy to .env
│   ├── Dockerfile          optional containerization
│   ├── core/               config / db / security / deps / email
│   ├── models/             pydantic models (user, product, order, license, contact)
│   ├── routes/             auth, products, contact, checkout, user, admin
│   └── services/           seed data + thin Stripe wrapper
│
├── frontend/               React 19 (Create React App + craco)
│   ├── src/                full source
│   ├── .env.example        template — copy to .env
│   └── Dockerfile          optional containerization
│
├── scripts/
│   ├── dev-db.sh           start MongoDB in Docker
│   ├── dev-backend.sh      start FastAPI (creates venv, installs deps, runs uvicorn)
│   ├── dev-frontend.sh     start CRA dev server (yarn install + yarn start)
│   └── seed.sh             wrapper around backend/seed_cli.py
│
├── docker-compose.yml      MongoDB by default; full stack via --profile full
├── Makefile                shortcuts (make backend, make frontend, make db, make seed, ...)
├── .gitignore
└── README.md               (this file)
```

---

## 🚀 Quick Start (3 terminals, no Docker required)

> Prereqs: **Python 3.11+**, **Node 18+**, **yarn**, and either a local **MongoDB** install or Docker.

```bash
# 1) Start MongoDB
#    Option A — Docker (recommended):
docker compose up -d mongo
#    Option B — system MongoDB:
#    mongod  # in its own terminal

# 2) Start the backend (in its own terminal)
./scripts/dev-backend.sh
# → creates backend/.venv, installs requirements, copies .env.example -> .env on first run,
#   runs uvicorn on http://0.0.0.0:8001 with hot reload
#   On first boot it auto-seeds the DB and prints an admin password — save it!

# 3) Start the frontend (in another terminal)
./scripts/dev-frontend.sh
# → yarn install, copies frontend/.env.example -> frontend/.env, then runs CRA on
#   http://localhost:3000

# 4) Open http://localhost:3000
```

### One-liner alternatives (using the Makefile)

```bash
make install        # backend + frontend deps in one go
make db             # start Mongo in Docker
make backend        # run FastAPI
make frontend       # run React
make seed           # re-run idempotent seed
make reset-seed     # wipe catalog + testimonials, then reseed
make stack          # full stack via docker compose
```

---

## 🐳 Full Docker Compose (optional)

If you'd rather skip installing Python/Node locally:

```bash
docker compose --profile full up --build
```

Services:
- **mongo** → `localhost:27017`
- **backend** → `localhost:8001`
- **frontend** → `localhost:3000`

Both backend and frontend mount their source directories, so editing files on the host triggers hot reload inside the containers.

Stop everything:
```bash
docker compose --profile full down
```

Wipe data:
```bash
docker compose --profile full down -v
```

---

## ⚙️ Environment Variables

### `backend/.env` — copy from `backend/.env.example`

| Variable | Default | Notes |
|---|---|---|
| `MONGO_URL` | `mongodb://localhost:27017` | Required |
| `DB_NAME` | `spikebulls` | Required |
| `CORS_ORIGINS` | `http://localhost:3000` | Comma-separated or `*` for dev |
| `JWT_SECRET` | placeholder | **Change before sharing** — `openssl rand -hex 32` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `60` | |
| `REFRESH_TOKEN_EXPIRE_DAYS` | `30` | |
| `APP_URL` | `http://localhost:3000` | Used in outgoing email links |
| `ADMIN_EMAIL` | `admin@spikebulls.com` | Seeded on first boot |
| `ADMIN_PASSWORD` | random | Set this to a known value to skip the random one |
| `ENABLE_STRIPE` | `false` | `true` → real Stripe Checkout |
| `STRIPE_SECRET_KEY` | `""` | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | `""` | `whsec_...` |
| `STRIPE_SUCCESS_URL` / `STRIPE_CANCEL_URL` | localhost | |
| `EMAIL_PROVIDER` | `console` | `console` / `smtp` / `resend` |
| `EMAIL_FROM` | `SpikeBulls <hello@spikebulls.com>` | |
| `SMTP_HOST/PORT/USER/PASS` | – | Only if `EMAIL_PROVIDER=smtp` |
| `RESEND_API_KEY` | – | Only if `EMAIL_PROVIDER=resend` |

### `frontend/.env` — copy from `frontend/.env.example`

| Variable | Default |
|---|---|
| `REACT_APP_BACKEND_URL` | `http://localhost:8001` |
| `HOST` | `0.0.0.0` |
| `PORT` | `3000` |
| `BROWSER` | `none` |

---

## 🌱 Database Setup & Seed

The backend **auto-seeds** on first boot when collections are empty:
- 1 admin user (`ADMIN_EMAIL` / `ADMIN_PASSWORD` — random if not set)
- 6 products (MT5 Indicator Pro, Algo Strategy, Forex Signals Pro, Automation Suite, Complete Bundle, Gold Sniper)
- 4 testimonials

Indexes (`users.email`, `products.slug`, `licenses.key`, `orders.id`) are also created on startup.

### Manual reseeding

```bash
make seed          # idempotent — only fills what's missing
make reset-seed    # drops products + testimonials + email_outbox, then reseeds

# Or invoke the CLI directly:
cd backend
source .venv/bin/activate
python -m seed_cli            # idempotent
python -m seed_cli --reset    # reset catalog + testimonials
python -m seed_cli --wipe-all # DESTRUCTIVE: drops users/orders/licenses/leads too
```

### Inspect the DB

```bash
docker exec -it spikebulls-mongo mongosh spikebulls
> show collections
> db.products.find().pretty()
> db.email_outbox.find().sort({created_at:-1}).limit(5)
```

---

## 💳 Enabling Live Stripe Checkout (optional)

1. Get test keys from <https://dashboard.stripe.com/test/apikeys>
2. In `backend/.env`:
   ```
   ENABLE_STRIPE=true
   STRIPE_SECRET_KEY=sk_test_xxx
   STRIPE_WEBHOOK_SECRET=whsec_xxx
   ```
3. Restart the backend.
4. For local webhook testing:
   ```bash
   stripe listen --forward-to localhost:8001/api/checkout/webhook
   ```

The frontend code doesn't change — clicking **Buy now** redirects to the real Stripe Checkout, and the webhook marks orders paid + issues licenses + sends the purchase email.

Until you flip the flag, checkout runs in **simulated mode**: orders are created locally, licenses are issued instantly, and the purchase email is logged to `email_outbox`.

---

## 📨 Enabling Real Emails (optional)

### Resend (simplest)
```
EMAIL_PROVIDER=resend
RESEND_API_KEY=re_xxx
EMAIL_FROM=SpikeBulls <hello@yourdomain.com>
```

### SMTP (Gmail App Password, Mailgun, SES, etc.)
```
EMAIL_PROVIDER=smtp
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=you@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=SpikeBulls <you@gmail.com>
```

Every send is **also** written to the `email_outbox` MongoDB collection for audit.

---

## 🧪 API Reference (all routes prefixed with `/api`)

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `GET` | `/` | – | Health + feature flags |
| `GET` | `/products` | – | List active products (`?category=indicator|algo|signals|automation`) |
| `GET` | `/products/{slug}` | – | Product detail |
| `GET` | `/testimonials` | – | Public testimonials |
| `POST` | `/auth/register` | – | Returns access + refresh tokens |
| `POST` | `/auth/login` | – | Returns tokens |
| `POST` | `/auth/refresh` | – | Rotate tokens |
| `GET/PATCH` | `/auth/me` | user | Get / update profile |
| `POST` | `/auth/forgot-password` | – | Issues reset token + email |
| `POST` | `/auth/reset-password` | – | Consume reset token |
| `POST` | `/auth/verify-email` | – | Mark email verified |
| `POST` | `/contact` | optional | Save lead + auto-reply |
| `POST` | `/checkout` | user | Create order (Stripe or simulated) |
| `GET` | `/checkout/orders/{id}` | user | Order + licenses |
| `POST` | `/checkout/webhook` | Stripe sig | Fulfillment webhook |
| `GET` | `/me/orders` `/me/licenses` `/me/summary` | user | Customer dashboard data |
| `*` | `/admin/*` | admin | Products / users / orders / leads / licenses / testimonials |

The first-boot admin password is printed to the backend logs:

```
[SEED] Admin user created — email=admin@spikebulls.com password=XXXXXXXX (change after first login)
```

You can change it from the dashboard → Account → New password, or by `PATCH /api/auth/me` with `{"password": "..."}`.

---

## 🧱 MongoDB Collections

`users` · `products` · `orders` · `licenses` · `contact_submissions` · `testimonials` · `email_outbox`

---

## 🛠 Project Conventions

- Always use **yarn** for the frontend (never npm). The `yarn.lock` is the source of truth.
- All backend API routes live under `/api/...` — the frontend hits them via `REACT_APP_BACKEND_URL`.
- Auth tokens are stored in `localStorage` under `spb_access_token` / `spb_refresh_token` / `spb_user`.
- License keys are formatted `SPB-XXXX-XXXX-XXXX-XXXX-XXXX`.
- Email provider `console` writes to the logger and the `email_outbox` collection — no network calls.

---

## 🔐 Security Checklist Before Going Live

- [ ] Rotate `JWT_SECRET` (`openssl rand -hex 32`)
- [ ] Change the seeded admin password
- [ ] Set `CORS_ORIGINS` to your real frontend domain (not `*`)
- [ ] Enable HTTPS at your reverse proxy / load balancer
- [ ] Add rate-limiting on `/auth/login`, `/auth/register`, `/contact`, `/checkout` (drop in `slowapi`)
- [ ] Configure real SMTP / Resend (`EMAIL_PROVIDER` ≠ `console`)
- [ ] Set `STRIPE_WEBHOOK_SECRET` and register the webhook URL in Stripe Dashboard

---

## 🧭 Suggested Next Steps

- File upload for product images (currently URL-based via admin)
- Stripe Subscriptions for the signals product (currently billed as 30-day one-time)
- 2FA on admin accounts
- License activation endpoint (`POST /licenses/activate` for the MT5 EA to hit)
- Public changelog + blog (Markdown-based)
- E2E tests (Playwright) and CI workflow

---

Built with care. Enjoy hacking on it locally.
