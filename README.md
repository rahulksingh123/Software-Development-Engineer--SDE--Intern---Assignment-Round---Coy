# Coy Discover — SDE Intern Assignment

A mobile-first, privacy-preserving swipe discovery prototype. **Part A** is in `PART_A_FEATURE_PROPOSAL.md`. **Part B** is a full-stack React + Express app.

## Quick start

Requires Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open **http://localhost:5173**. The API runs at **http://localhost:4000**. Vite proxies `/api/*` to Express. No API keys, authentication, or external database needed. Portraits load from Unsplash (internet needed); fallback placeholders appear if unavailable.

## Demo flow

1. Open **Discover**. Home is intentionally blank as requested.
2. Swipe right on **Aarohi** (first profile) or tap the pink heart. This creates a match immediately because the seed contains a private inbound like.
3. Tap **See your matches**. Mutual matches appear here, but inbound likes never appear elsewhere.
4. Return to Discover and swipe left or right on more cards.
5. Reload the browser. Your swipes and matches persist in `server/data/db.json`.
6. To replay from scratch, stop the server and run `npm run seed`, then restart.

## API

| Method | Route | Behavior |
|---|---|---|
| GET | `/feed` | Returns only unswiped profiles; strips private `likedMe` field |
| POST | `/swipe` | Body: `{ "profileId": 1, "direction": "like" }`; records decision, returns `{ "matched": true, "profile": {...} }` only for mutual like |
| GET | `/matches` | Returns only mutual matches; strips private `likedMe` field |

The same routes are available under `/api/` for the frontend. Invalid direction/ID → 400; unknown profile → 404; repeat swipe → 409. The user cannot swipe the same profile twice, including after reload. JSON updates use a temporary file and atomic rename. This assignment assumes one user and a single Node server process; a real multi-user deployment should use database transactions and unique constraints.

## Tests

```bash
npm test
npm run build
```

Tests cover privacy of inbound likes, mutual and one-sided likes, passes, persistence, duplicate swipes, invalid inputs, and empty feed.

## Architecture

```text
client/src/main.jsx          React UI, swipe gesture, match modal, tab navigation
client/src/style.css         Responsive dark visual design
server/src/app.js           Express routes
server/src/store.js         Pure matching/feed functions + JSON persistence
server/src/seed.js          36 demo profiles with 10 hidden inbound likes
server/data/db.json         Persistent seeded demo state
server/tests/api.test.js    HTTP integration tests (Node test runner)
PART_A_FEATURE_PROPOSAL.md  Two product recommendations and rationale
```

## Privacy design

- The backend stores `likedMe` as private server-side state and **never includes it in `/feed`**.
- A like returns a profile only when both sides liked one another.
- `/matches` filters for mutual likes only.
- No screen, count, tooltip, or error message reveals non-mutual inbound likes.
- The standalone Discover tab is a hypothetical **opt-in** extension to Coy's existing experience; it does not claim to implement Coy's real matching or invitation mechanics.

## Deployment notes

For a hosted demo, deploy the React build and Express API to a Node-capable service with a **persistent writable disk**, or migrate storage to SQLite/Postgres. Ephemeral server filesystems will lose state on redeploy. Configure a production frontend to call the deployed API (or serve both from one origin). This ZIP does not claim a deployed URL or GitHub repo; publish the extracted project to your own public GitHub repository.

## Known scope limits

No external authentication, chat, purchases, or actual Coy integration; these are not requested. Seed profiles are fictional demo data and photos are remote placeholders. The JSON store is intentionally small and single-process, suitable for an assignment rather than production concurrency.
