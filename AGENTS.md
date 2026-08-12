# OneAlgorithm — company website

**This is OneAlgorithm's own website.** It was started from the "Fusion Starter"
template, and the technical reference below is still accurate — but the identity
is not a template any more, and the rules in this section outrank the generic
advice further down.

Read `~/.codex/AGENTS.md` for the standing design process (banlist, gates,
design knowledge base). This file holds only what is specific to this repo.

## Current state

Branch `redesign/2026-refresh`. **All 27 pages rebuilt on one design system.**
**Not deployed.** Verified: `npx tsc --noEmit` clean · `node scripts/contrast-check.mjs`
20/20 · `npm test` 5/5 · `npm run build:client` clean.

## THE rule for this repo

**Build pages from the shared primitives in `client/components/site.tsx`** —
`PageHero`, `Section`, `SectionHeading`, `Card`, `CardGrid`, `ProcessSteps`,
`CheckList`, `CTABand`, `Split`, `Prose`, `PrimaryCTA`, `SecondaryCTA`.

If a page needs something new, **add it to `site.tsx`** rather than hand-rolling
it locally. That file is the only thing stopping the site drifting back into 27
different card styles, which is the state it was just rescued from.

## Brand constraints

- ⚠️ **`#ffa634` is 1.95:1 on white.** It fails contrast badly. Never use it for
  text, icons or borders on a light background. It is an accent on dark only.
- Run `node scripts/contrast-check.mjs` after any colour change. It is 20/20 now;
  keep it there.

## Facts that must NOT be invented or overstated

These have been checked and are easy to get wrong:

- The **17 organisations on `/capabilities` are PRIOR EMPLOYMENT of the team, not
  clients.** Never describe them as clients, customers or partners.
- **No government contract has been awarded yet.** Government copy describes
  *eligibility* only — never imply a win, an award or past performance.
- The company is in **Malvern, Pennsylvania** — not Philadelphia.
- **24/7 availability is real** and may be stated.
- Invent no other claims, statistics, certifications or testimonials.

## Before this branch merges

- **Delete `/legacy-home`.** The old homepage was kept temporarily for
  comparison and must not ship.
- ⚠️ **Scroll-reveal regression:** a scroll-reveal effect once hid content on 22
  of 27 prerendered pages — the prerendered HTML shipped with the content
  invisible to anything without JavaScript, search engines included. The guard
  now lives in **`scripts/prerender.mjs`** (it settles reveals before
  serialising, and fails on content that stays hidden). Do not weaken or skip it
  to make a build pass; the comment in that file records that this was not
  hypothetical.

## Gotchas

- **`npm install` hangs** — this is a pnpm workspace. Use `pnpm install`.
- Dev server runs on **:8080**, not the Vite default.

---

*Everything below is the original template's technical reference. It is still
correct about the stack and the file layout; it says nothing about OneAlgorithm.*

## Tech Stack

- **PNPM**: Prefer pnpm
- **Frontend**: React 18 + React Router 6 (spa) + TypeScript + Vite + TailwindCSS 3
- **Backend**: Express server integrated with Vite dev server
- **Testing**: Vitest
- **UI**: Radix UI + TailwindCSS 3 + Lucide React icons

## Project Structure

```
client/                   # React SPA frontend
├── pages/                # Route components (Index.tsx = home)
├── components/ui/        # Pre-built UI component library
├── App.tsx                # App entry point and with SPA routing setup
└── global.css            # TailwindCSS 3 theming and global styles

server/                   # Express API backend
├── index.ts              # Main server setup (express config + routes)
└── routes/               # API handlers

shared/                   # Types used by both client & server
└── api.ts                # Example of how to share api interfaces
```

## Key Features

## SPA Routing System

The routing system is powered by React Router 6:

- `client/pages/Index.tsx` represents the home page.
- Routes are defined in `client/App.tsx` using the `react-router-dom` import
- Route files are located in the `client/pages/` directory

For example, routes can be defined with:

```typescript
import { BrowserRouter, Routes, Route } from "react-router-dom";

<Routes>
  <Route path="/" element={<Index />} />
  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
  <Route path="*" element={<NotFound />} />
</Routes>;
```

### Styling System

- **Primary**: TailwindCSS 3 utility classes
- **Theme and design tokens**: Configure in `client/global.css` 
- **UI components**: Pre-built library in `client/components/ui/`
- **Utility**: `cn()` function combines `clsx` + `tailwind-merge` for conditional classes

```typescript
// cn utility usage
className={cn(
  "base-classes",
  { "conditional-class": condition },
  props.className  // User overrides
)}
```

### Express Server Integration

- **Development**: Single port (8080) for both frontend/backend
- **Hot reload**: Both client and server code
- **API endpoints**: Prefixed with `/api/`

#### Example API Routes
- `GET /api/ping` - Simple ping api
- `GET /api/demo` - Demo endpoint  

### Shared Types
Import consistent types in both client and server:
```typescript
import { DemoResponse } from '@shared/api';
```

Path aliases:
- `@shared/*` - Shared folder
- `@/*` - Client folder

## Development Commands

```bash
pnpm dev        # Start dev server (client + server)
pnpm build      # Production build
pnpm start      # Start production server
pnpm typecheck  # TypeScript validation
pnpm test          # Run Vitest tests
```

## Adding Features

### Add new colors to the theme

Open `client/global.css` and `tailwind.config.ts` and add new tailwind colors.

### New API Route
1. **Optional**: Create a shared interface in `shared/api.ts`:
```typescript
export interface MyRouteResponse {
  message: string;
  // Add other response properties here
}
```

2. Create a new route handler in `server/routes/my-route.ts`:
```typescript
import { RequestHandler } from "express";
import { MyRouteResponse } from "@shared/api"; // Optional: for type safety

export const handleMyRoute: RequestHandler = (req, res) => {
  const response: MyRouteResponse = {
    message: 'Hello from my endpoint!'
  };
  res.json(response);
};
```

3. Register the route in `server/index.ts`:
```typescript
import { handleMyRoute } from "./routes/my-route";

// Add to the createServer function:
app.get("/api/my-endpoint", handleMyRoute);
```

4. Use in React components with type safety:
```typescript
import { MyRouteResponse } from '@shared/api'; // Optional: for type safety

const response = await fetch('/api/my-endpoint');
const data: MyRouteResponse = await response.json();
```

### New Page Route
1. Create component in `client/pages/MyPage.tsx`
2. Add route in `client/App.tsx`:
```typescript
<Route path="/my-page" element={<MyPage />} />
```

## Production Deployment

- **Standard**: `pnpm build`
- **Binary**: Self-contained executables (Linux, macOS, Windows)
- **Cloud Deployment**: Use either Netlify or Vercel via their MCP integrations for easy deployment. Both providers work well with this starter template.

## Architecture Notes

- Single-port development with Vite + Express integration
- TypeScript throughout (client, server, shared)
- Full hot reload for rapid development
- Production-ready with multiple deployment options
- Comprehensive UI component library included
- Type-safe API communication via shared interfaces
