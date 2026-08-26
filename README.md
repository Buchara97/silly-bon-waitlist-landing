# Silly Bon — Waitlist Landing

Public closed-beta signup for **Silly Bon**, deployed to GitHub Pages at [sillybon.com](https://sillybon.com).

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Closed beta signup (couple or solo) |
| Terms / Privacy | `/terms`, `/privacy` | Legal placeholders |

Data is stored in **Firebase Firestore** (same project as the Silly Bon app).

## Quick start

```bash
npm install
cp .env.example .env.local
# Fill in VITE_FIREBASE_* from Firebase Console → Project settings → Web app
npm run dev
```

## Firebase setup

### 1. Web app env

Copy the same `VITE_FIREBASE_*` values used in the main `silly-bon` app into `.env.local`.

### 2. Firestore rules

Deploy rules from the main app repo (includes `waitlist`, `betaSignups`, `config/beta`):

```bash
cd ../silly-bon
npx firebase deploy --only firestore:rules
```

### 3. Beta config document

In Firebase Console → Firestore, create collection `config`, document id `beta`:

```json
{
  "open": true
}
```

Set `open: false` to close beta signup without redeploying the site. You pick testers manually in Firebase Console (`status: pending` → `approved`).

## Collections

### `betaSignups`

**Solo**
```ts
{
  mode: 'solo'
  person1Email: string
  person1Device: 'android' | 'ios'
  createdAt: number
  status: 'pending'
  source: 'landing'
}
```

**Couple**
```ts
{
  mode: 'couple'
  person1Email: string
  person1Device: 'android' | 'ios'
  person2Email: string
  person2Device: 'android' | 'ios'
  createdAt: number
  status: 'pending'
  source: 'landing'
}
```

### `waitlist` (legacy)
```ts
{ email: string, createdAt: number, source: 'landing', marketingConsent: true }
```

## Assets

Images in `public/assets/`:

| File | Role |
|------|------|
| `app_icon.png` | Header icon |
| `bon_boy.gif` | Left mascot (desktop) |
| `bon_girl.gif` | Right mascot (desktop) |

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. **Settings → Pages → Source:** GitHub Actions.
3. **Settings → Secrets and variables → Actions → Variables** — add all `VITE_FIREBASE_*` and optional social URLs.
4. Push to `main`.

### Custom domain (sillybon.com)

`public/CNAME` contains `sillybon.com`. In GitHub **Settings → Pages → Custom domain**, enter `sillybon.com` and configure DNS A/CNAME records. `vite.config.ts` uses `base: '/'`.

## Build

```bash
npm run build
npm run preview
```

`npm run build` copies `dist/index.html` to `dist/404.html` so SPA routes work on GitHub Pages.
