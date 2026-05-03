# Shared Password Gate

A lightweight, site-wide password gate so you can share the preview/published site with reviewers without adding them to the workspace. One shared password, server-validated, remembered per browser.

## How it works

1. On first visit, a full-screen overlay blocks the entire app (all routes).
2. Reviewer enters the shared password.
3. The password is sent to a Lovable Cloud edge function, which compares it against a secret (`SITE_ACCESS_PASSWORD`).
4. If correct, the function returns a signed token. The token is stored in `localStorage` and the gate unlocks.
5. On subsequent visits, the stored token is re-validated by the function; if valid, the gate stays open.
6. A small "Lock" button in the footer lets you sign out of the gate.

The password is never hardcoded in the frontend — it lives only as a server secret. The token is an HMAC signed with a second server secret (`SITE_ACCESS_SIGNING_KEY`) so it cannot be forged.

## Security notes

- This is gate-level access control, not real auth. Anyone with the password gets in. Suitable for pre-launch reviewer sharing.
- Brute-force is mitigated by a small per-IP delay in the edge function and a constant-time string compare.
- Tokens expire after 30 days; you can rotate access at any time by changing `SITE_ACCESS_SIGNING_KEY` (instantly invalidates all existing tokens) or `SITE_ACCESS_PASSWORD` (changes the password).
- This does NOT protect API/edge functions or database rows — it only hides the UI. Since the project currently has no user-data backend, that's fine for review-sharing purposes.

## Technical implementation

**New secrets (you'll be prompted to add):**
- `SITE_ACCESS_PASSWORD` — the shared password you give reviewers
- `SITE_ACCESS_SIGNING_KEY` — random string used to sign tokens (I'll suggest a value)

**New edge function:** `supabase/functions/site-access/index.ts`
- `POST { action: "login", password }` → verifies password, returns `{ token }`
- `POST { action: "verify", token }` → returns `{ valid: true|false }`
- HMAC-SHA256 signed token: `base64(expiresAt).base64(hmac)`

**New frontend files:**
- `src/components/SiteAccessGate.tsx` — full-screen overlay with password input, matches the institutional design system (Navy bg, hairline borders, serif heading, single-word "Enter" action)
- `src/hooks/useSiteAccess.ts` — manages token in `localStorage`, calls the edge function

**Modified:**
- `src/App.tsx` — wrap `<BrowserRouter>` content with `<SiteAccessGate>`; renders children only once unlocked
- `src/components/SiteFooter.tsx` — small "Lock" link to clear the token

## What you'll do after I build it

1. I'll request the two secrets via the secrets tool.
2. You paste in the password you want to share + a random signing key.
3. Publish the site. Share the URL + password with reviewers.

## Out of scope

- Per-user accounts or roles
- Rate limiting beyond a basic delay
- Protecting any future backend data (we'd switch to real auth for that)
