# AGENTS.md

This file provides guidance to coding agents working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Vite HMR)
npm run build    # TypeScript check + production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

## Architecture

3D cyberpunk portfolio with a single persistent `<Canvas>` (R3F) using `@react-three/drei` `ScrollControls` for 6 virtual pages. DOM content overlays via `<Scroll html>`.

- `App.tsx`: fixed WebGL context, `SceneSetup` (cyan/magenta lights + fog), `ScrollControls pages={6} damping={0.25}`
- 3D layer (`<Scroll>`): `GridFloor` (custom GLSL shader), `Particles` (tier-aware point cloud), per-section 3D components, `Effects` (post-processing)
- DOM layer (`<Scroll html>`): 6 section components (`min-h-screen`), `Navigation` (fixed right side)
- State: Zustand store (`useStore`) for scroll progress, active section, mouse position, device tier, effects intensity, and glitch trigger
- Scroll-to-state bridge: `useScrollManager` reads `scroll.offset` via `useFrame` and updates the store
- Device tiers: `useDeviceTier` detects GPU capabilities via WebGL debug info and maps to `high | medium | low`; this controls particle count, effects, and DPR
- Post-processing (`Effects.tsx`): Bloom, Glitch (sporadic), ChromaticAberration, Noise (high only), Vignette; all tier-aware
- Section scroll mapping: `scroll.range(sectionIdx / 6, 1 / 6)` gives local 0→1 progress and `scroll.visible(sectionIdx / 6, 1 / 6)` supports culling
- Styling: TailwindCSS v4 with a cyberpunk palette (cyan/magenta/yellow), Orbitron display font, JetBrains Mono body font, and a scanline overlay

## Key Patterns

- 3D section components should use `scroll.range()` to drive opacity and transform transitions, and `scroll.visible()` to avoid unnecessary work in `useFrame`
- Section transitions trigger glitch spikes via `triggerGlitchEffect()` in `SceneController`
- Shared UI components live in `src/components/ui/` (`GlitchText`, `NeonButton`, `HolographicCard`, `Navigation`)
- Each section is expected to have both a 3D scene component (`*Scene3D.tsx`) and a DOM component (`*Section.tsx`)
- Project status in `CLAUDE.md` indicates Phase 3 (Hero) is complete, while later phases remain pending per `docs/plan.md`

## Working Guidance

- Preserve the single-canvas architecture; do not introduce per-section canvases
- Keep visual changes aligned with the existing cyberpunk design language unless the task explicitly changes direction
- Maintain device-tier awareness for any expensive rendering, particles, post-processing, or DPR changes
- Prefer small, composable section/UI components over monolithic scene logic
- Validate visual or rendering changes with `npm run build` and `npm run lint` when the change could affect typing, bundling, or shared components

## Dependencies

`@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `three`, `framer-motion`, `zustand`, `tailwindcss` v4
