# Airplane onboarding page

Marketing landing site for a small aviation-parts warehouse disposition: a scrollable hero over warehouse photography, lead capture, and a placeholder page until a separate parts storefront is ready.

## Tech stack

- **React 19** + **TypeScript**
- **Vite** (build and dev server)
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **shadcn/ui**-style components (`src/components/ui`, [components.json](components.json))
- **React Router** for `/` and `/parts`
- **Vitest** + **Testing Library** for tests
- **Prettier** + **prettier-plugin-tailwindcss** (formatting; Tailwind class order uses [prettier.config.mjs](prettier.config.mjs) + `src/index.css`)
- **eslint-config-prettier** so ESLint does not fight Prettier

## Prerequisites

- **Node.js** 20+ (LTS recommended; current Homebrew installs such as Node 25 also work)
- **npm** (or `pnpm` / `yarn` if you prefer). This repo uses **`package-lock.json`** — commit it for reproducible installs

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
| `VITE_BASE_PATH` | No | Path prefix for GitHub **project** Pages (e.g. `/my-repo/`). Omit for local dev and for a site at the domain root. CI sets this in [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml). |

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

### GitHub Pages

The workflow [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml) builds on pushes to `main`, copies `index.html` to `404.html` (so client-side routes like `/parts` work on refresh), and deploys `dist/` via GitHub Actions Pages.

1. In the repository: **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions**.
2. Push to `main` (or run the workflow manually). The site will be at `https://<your-username>.github.io/<repository-name>/` for a normal project repo.
3. For a **user** site (`<username>.github.io` with the site at the domain root), edit the workflow’s build step and set `VITE_BASE_PATH` to `/` instead of `/${{ github.event.repository.name }}/`.
4. Set **`VITE_CONTACT_EMAIL`** (and any other `VITE_*` vars) as **repository secrets** or **environment variables** for the workflow when you are ready—either inject them in the workflow `env` for the build step or use a hosting-specific mechanism.

To preview a project-site build locally:

```bash
VITE_BASE_PATH=/your-repo-name/ npm run build
npm run preview
```

## Scripts

| Command | Action |
|---------|--------|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Typecheck + Vite production build |
| `npm run preview` | Serve `dist/` |
| `npm run lint` | ESLint |
| `npm run format` | Prettier — write |
| `npm run format:check` | Prettier — check only (CI) |
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
