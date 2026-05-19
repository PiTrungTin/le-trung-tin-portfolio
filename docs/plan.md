# 3D Cyberpunk Portfolio — Implementation Plan

## Context
Tạo portfolio 3D ấn tượng với phong cách Cyberpunk/Tech để gây ấn tượng với nhà tuyển dụng. Đây là dự án hoàn toàn mới, chưa có codebase.

## Tech Stack
- **React 18 + Vite + TypeScript**
- **@react-three/fiber** (R3F) — React renderer cho Three.js
- **@react-three/drei** — Utilities (ScrollControls, Float, Text, MeshTransmissionMaterial...)
- **@react-three/postprocessing** — Bloom, Glitch, ChromaticAberration, Noise, Vignette
- **Framer Motion** — DOM animations, transitions
- **TailwindCSS v4** — Styling với cyberpunk theme
- **Zustand** — State management (scroll, active section, device tier, effects)

## Architecture Overview

Single persistent `<Canvas>` với `ScrollControls` (6 pages = 6 sections). DOM content overlay qua `<Scroll html>`. 3D background (grid, particles) chạy xuyên suốt.

```
<App>
  <Canvas>                              // Single persistent WebGL context
    <SceneSetup />                      // Lights (cyan, magenta), fog
    <ScrollControls pages={6}>
      <Scroll>                          // 3D content layer
        <GridFloor />                   // Holographic grid (custom shader)
        <Particles />                   // 2000 points, additive blending
        <HeroScene3D />
        <AboutScene3D />
        <SkillsScene3D />
        <ProjectsScene3D />
        <ExperienceScene3D />
        <ContactScene3D />
      </Scroll>
      <Scroll html>                     // DOM overlay layer
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <ContactSection />
        </main>
      </Scroll>
    </ScrollControls>
    <Effects />                         // Post-processing stack
  </Canvas>
  <Navigation />                        // Fixed side nav
  <ProjectModal />                      // Portal modal
</App>
```

## Project Structure

```
cyberpunk-portfolio/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── store/useStore.ts              # Zustand: scroll, section, device tier
│   ├── constants/                     # skills.ts, projects.ts, experience.ts, theme.ts
│   ├── hooks/
│   │   ├── useScrollManager.ts        # Bridge useScroll() -> store
│   │   └── useDeviceTier.ts          # GPU detection -> quality tiers
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── SceneContainer.tsx     # Canvas + ScrollControls wrapper
│   │   │   ├── SceneSetup.tsx         # Lighting, fog
│   │   │   ├── Effects.tsx            # Post-processing (tier-aware)
│   │   │   ├── GridFloor.tsx         # Custom shader holographic grid
│   │   │   └── Particles.tsx         # Point cloud
│   │   ├── sections/
│   │   │   ├── hero/HeroSection.tsx + HeroScene3D.tsx
│   │   │   ├── about/AboutSection.tsx + AboutScene3D.tsx
│   │   │   ├── skills/SkillsSection.tsx + SkillsScene3D.tsx + SkillOrb3D.tsx
│   │   │   ├── projects/ProjectsSection.tsx + ProjectsScene3D.tsx + ProjectCard3D.tsx + ProjectModal.tsx
│   │   │   ├── experience/ExperienceSection.tsx + ExperienceScene3D.tsx + Timeline3D.tsx
│   │   │   └── contact/ContactSection.tsx + ContactScene3D.tsx
│   │   └── ui/
│   │       ├── GlitchText.tsx          # CSS glitch effect
│   │       ├── NeonButton.tsx         # Neon glow button
│   │       ├── HolographicCard.tsx    # Glass card with scanline
│   │       ├── SectionHeading.tsx     # Consistent section titles
│   │       ├── Navigation.tsx         # Side nav dots
│   │       └── LoadingScreen.tsx      # Suspense fallback
```

## Key Design Decisions

### 1. Single Canvas with ScrollControls
- Một WebGL context duy nhất, không remount
- Post-processing stack dùng chung, seamless transitions
- Particles & grid floor persist, không bị gián đoạn
- `damping={0.25}` tạo inertia mượt khi scroll

### 2. Section Scroll Mapping
```
scroll.offset:  0---------1---------2---------3---------4---------5---------6
                | Hero    | About   | Skills  | Proj    | Exp     | Contact |
```
Mỗi section component dùng `scroll.range(idx/6, 1/6)` để lấy local progress (0→1) và `scroll.visible(idx/6, 1/6)` để culling.

### 3. Post-Processing Stack (Tier-Aware)
| Effect | High | Medium | Low |
|--------|------|--------|-----|
| Bloom | on | on | off |
| Glitch (sporadic) | on | on | off |
| ChromaticAberration | on | on | off |
| Noise (film grain) | on | off | off |
| Vignette | on | on | on |

### 4. Visibility Animation Pattern
Mỗi section 3D component dùng `useFrame`:
```typescript
const sectionProgress = scroll.range(sectionIndex / 6, 1 / 6);
const isVisible = scroll.visible(sectionIndex / 6, 1 / 6);
// Dùng sectionProgress để drive transforms (fade, move, scale)
// Dùng isVisible để culling optimization
```

## Visual Effects Plan

### 3D Layer
- **GridFloor**: Custom ShaderMaterial với animated UV grid, neon cyan, edge falloff dạng fresnel
- **Particles**: 2000 points, AdditiveBlending, sizeAttenuation, float slowly
- **Hero**: Floating wireframe geometries (octahedron, torus, icosahedron) với emissive cyan/magenta/yellow
- **About**: MeshDistortMaterial holographic figure, scanning line effect
- **Skills**: MeshTransmissionMaterial orbs (glass-like) trong 3D grid, rotate + hover scale
- **Projects**: RoundedBox cards với neon border, tilt-toward-mouse parallax
- **Experience**: 3D holographic timeline, neon nodes pulse, đường line draw theo scroll
- **Contact**: Floating shapes orbit, tilt toward mouse

### DOM Layer (CSS Effects)
- **GlitchText**: data-text + pseudo-elements với clip-path animation
- **Neon borders**: layered box-shadow glow (cyan/magenta)
- **ScanLines overlay**: CSS repeating-linear-gradient animation toàn trang
- **HolographicCard**: backdrop-blur + gradient border + scanline sweep
- **Cyberpunk fonts**: Orbitron (headings), JetBrains Mono (body)

## Data Flow
```
Browser Scroll → drei ScrollControls → scroll.offset
  ├── useScroll() in 3D components → useFrame() drives transforms
  └── useScrollManager → Zustand store
        ├── activeSection → Navigation, Effects intensity
        ├── scrollProgress → global lerp
        └── mousePosition → 3D parallax
```

## Performance Strategy
- **useDetectGPU** để detect device tier (high/medium/low) → tự động giảm effects
- **AdaptiveDpr** + **PerformanceMonitor** trong Canvas
- Memoized geometries & materials (dùng chung neon cyan/magenta/yellow materials)
- Lazy loading từng section 3D component với Suspense riêng
- Particles count: 2000 (high), 1000 (medium), 300 (low)
- `frameloop="demand"` + manual `invalidate()` từ scroll listener để tiết kiệm pin

## Implementation Phases

### Phase 1: Foundation
Scaffold project, Canvas + ScrollControls hoạt động, post-processing Bloom, placeholder DOM sections
- `npm create vite` + install deps + TailwindCSS cyberpunk theme
- `SceneContainer`, `SceneSetup`, `Effects` (Bloom only)
- `useStore` (Zustand), `useScrollManager`
- 6 placeholder DOM sections (`min-h-screen`)
- Verify: scroll mượt qua 6 sections

### Phase 2: Scene Environment
Background 3D atmosphere xuyên suốt
- `GridFloor` (custom GLSL shader)
- `Particles` (2000 points)
- Full `Effects` stack (Bloom + ChromaticAberration + Noise + Vignette + Glitch)
- `useDeviceTier` with quality presets

### Phase 3: Hero Section
Ấn tượng đầu tiên
- `HeroScene3D`: wireframe geometries + Float + scroll-driven fade out
- `HeroSection` DOM: `GlitchText` name, subtitle, `NeonButton` CTA
- `GlitchText`, `NeonButton`, `Navigation` components

### Phase 4: About + Skills
- `AboutScene3D`: holographic figure với scanline
- `AboutSection` DOM: bio text, stats cards
- `HolographicCard` component
- `SkillsScene3D` + `SkillOrb3D`: interactive orbs trong grid
- `SkillsSection` DOM: skill list

### Phase 5: Projects
- `ProjectsScene3D` + `ProjectCard3D`: floating cards với hover parallax
- `ProjectsSection` DOM: project list
- `ProjectModal`: Framer Motion modal với project details

### Phase 6: Experience + Contact
- `ExperienceScene3D` + `Timeline3D`: holographic neon timeline
- `ExperienceSection` DOM: job cards
- `ContactScene3D`: interactive floating shapes
- `ContactSection` DOM: form + social links

### Phase 7: Polish
- Section transition glitch spikes
- Mobile responsive (giảm complexity, touch-friendly nav)
- Loading screen + ErrorBoundary
- Cross-browser test + performance audit

## Verification Plan
1. `npm run dev` → portfolio hiển thị, scroll mượt qua 6 sections
2. Bloom glow visible trên neon elements
3. Click navigation dots → scroll đến section đúng
4. Hover project cards → 3D tilt effect hoạt động
5. Resize browser → responsive, không vỡ layout
6. Mở trên mobile → fallback nhẹ hơn, vẫn readable
7. `npm run build` → bundle < 300KB gzipped
8. Lighthouse: Performance > 85, Accessibility > 95
