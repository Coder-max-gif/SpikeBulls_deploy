# SpikeBulls — Premium Forex Trading Platform

Full-stack production-ready web app for selling MT5 indicators, algo strategies, forex signals, and trading automation tools.

**Stack:** React 19 + Tailwind + Framer Motion · FastAPI + Motor · MongoDB · JWT auth · Stripe (gated) · Resend / SMTP / console email.

---

## ✨ What's Included

- **Public site** — Home, Products catalog, Product detail, Pricing, FAQ, Contact (premium dark fintech UI)
- **Auth** — Register / login / forgot / reset / verify-email (JWT access + refresh, bcrypt)
- **Customer dashboard** — orders, licenses, account settings
- **Admin dashboard** — products CRUD, orders, users, leads, licenses (revoke/regenerate), testimonials
- **Checkout** — Stripe Checkout when `ENABLE_STRIPE=true`, otherwise a simulated flow that grants licenses + sends email locally
- **Email** — console (default with `dev_outbox` Mongo collection) / SMTP / Resend
- **Seeded data** — admin user + 6 products + 4 testimonials on first boot

---

## 🗂 Project Structure

```
/app
├── backend/
│   ├── server.py                  # FastAPI entrypoint
│   ├── .env                       # secrets + feature flags
│   ├── core/{config,database,security,deps,email}.py
│   ├── models/{user,product,order,license,contact}.py
│   ├── routes/{auth,products,contact,checkout,user,admin}.py
│   └── services/{seed,stripe_service}.py
└── frontend/src/
    ├── App.js                     # all routes
    ├── mock.js                    # static marketing copy
    ├── lib/{api,queries}.js
    ├── context/AuthContext.jsx
    ├── components/                # Hero, Navbar, Footer, ProductsOverview, etc.
    └── pages/
        ├── public                 # HomePage, ProductsPage, ProductDetailPage, ...
        ├── auth                   # LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, VerifyEmailPage
        ├── DashboardPage.jsx, CheckoutSuccessPage.jsx, CheckoutCancelPage.jsx
        └── admin/                 # AdminLayout + 7 admin sub-pages
```

---

## 🚀 Local Development

### Prereqs
- Node 18+ and **yarn** (do not use npm)
- Python 3.11+
- MongoDB running locally (or Atlas)

### Backend

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

On first boot the logs print:

```
[SEED] Admin user created — email=admin@spikebulls.com password=XXXXXXXXX (change after first login)
[SEED] Products ensured (6 total in catalog).
[SEED] Testimonials seeded.
```

Save that admin password. You can also set `ADMIN_PASSWORD` in `.env` to pick your own.

### Frontend

```bash
cd frontend
yarn install
yarn start
```

App: <http://localhost:3000> · API: <http://localhost:8001/api/>

---

## 🔑 Environment Variables (`backend/.env`)

| Variable | Default | Notes |
|---|---|---|
| `MONGO_URL` | `mongodb://localhost:27017` | Required |
| `DB_NAME` | `test_database` | Required |
| `JWT_SECRET` | placeholder | **Change in production** (`openssl rand -hex 32`) |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `60` | |
| `REFRESH_TOKEN_EXPIRE_DAYS` | `30` | |
| `APP_URL` | `http://localhost:3000` | Used in email links |
| `ADMIN_EMAIL` | `admin@spikebulls.com` | Seeded on first boot |
| `ADMIN_PASSWORD` | random | Set to skip the random one |
| `ENABLE_STRIPE` | `false` | `true` switches to live Stripe Checkout |
| `STRIPE_SECRET_KEY` | `""` | `sk_test_...` / `sk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | `""` | `whsec_...` |
| `STRIPE_SUCCESS_URL` / `STRIPE_CANCEL_URL` | localhost | |
| `EMAIL_PROVIDER` | `console` | `console` / `smtp` / `resend` |
| `EMAIL_FROM` | `SpikeBulls <hello@spikebulls.com>` | |
| `SMTP_HOST/PORT/USER/PASS` | – | Only if `EMAIL_PROVIDER=smtp` |
| `RESEND_API_KEY` | – | Only if `EMAIL_PROVIDER=resend` |

---

## 💳 Enabling Live Stripe Checkout

1. Get test keys from <https://dashboard.stripe.com/test/apikeys>
2. In `backend/.env`:
   ```
   ENABLE_STRIPE=true
   STRIPE_SECRET_KEY=sk_test_xxx
   STRIPE_WEBHOOK_SECRET=whsec_xxx
   ```
3. Restart backend
4. Local webhook: `stripe listen --forward-to localhost:8001/api/checkout/webhook`

The frontend code already calls `/api/checkout` — clicking **Buy now** redirects to Stripe automatically once the flag is on. The webhook marks orders paid, issues licenses, and triggers the purchase email.

---

## 📨 Enabling Real Emails

**Resend (recommended):**
```
EMAIL_PROVIDER=resend
RESEND_API_KEY=re_xxx
EMAIL_FROM=SpikeBulls <hello@yourdomain.com>
```

**SMTP (Gmail App Password, Mailgun, etc.):**
```
EMAIL_PROVIDER=smtp
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=you@gmail.com
SMTP_PASS=your-app-password
```

All sends are also written to the `email_outbox` MongoDB collection for audit.

---

## 🧪 API Quick Reference (all `/api`-prefixed)

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `GET` | `/` | – | Health + feature flags |
| `GET` | `/products` | – | List active products (`?category=...`) |
| `GET` | `/products/{slug}` | – | Product detail |
| `GET` | `/testimonials` | – | Public testimonials |
| `POST` | `/auth/register` | – | Returns access + refresh tokens |
| `POST` | `/auth/login` | – | Returns tokens |
| `POST` | `/auth/refresh` | – | Rotate tokens |
| `GET/PATCH` | `/auth/me` | user | Profile |
| `POST` | `/auth/forgot-password` / `/auth/reset-password` / `/auth/verify-email` | – | Password & email |
| `POST` | `/contact` | optional | Save lead + auto-reply |
| `POST` | `/checkout` | user | Create order (Stripe or simulated) |
| `GET` | `/checkout/orders/{id}` | user | Order + licenses |
| `POST` | `/checkout/webhook` | Stripe sig | Fulfillment webhook |
| `GET` | `/me/orders` `/me/licenses` `/me/summary` | user | Customer dashboard data |
| `*` | `/admin/*` | admin | Products / users / orders / leads / licenses / testimonials |

---

## 🧱 MongoDB Collections

`users` · `products` · `orders` · `licenses` · `contact_submissions` · `testimonials` · `email_outbox`

Indexes created automatically on startup.

---

## 🛳 Deployment

- **Backend** — any Python host (Fly.io, Render, Railway, AWS). Set env vars, bind to `0.0.0.0:8001`.
- **Frontend** — `yarn build` → Vercel / Netlify / Cloudflare Pages. Set `REACT_APP_BACKEND_URL` to your backend URL.
- **MongoDB** — MongoDB Atlas in production.
- **Stripe webhook** — register `https://<backend-domain>/api/checkout/webhook` in the Stripe dashboard once `ENABLE_STRIPE=true`.

---

## 🔐 Security Checklist Before Production

- [ ] Rotate `JWT_SECRET`
- [ ] Change the seeded admin password (Account → Update password in the dashboard, or via the API)
- [ ] Set `CORS_ORIGINS` to your real domain instead of `*`
- [ ] Enable HTTPS at the load balancer
- [ ] Add rate-limiting on `/auth/login`, `/auth/register`, `/contact`, `/checkout`
- [ ] Configure real SMTP / Resend
- [ ] Confirm `STRIPE_WEBHOOK_SECRET` is set

---

## 🧭 Roadmap

- Image upload (currently URL-based via admin)
- Stripe Subscriptions (signals are 30-day rolling memberships sold as one-time today)
- 2FA on admin accounts
- License activation API for the MT5 EAs (`POST /licenses/activate`)
- Public blog / changelog

— Built with ❤️ on Emergent.
