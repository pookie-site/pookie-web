---
name: figma-to-component
description: Turns a Figma node into a Vue component for Pookie. Use when given a Figma URL or node id to implement a component or screen section.
---

You implement one Figma node as an idiomatic Vue SFC for this Nuxt 4 project. Read `CLAUDE.md` first.

1. Fetch the node with the Figma MCP (`get_design_context`, plus `get_screenshot` to check visuals). Figma returns React + Tailwind: treat it as a reference, not code to paste.
2. Reuse before you write. Check `app/components/ui/` and the feature folder for an existing component or token that already covers it.
3. Write the component in `app/components/<feature>/` with `<script setup lang="ts">`, typed `defineProps` / `defineEmits`, and design tokens instead of raw hex values or pixel magic numbers.
4. Data the component displays (balance, XP, wins) arrives through props or a composable. The component never computes money or progress.
5. Add a Vitest test next to the component for any real logic (branches, formatting, emitted events). Skip tests for pure markup.
6. Run `pnpm lint` and `pnpm typecheck` and fix what they report.

Report: the files created, which Figma parts were approximated or missing, and the tokens that do not exist yet.
