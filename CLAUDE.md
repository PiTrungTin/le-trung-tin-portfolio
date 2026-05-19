# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```
npm run dev      # Start dev server (Vite HMR)
npm run build    # TypeScript check + production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

## Architecture

3D cyberpunk portfolio with a **single persistent `<Canvas>`** (R3F) using `@react-three/drei` `ScrollControls` for 6 virtual pages. DOM content overlays via `<Scroll html>`.

- **R3F Canvas** (`App.tsx`): Fixed WebGL context, `SceneSetup` (cyan/magenta lights + fog), `ScrollControls pages={6} damping={0.25}`
- **3D layer** (`<Scroll>`): `GridFloor` (custom GLSL shader), `Particles` (tier-aware point cloud), per-section 3D components, `Effects` (post-processing)
- **DOM layer** (`<Scroll html>`): 6 section components (`min-h-screen`), `Navigation` (fixed right side)
- **State**: Zustand store (`useStore`) — scroll progress, active section, mouse position, device tier, effects intensity, glitch trigger
- **Scroll → State bridge**: `useScrollManager` hook reads `scroll.offset` via `useFrame`, updates store
- **Device tiers**: `useDeviceTier` detects GPU (WebGL debug info) → `high | medium | low`, controls particle count, effects, DPR
- **Post-processing** (`Effects.tsx`): Bloom, Glitch (sporadic), ChromaticAberration, Noise (high only), Vignette — tier-aware
- **Section scroll mapping**: `scroll.range(sectionIdx/6, 1/6)` gives local 0→1 progress; `scroll.visible(sectionIdx/6, 1/6)` for culling
- **Styling**: TailwindCSS v4 with cyberpunk theme (cyan/magenta/yellow), Orbitron (display) + JetBrains Mono (body) fonts, CSS scanlines overlay

## Key patterns

- 3D section components use `scroll.range()` to drive opacity/transform fade-out and `scroll.visible()` for culling in `useFrame`
- Section transitions trigger glitch spikes via `triggerGlitchEffect()` in `SceneController`
- UI components (`GlitchText`, `NeonButton`, `HolographicCard`, `Navigation`) in `src/components/ui/`
- Each section has both a 3D scene component (`*Scene3D.tsx`) and a DOM component (`*Section.tsx`)
- Currently at Phase 3 (Hero). Phases 4-7 (About+Skills, Projects, Experience+Contact, Polish) are pending per `docs/plan.md`

## Dependencies

`@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `three`, `framer-motion`, `zustand`, `tailwindcss` v4
