# Downbot authentication API

## Setup

Requires Node.js 20+ and MongoDB. Copy `.env.example` to `.env`, set distinct random access/refresh secrets, then run:

```sh
npm install
npm run dev
```

The API is available at `http://localhost:3000/api/v1`. The Vite frontend proxies `/api` to this backend; no CORS configuration is needed.

## Conversation data models

`Conversation` belongs to a `User` and stores a title. `Message` belongs to a `Conversation` and stores a `system`, `user`, or `assistant` role with its text content. Both models include timestamps and indexes for owner/message lookup.

## Endpoints

All responses use `{ "success": true, "message": "...", "data": {} }` or `{ "success": false, "message": "...", "errors": [] }`. The refresh token is an httpOnly cookie; only the access token is returned in `data`.

### `POST /auth/register`

Request: `{ "name": "Ada Lovelace", "email": "ada@example.com", "password": "secure123" }`

Response data: `{ "accessToken": "<jwt>", "user": { "id": "...", "name": "Ada Lovelace", "email": "ada@example.com" } }`

### `POST /auth/login`

Request: `{ "email": "ada@example.com", "password": "secure123" }`. Returns the same data shape as registration.

### `POST /auth/refresh`

Send the `refreshToken` cookie. Rotates it and returns `{ "accessToken": "<jwt>", "user": { "id": "...", "name": "...", "email": "..." } }`.

### `POST /auth/logout`

Clears the refresh cookie and invalidates the stored token. Returns `data: {}`.

### `GET /auth/me`

Send `Authorization: Bearer <access-token>`. Returns `{ "user": { "id": "...", "name": "...", "email": "..." } }`.
