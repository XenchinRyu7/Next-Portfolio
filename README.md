# Saeful Rohman — Portfolio

Multi-page portfolio for **Saeful Rohman** — Computer Science student, mobile & fullstack developer, game developer, and AI engineer.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and a hand-rolled motion layer. Editorial-brutalist aesthetic: heavy display serif type, monospaced utility text, custom cursor, animated SVG grain, and a scroll-driven "level map" for the journey section.

## Pages

- `/` — **Home.** Hero, marquee, introduction (with portrait placeholder), vertical **journey map** (high school → mahasiswa → apprenticeship → AI engineer → boss level) that highlights the node currently at viewport center, skill disciplines, featured work, big CTA.
- `/about` — Bio, operating principles, detailed skill groups.
- `/work` — Projects grouped by discipline (Mobile, Fullstack, Game, AI).
- `/contact` — Direct channels + project-brief form.

## Design tokens

- Bone `#f2ede2` — background
- Ink `#0a0a0a` — foreground
- Acid `#d4ff2e` — primary accent
- Plum `#ff3d2e`, Cobalt `#2a2afe` — secondary accents
- Type: **Fraunces** (display serif), **Space Grotesk** (UI sans), **JetBrains Mono** (labels)

## Development

```bash
pnpm install
pnpm dev      # start dev server on :3000
pnpm lint     # ESLint
pnpm build    # production build
pnpm start    # serve built app
```

## Customising

- Drop a portrait at `public/saeful.jpg` (or similar) and swap the placeholder in `src/app/page.tsx` and `src/app/about/page.tsx` for an `<Image>`.
- Update `src/data/journey.ts`, `src/data/projects.ts`, and `src/data/skills.ts` with real content.
- Tune colours / type at the top of `src/app/globals.css`.

---

Built in Indonesia.
