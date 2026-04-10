# Airplane onboarding page

Marketing landing site for a small aviation-parts warehouse disposition: a scrollable hero over warehouse photography, lead capture, and a placeholder page until a separate parts storefront is ready.

## Tech stack

- **React 19** + **TypeScript**
- **Vite** (build and dev server)
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **shadcn/ui**-style components (`src/components/ui`, [components.json](components.json))
- **React Router** for `/` and `/parts`
- **Vitest** + **Testing Library** for tests

## Prerequisites

- **Node.js** 20+ (LTS recommended)
- **npm** (or use `pnpm` / `yarn` if you prefer; lockfile is not committed by default)

## Getting started

```bash
git clone <repository-url>
cd airplane_onboarding_page
npm install
```

Copy environment variables and adjust for your deployment:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_CONTACT_EMAIL` | Yes for production | Email used in `mailto:` links and contact copy. |
| `VITE_HERO_IMAGE_URL` | No | URL or path (e.g. `/warehouse.jpg` in `public/`). Defaults to a demo stock image if unset. |
| `VITE_LEAD_FORM_ENDPOINT` | No | If set, the interest form `POST`s JSON `{ email, name?, source: "landing" }` here. If unset, submit opens a mailto draft. |

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Scripts

| Command | Action |
|---------|--------|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Typecheck + Vite production build |
| `npm run preview` | Serve `dist/` |
| `npm run lint` | ESLint |
| `npm run test` | Vitest (watch mode) |
| `npm run test:run` | Vitest single run (CI-friendly) |

## Routes

| Path | Purpose |
|------|---------|
| `/` | Landing: hero, value props, email interest form |
| `/parts` | “Catalog coming soon” + email the owner |
| `*` | Redirects to `/` |

## Adding shadcn components

```bash
npx shadcn@latest add <component-name>
```

Configuration lives in [components.json](components.json).

## Lead capture

The site is **frontend-only** by default. To store leads without a custom backend, point `VITE_LEAD_FORM_ENDPOINT` at a Formspree, Basin, Getform, or similar endpoint, or add a small serverless function that writes to email, a spreadsheet, or a CRM.

## Testing

- **Unit / component tests:** Vitest + Testing Library (`src/**/*.test.ts` / `*.test.tsx`).
- For a small marketing site, prioritizing **helpers** and **form behavior** (with `fetch` mocked) is usually enough. Optional **E2E** (e.g. Playwright) can cover one happy path if the flows grow.

## Documentation for contributors and AI agents

Long-form context (business facts, design intent, session todo list, and iteration notes) lives in **[documentation/AGENT_CONTEXT.txt](documentation/AGENT_CONTEXT.txt)**. Update that file when stack, env, or product decisions change.

## License

Private project unless the repository owner specifies otherwise.
