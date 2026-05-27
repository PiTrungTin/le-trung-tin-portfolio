# Implementation Plan - Portfolio Page Refactor

> Source: conversation context + current repository structure
> Date: 2026-05-27

## Refactor Goals

- Keep the single-canvas R3F architecture intact.
- Shift the experience toward a recruiter-facing portfolio with clearer reading flow.
- Reduce visual noise without removing the premium interactive feel.
- Align section copy and hierarchy with real backend/full-stack positioning.
- Make the DOM layer easier to maintain by tightening shared layout patterns.

## Current State Snapshot

- The app currently renders 6 DOM sections and 6 matching 3D scenes.
- Current order: `Hero`, `About`, `Skills`, `Projects`, `Experience`, `Contact`.
- The latest high-level direction is correct, but it is still too broad for execution.
- The existing code already moved away from heavy cyberpunk styling in several places, so the next step is a structured cleanup rather than a full rewrite.

## Target Content Structure

- `Hero`
- `About`
- `Skills`
- `Projects`
- `Experience`
- `Contact`

This keeps the existing 6-page scroll model and avoids unnecessary architectural churn.

## Phase 1: App-Level Structure And Narrative Order
**Owner/Skill**: `cyberpunk-page-designer`

### Step 1.1: Lock the final section narrative and labels
- [ ] Task: Confirm the recruiter-facing story for each section and normalize naming across page content, navigation labels, and modal language.
- [ ] File(s): `src/App.tsx`, `src/components/ui/Navigation.tsx`
- [ ] Verification: Section order in UI matches the plan and labels are consistent with section headings.

### Step 1.2: Create a shared section rhythm baseline
- [ ] Task: Standardize container width, vertical spacing, and heading rhythm so sections feel intentionally related instead of individually styled.
- [ ] File(s): `src/App.tsx`, `src/index.css`, `src/components/ui/SectionHeading.tsx`
- [ ] Verification: All sections align to the same horizontal grid and maintain consistent spacing on mobile and desktop.

### Step 1.3: Reduce ambient chrome that competes with content
- [ ] Task: Audit fixed background ornaments in `App.tsx` and keep only the elements that support depth without lowering readability.
- [ ] File(s): `src/App.tsx`
- [ ] Verification: Headings and body text remain readable over the background at all scroll positions.

## Phase 2: Hero Repositioning
**Owner/Skill**: `cyberpunk-page-designer`

### Step 2.1: Tighten the headline and supporting copy
- [ ] Task: Refine the hero so it states role, domain strength, and value proposition faster, with less decorative copy.
- [ ] File(s): `src/components/sections/hero/HeroSection.tsx`
- [ ] Verification: The first screen clearly communicates name, target role, and specialization within one quick read.

### Step 2.2: Rebalance CTA and credibility signals
- [ ] Task: Keep the main CTA path focused on projects/contact and reduce tag clutter if it weakens visual hierarchy.
- [ ] File(s): `src/components/sections/hero/HeroSection.tsx`, `src/components/ui/NeonButton.tsx`
- [ ] Verification: Primary and secondary actions are visually distinct and remain usable on small screens.

### Step 2.3: Simplify the hero side card
- [ ] Task: Turn the right-column card into a concise credibility summary instead of a second dense content block.
- [ ] File(s): `src/components/sections/hero/HeroSection.tsx`, `src/components/ui/HolographicCard.tsx`
- [ ] Verification: Hero content fits into a clean scan pattern without competing focal points.

## Phase 3: Middle-Page Information Architecture
**Owner/Skill**: `cyberpunk-page-designer`

### Step 3.1: Refactor About into a concise profile section
- [ ] Task: Reduce repeated statements between hero and about, and emphasize working style, domain context, and hiring relevance.
- [ ] File(s): `src/components/sections/about/AboutSection.tsx`
- [ ] Verification: About adds new information instead of repeating the hero.

### Step 3.2: Refactor Skills into decision-useful grouping
- [ ] Task: Reorganize skills by hiring signal, not by generic category alone, and surface strongest backend/full-stack capabilities first.
- [ ] File(s): `src/components/sections/skills/SkillsSection.tsx`
- [ ] Verification: A recruiter can identify core stack, secondary tools, and architecture strengths in under 15 seconds.

### Step 3.3: Refactor Projects around impact and context
- [ ] Task: Rewrite project cards so each item shows problem space, contribution, and technical outcome rather than broad summaries.
- [ ] File(s): `src/components/sections/projects/ProjectsSection.tsx`, `src/components/sections/projects/ProjectModal.tsx`
- [ ] Verification: Each project card and modal contains concrete technical context and differentiated value.

### Step 3.4: Refactor Experience to remove overlap with Projects
- [ ] Task: Keep experience timeline focused on role progression, scope, and ownership while letting projects carry the detailed case-study layer.
- [ ] File(s): `src/components/sections/experience/ExperienceSection.tsx`
- [ ] Verification: Experience reads as career progression, not a duplicate project list.

## Phase 4: Contact And Conversion
**Owner/Skill**: `cyberpunk-page-designer`

### Step 4.1: Decide whether contact form is real or presentational
- [ ] Task: Either connect the form to a real submission path or simplify it into direct contact actions if no backend/email flow is planned.
- [ ] File(s): `src/components/sections/contact/ContactSection.tsx`
- [ ] Verification: The contact area does not imply functionality that does not exist.

### Step 4.2: Improve conversion-oriented contact layout
- [ ] Task: Make the easiest next action obvious: email, LinkedIn, or resume-request path.
- [ ] File(s): `src/components/sections/contact/ContactSection.tsx`
- [ ] Verification: Contact options are scannable and actionable on both desktop and mobile.

## Phase 5: 3D And Effects Restraint Pass
**Owner/Skill**: `cyberpunk-page-designer`

### Step 5.1: Audit each section scene for content support
- [ ] Task: Review whether each `*Scene3D.tsx` still helps the new brighter, recruiter-facing direction.
- [ ] File(s): `src/components/canvas/SceneContainer.tsx`, `src/components/sections/**/*Scene3D.tsx`
- [ ] Verification: Every 3D scene has a clear purpose tied to section mood or transition.

### Step 5.2: Reduce unnecessary motion and visual competition
- [ ] Task: Tone down effects, particles, and glitch frequency where they distract from reading.
- [ ] File(s): `src/components/canvas/Effects.tsx`, `src/components/canvas/SceneController.tsx`, `src/components/canvas/SceneContainer.tsx`
- [ ] Verification: Scrolling feels polished, but text remains the dominant layer.

### Step 5.3: Re-check device-tier fallbacks after the visual pass
- [ ] Task: Ensure any scene/effect changes still degrade correctly across `high`, `medium`, and `low` tiers.
- [ ] File(s): `src/hooks/useDeviceTier.ts`, `src/components/canvas/Effects.tsx`, `src/components/canvas/SceneContainer.tsx`
- [ ] Verification: Low-tier devices keep the experience stable without broken visuals.

## Phase 6: Shared Component Cleanup
**Owner/Skill**: `cyberpunk-page-designer`

### Step 6.1: Normalize card and heading variants
- [ ] Task: Trim one-off style decisions and make `SectionHeading`, `HolographicCard`, and `NeonButton` easier to reuse consistently.
- [ ] File(s): `src/components/ui/SectionHeading.tsx`, `src/components/ui/HolographicCard.tsx`, `src/components/ui/NeonButton.tsx`
- [ ] Verification: Shared UI components expose the minimum variants needed by the refactored sections.

### Step 6.2: Align navigation with the refined content system
- [ ] Task: Update section labels, active-state styling, and spacing so navigation reflects the cleaner information architecture.
- [ ] File(s): `src/components/ui/Navigation.tsx`
- [ ] Verification: Navigation labels match visible section headings and active-state changes remain clear while scrolling.

## Phase 7: Final Validation
**Owner/Skill**: `cyberpunk-page-designer`

### Step 7.1: Responsive pass
- [ ] Task: Validate spacing, type scale, card stacking, and CTA usability across narrow and wide viewports.
- [ ] File(s): `src/App.tsx`, `src/components/sections/**/*.tsx`, `src/components/ui/*.tsx`
- [ ] Verification: No clipped content, awkward overflow, or unreadable density on mobile/tablet/desktop.

### Step 7.2: Build and lint verification
- [ ] Task: Run the standard project checks after refactor work is complete.
- [ ] File(s): repository-wide
- [ ] Verification: `npm run lint` and `npm run build`

## Recommended Execution Order

1. Phase 1
2. Phase 2
3. Phase 3
4. Phase 4
5. Phase 6
6. Phase 5
7. Phase 7

This order keeps content and layout decisions ahead of 3D tuning, which avoids reworking scenes against unstable DOM content.
