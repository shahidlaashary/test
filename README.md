# Music Submission Management System

A monorepo for the Music Submission Management System: an Android user app, browser-based Admin Dashboard, and Firebase backend foundation.

## Apps
- `apps/web-admin` — responsive web workspace containing the User Portal dashboard and Admin workspace starter.
- `apps/mobile` — Expo / React Native Android app starter.
- `packages/shared` — shared domain types and release/status constants.
- `firebase/` — Firestore and Storage security-rule starting points.

## Getting started
Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev:web
```

To build the web app:

```bash
npm run build:web
```

To start the Android app (Expo Go / Android emulator):

```bash
npm run start:mobile
```

## Current implementation stage
This first milestone establishes the app structure and a responsive, interactive dashboard prototype. Demo data is local and is not a production account system. Firebase project credentials, email delivery, secure server-side workflows, upload storage, and production authentication must be configured before real users or real submissions are enabled.

## Product rules captured
See [PRODUCT_REQUIREMENTS.md](docs/PRODUCT_REQUIREMENTS.md) for the agreed product scope and implementation notes.
