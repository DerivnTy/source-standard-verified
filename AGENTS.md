# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single **Vite + React + TypeScript SPA** ("Source Standard", a clinic/vendor
sourcing-verification directory). It was scaffolded with Lovable. There is no separate backend to
run locally: the directory content is static data bundled into the frontend (`src/data/*`), and the
app points at a hosted Supabase project via `.env` (`VITE_SUPABASE_*`). The `supabase/` directory
(Postgres migrations + Deno edge functions) only backs optional flows (site-access gate,
vendor-intake email, unsubscribe) and is **not** needed to develop or test the core product.

### Package manager

- **Bun** is the package manager and script runner. `package.json` scripts invoke `bun` directly
  (e.g. `prebuild`/`sitemap` run `bun scripts/generate-sitemap.ts`), so use `bun`, not `npm`, even
  though a `package-lock.json` is also committed. Dependencies are installed by the startup update
  script; no manual install is normally needed.

### Commands (see `package.json` scripts)

- Dev server: `bun run dev` → serves on `http://localhost:8080` (port set in `vite.config.ts`).
- Tests: `bun run test` (Vitest, jsdom). `bun run test:watch` for watch mode.
- Lint: `bun run lint` (ESLint). Note: lint currently reports pre-existing errors in checked-in
  code (mostly `no-explicit-any` / empty-interface in `supabase/functions/*` and `src/components/ui/*`,
  and a `require()` import in `tailwind.config.ts`). These are not environment problems; do not
  treat a non-zero `lint` exit as a broken setup.
- Build: `bun run build`. This runs a `prebuild` step that regenerates the **tracked** file
  `public/sitemap.xml`. After building, `git checkout -- public/sitemap.xml` if you don't intend to
  commit sitemap changes.

### Notes

- Client-side routing (React Router) means deep links like `/greenlist/<slug>` are served by the SPA
  in dev; there is no server-side routing.
