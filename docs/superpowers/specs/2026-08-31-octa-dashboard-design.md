# OCTA Dashboard Design

## Goal
Recreate the supplied OCTA desktop dashboard reference with maximum visual fidelity while providing working navigation and key interactions, using a compact Next.js 15 TypeScript project that can be deployed to GitHub/Vercel and contains at most 100 packaged files.

## Visual strategy
The supplied 1665×945 reference image is the approved desktop design. At desktop widths the app will render that local reference as the visual baseline at the same aspect ratio, then place accessible interactive hit areas above the matching controls. This preserves exact typography, spacing, colors, texture, photography, glass effects, card geometry, calendar layout and icon placement without inventing visual details. The desktop surface scales proportionally for nearby desktop widths.

At widths below 900px the app switches to a responsive functional OCTA shell built from reusable React components so the product remains usable rather than shrinking the desktop reference beyond legibility.

## Architecture
- Next.js 15 App Router + TypeScript.
- `src/app/page.tsx` renders the dashboard surface.
- `src/components/dashboard/ReferenceDashboard.tsx` owns desktop reference rendering, hotspots and lightweight interaction panels.
- `src/components/dashboard/MobileDashboard.tsx` provides responsive tablet/mobile UI.
- `src/components/app/AppShell.tsx` is reused by secondary routes.
- Route pages exist for meetings, agenda, contacts, recordings, OCTA AI, Skills, notifications and settings.
- Local assets only under `public/images`.

## Interaction model
Desktop hotspots cover the Home/sidebar menu, primary CTAs, search, profile, next meeting, quick actions, OCTA AI, OCTA Skills, recent meeting entries, recording play targets and agenda days. Keyboard Command/Ctrl+K focuses the search overlay. Interactive overlays use translucent/hidden buttons so the supplied artwork remains unchanged until interaction, then small dialogs/panels appear above it.

## Packaging constraints
- No `node_modules`, `.next`, `.git`, cache or temporary files in ZIP.
- Target fewer than 80 project files, hard maximum 100.
- ZIP root directly contains `package.json`, `src`, `public`, etc.
- `npm run build` must succeed before packaging.
