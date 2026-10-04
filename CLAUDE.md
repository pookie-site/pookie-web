# Pookie Web

Frontend of the Pookie online casino. Frontend only: the backend does not exist yet, so all data comes from typed API contracts with mocks. Claude writes the code now; a Vue team maintains it after MVP. Write code the way an ordinary Vue developer would, so it reads as idiomatic Nuxt.

## Stack

Nuxt 4, Vue 3 (`<script setup lang="ts">`, Composition API), TypeScript strict, pnpm. Planned: Tailwind with Figma tokens, shadcn-vue / Reka UI, Pinia, TanStack Query Vue, `@nuxtjs/i18n`, VeeValidate + zod, MSW, Playwright, Storybook. Add a planned library only when a feature needs it.

## Environment

The repo lives in WSL Ubuntu at `~/projects/pookie-web`. Never run node tooling for this repo from Windows: Smart App Control blocks native modules there. Node and gh live in user space, so non-login shells need:

```bash
export PATH="$HOME/.local/bin:$HOME/.local/node/bin:$PATH"
```

## Commands

```bash
pnpm dev         # dev server
pnpm lint        # ESLint (also formats: stylistic rules, no Prettier)
pnpm lint:fix
pnpm typecheck   # vue-tsc via nuxt typecheck
pnpm test        # Vitest
pnpm build
```

## Workflow

- Never commit to `main`; it is protected. Branch, then open a PR. CI must pass: lint, typecheck, test, build, audit, gitleaks, Semgrep.
- Conventional Commits (`feat:`, `fix:`, `chore:` ...). commitlint enforces it.
- Lefthook runs eslint and gitleaks on commit and typecheck on push. Do not skip hooks.
- Dependencies: pnpm only. `minimumReleaseAge` is 7 days; never lower it or add exclusions to get a fresh version. A new package with a build script needs an explicit entry in `allowBuilds`.

## Structure

Nuxt 4 conventions with `app/` as the source dir. Group by feature inside the standard folders instead of inventing new top-level ones:

```
app/
  pages/                 # routes only, compose feature components
  components/<feature>/  # e.g. components/catalog/GameCard.vue -> <CatalogGameCard>
  components/ui/         # design-system primitives (Button, Modal, Card)
  composables/
shared/
  contracts/             # zod schemas = the API contract with the backend
```

Features: auth, catalog, game, cashier, profile, limits, rewards, promo, home.

## Product rules

- **The client never computes money or progress.** Balance, wins, wheel results, XP and levels come from the API (mock today). The UI only displays them.
- **XP model (ADR-001):** XP is the single base for all rewards. XP only accumulates, never spent or burned. Level comes from accumulated XP. Wheels, lootboxes and other rewards unlock at marks on one common XP track, including between levels. Casino coins are the separate spendable currency.
- Progress widgets show the nearest milestone of any kind, not only the next level.

## Security

- No `v-html` (lint error). Untrusted HTML goes through a sanitizer.
- Auth tokens live in httpOnly cookies set by the backend, never in `localStorage`.
- Only public values in `NUXT_PUBLIC_*` / runtime config `public`.
- Game iframes: allowlisted providers only.

## Design

Design system and home page: Figma file key `byr5XCp0YkwOBy6cQXS8wA`, page "working". Rewards and XP: file "Pookie — Rewards", key `OLcCPoHbYaBmXZv5PcdDhp`. Design runs in parallel with code; screens without a layout get a wireframe built from base components and are replaced later. Figma MCP returns React + Tailwind; always convert it to a Vue SFC.

Tokens live in `app/assets/css/tokens.css`, generated from the Figma variables; never edit it by hand, re-export it instead.

- Chain: Mapped -> Alias -> Brand. Components use Mapped tokens only (`bg-button-primary-brand-background-default`, `text-table-cell-title`). Layout code may use Alias (`bg-surface-solid-s2`). Brand (`--brand-*`) is never used directly.
- Only Pookie tokens exist as colours and font sizes: the default Tailwind palette and `text-*` sizes are removed.
- Spacing (`p-m`, `gap-xl`), radius (`rounded-surface-small`) and font sizes switch by breakpoint: mob below `md`, tablet from `md`, desktop from `xl`.
- Text styles are utilities named after the Figma style: `type-heading-bold-h1`, `type-body-regular-m`, `type-table-header`.
- Fonts (Catamaran, Hind Madurai, Ubuntu) are self-hosted by `@nuxt/fonts`.

## Definition of Done

Works on mobile, has translations, has tests, has no a11y errors, has a Storybook story (once Storybook is set up).

## Tools

Never call any `mcp__labzbz__*` tool in this project; it belongs to a different company. It is denied in `.claude/settings.json`.
