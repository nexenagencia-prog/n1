# OCTA Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and package a functional Next.js OCTA dashboard whose desktop rendering matches the supplied reference image exactly and whose secondary routes work.

**Architecture:** Use the reference image as the desktop visual baseline with semantic interactive hotspots layered over it. Add a reusable responsive shell for sub-900px layouts and all secondary routes. Keep assets local and dependencies minimal.

**Tech Stack:** Next.js 15, React 19, TypeScript, CSS, Lucide React.

**Spec:** `docs/superpowers/specs/2026-08-31-octa-dashboard-design.md`

## Global Constraints
- Desktop fidelity takes priority over creative interpretation.
- Use only local image assets at runtime.
- Create routes `/`, `/reunioes`, `/agenda`, `/contatos`, `/gravacoes`, `/octa-ai`, `/skills`, `/notificacoes`, `/configuracoes`.
- Package at most 100 files and exclude `node_modules`, `.next` and `.git`.
- `npm run build` must pass before ZIP creation.

---

### Task 1: Scaffold and visual asset
**Files:** Create project configs, app layout, global CSS, copy supplied reference to `public/images/octa-dashboard-reference.png`.
**Produces:** A buildable Next.js shell and local approved reference asset.
- [ ] Create package/config files with pinned compatible dependencies.
- [ ] Add layout metadata and global styles.
- [ ] Copy supplied image asset locally.
- [ ] Run dependency install.

### Task 2: Desktop dashboard with interactions
**Files:** Create `ReferenceDashboard.tsx`, `Hotspot.tsx`, dashboard CSS module.
**Produces:** Pixel-faithful desktop reference surface, routing hotspots, search shortcut and modal feedback.
- [ ] Implement scaled reference surface.
- [ ] Implement router-backed sidebar and CTA hotspots.
- [ ] Implement Command/Ctrl+K search focus and interaction panel.
- [ ] Implement profile/action overlays and recording/agenda interactions.

### Task 3: Responsive fallback and secondary routes
**Files:** Create mobile dashboard, app shell, section page and route files.
**Produces:** Usable responsive experience and no broken internal routes.
- [ ] Build compact mobile dashboard.
- [ ] Build reusable secondary route shell.
- [ ] Add all required route pages.

### Task 4: Verification and packaging
**Files:** README and package output.
**Produces:** Validated ZIP under 100 files.
- [ ] Run `npm run build` and repair all failures.
- [ ] Count source/package files excluding build/dependency/git dirs.
- [ ] Create `octa-dashboard-final.zip` with project root content only.
- [ ] Inspect ZIP list and verify file count.
