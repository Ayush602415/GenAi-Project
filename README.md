# Downbot

Downbot is an authentication-only foundation for an AI chat application. It contains a JavaScript Express/Mongoose API and a React/Vite client with a calm, minimal sign-in experience.

## Requirements

- Node.js 20+
- MongoDB

## Run locally

1. Copy `backend/.env.example` to `backend/.env` and set two different, strong token secrets.
2. In `backend`, run `npm install` and `npm run dev`.
3. In `frontend`, run `npm install` and `npm run dev`.
4. Open the Vite URL (usually `http://localhost:5173`). Vite proxies `/api` requests to `http://localhost:3000`; the backend does not enable CORS.

Authentication screens and each feature's request/API, state, hooks, and UI code are organized under `frontend/src/features/auth`. Redux Toolkit async thunks manage login, registration, session restoration, and logout; the access token stays in memory while the refresh token is stored in an HTTP-only cookie.

See [backend/README.md](./backend/README.md) for the API endpoints and payload details.
