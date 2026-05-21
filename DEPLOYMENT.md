# Deployment Checklist

## Render Quick Start
- Use the repo root `render.yaml` Blueprint to create the backend, Postgres, and Key Value services together.
- The backend service runs from `backend/`.
- Build command: `npm install`
- Start command: `npm run start:prod`
- Copy `backend/.env.example` when you need a reference for required variables.
- Fill all `sync: false` variables in Render after the Blueprint is created, especially:
  - `FRONTEND_URL`
    Use: `https://jtdactechhaiti.com,https://www.jtdactechhaiti.com`
  - `CORS_ORIGIN`
    Use: `https://jtdactechhaiti.com,https://www.jtdactechhaiti.com`
  - `BACKEND_URL`
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - `STRIPE_PRICE_PRO`
  - `STRIPE_PRICE_ENTERPRISE`

## 1. Backend
- Preferred on Render: set `DATABASE_URL`
- Alternative manual config: set `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- If your Postgres provider requires TLS, also set `DB_SSL=true`
- Set `JWT_SECRET`
- Set `FRONTEND_URL=https://jtdactechhaiti.com,https://www.jtdactechhaiti.com`
- Set `CORS_ORIGIN=https://jtdactechhaiti.com,https://www.jtdactechhaiti.com`
- Set `BACKEND_URL`
- Set `STRIPE_SECRET_KEY`
- Set `STRIPE_WEBHOOK_SECRET`
- Set `MONCASH_API_URL` and `MONCASH_API_KEY`
- Set `NATCASH_API_URL` and `NATCASH_API_KEY`
- Set `LAJANCASH_API_URL` and `LAJANCASH_API_KEY`

## 2. Frontend
- On Vercel, set `VITE_API_URL=https://api.jtdactechhaiti.com/api`
- On Vercel, set `VITE_SOCKET_URL=https://api.jtdactechhaiti.com`
- Add both custom domains in Vercel Project Settings:
  - `jtdactechhaiti.com`
  - `www.jtdactechhaiti.com`
- The frontend is configured to redirect `www.jtdactechhaiti.com` to `jtdactechhaiti.com` in `frontend/vercel.json`
- Build with `npm run build`

## 3. Domain and HTTPS
- Point domain DNS to the server
- Put the frontend behind Nginx or Apache
- Proxy `/api` or backend traffic to NestJS
- Generate SSL with Let's Encrypt
- Force HTTPS redirects

## 4. Stripe Webhook
- Register the production webhook endpoint:
  - `/webhooks/stripe`
- Enable at least:
  - `checkout.session.completed`
  - `invoice.payment_failed`

## 5. Local Payment Webhooks
- Configure provider callbacks to:
  - `/payments/webhooks/moncash`
  - `/payments/webhooks/natcash`
  - `/payments/webhooks/lajancash`

## 5. Persistence and Process Management
- Run Postgres with persistent volume
- Run backend with PM2, Docker, or systemd
- Monitor logs and restart policy

## 6. Final Validation
- Test login
- Test refresh token flow
- Test Stripe checkout
- Test Stripe webhook
- Test PDF reports
- Test public pages
