<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

BookNook frontend — a single-package Next.js 16.4.3 App Router app (not a monorepo). All app code lives in `src/`.

## Commands

- Dev: `npm run dev` (Turbopack; `next dev` also restores the managed block above — commit it, don't fight it)
- Lint: `npm run lint` (flat-config ESLint 9, `eslint.config.mjs`; runs bare `eslint`, no path args)
- Typecheck: `npx tsc --noEmit` — there is **no** `typecheck` script
- Build: `npm run build` (runs typecheck as part of the build)
- Tests: **none exist** — no test runner, script, or CI workflow in this repo. Don't add tests or hunt for a test command.

Verification order: `npm run lint` → `npx tsc --noEmit` → `npm run build`.

## Stack quirks (differs from defaults)

- **Next.js 16**: training data is stale. Local docs: `node_modules/next/dist/docs/` (`01-app/`, `02-pages/`, …). Note the typed layout signature `LayoutProps<"/">` in `src/app/layout.tsx`.
- **React Compiler is on** (`reactCompiler: true` in `next.config.ts`, `babel-plugin-react-compiler` dep) — components must be React Compiler-compatible.
- **Tailwind CSS v4, CSS-first**: no `tailwind.config`; theme lives in `src/app/globals.css` (`@import "tailwindcss"`, `@theme inline`, oklch CSS vars). Tailwind is wired via a Turbopack loader rule in `next.config.ts` — don't add a config file or PostCSS config.
- **shadcn/ui, style `base-nova`** (`components.json`): primitives come from **`@base-ui/react`, not Radix** — generated components import e.g. `@base-ui/react/button`. Add components with the shadcn CLI (`npx shadcn add ...`), don't hand-copy Radix examples from tutorials.
- **`cn` is an npm package** (dependency), re-exported from `src/lib/utils.ts`. `import { cn } from "cn"` (or `from "@/lib/utils"`) — don't recreate the usual clsx/tailwind-merge helper.
- Import alias: `@/*` → `src/*` (tsconfig `paths`).

## Layout of `src/`

- `src/app/` — routes only: `layout.tsx`, `page.tsx` (home), `globals.css`
- `src/components/ui/` — shadcn-generated primitives (currently `button.tsx`)
- `src/lib/utils.ts` — `cn` re-export
