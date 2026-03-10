# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`react-gsap-aos` is a lightweight GSAP + ScrollTrigger integration with AOS-like API, specifically designed for React/Next.js. This is a pnpm workspace monorepo with the core library and a Next.js demo application.

## Commands

### Monorepo Commands (from root)

```bash
pnpm build          # Build all packages
pnpm lint           # Lint all packages
pnpm dev            # Run dev mode for all packages
```

### Library Development (packages/react-gsap-aos)

```bash
pnpm build          # Production build with tsup (ESM + CJS + types)
pnpm dev            # Watch mode for development
pnpm lint           # Run ESLint
```

### Demo App (apps/nextjs)

```bash
pnpm dev            # Start Next.js dev server
pnpm build          # Build Next.js app
pnpm start          # Start production server
pnpm lint           # Run ESLint
```

## Architecture

### Library Structure (packages/react-gsap-aos)

The library has three entry points configured in tsup:

- `index.ts` - Types and utilities (server-safe exports)
- `client.ts` - Client components and hooks (requires `"use client"`)
- `constants.ts` - Animation constants

**Key directories:**

- `src/animation/` - Animation system core
  - `definitions.ts` - 34 animation presets with from/to configurations
  - `animations.ts` - Factory functions that create GSAP tweens
  - `createAnimation.ts` - Registry mapping animation names to functions
  - `constants.ts` - Easing and anchor placement constants
- `src/components/` - `AOSProvider` wrapper component
- `src/hooks/` - `useAOSScope` core hook
- `src/utils/` - Helper functions including `toAOSProps`

### Animation System Architecture

The animation system follows a layered approach:

1. **Definitions Layer** (`definitions.ts`): Defines animation presets with `from` and `to` states. Each animation has a base preset (fade/zoom/slide/flip) and custom vars for directional variants.

2. **Factory Layer** (`animations.ts`): Factory functions that take an element and options, merge preset + vars, and create GSAP tweens with ScrollTrigger.

3. **Registry Layer** (`createAnimation.ts`): Maps animation names (e.g., "fade-up") to factory functions. Called by `useAOSScope` when elements with `data-aos` attributes are detected.

4. **Hook Layer** (`useAOSScope.ts`): Core hook that:
   - Uses MutationObserver to track DOM changes (attributes, childList)
   - Uses ResizeObserver to track container height changes
   - Maintains WeakMap of element → GSAP tween instances
   - Batches ScrollTrigger.refresh() calls using requestAnimationFrame
   - Automatically adds/removes/updates animations based on DOM mutations

5. **Component Layer** (`AOSProvider.tsx`): Thin wrapper around `useAOSScope` that accepts a custom component prop and passes through HTML attributes.

### Data Flow

1. User adds `data-aos="fade-up"` to element inside `<AOSProvider>`
2. `useAOSScope` detects element via MutationObserver or initial query
3. Calls `createAnimation(element, options)` which:
   - Reads `data-aos` attribute to get animation name
   - Looks up factory function in ANIMATION_REGISTRY
   - Parses all `data-aos-*` attributes from element
   - Merges with default options from provider
4. Factory function creates GSAP tween with ScrollTrigger
5. Tween stored in WeakMap for cleanup on element removal
6. ScrollTrigger automatically handles scroll-based playback

### Important Implementation Details

**MutationObserver Strategy:**

- Observes `childList`, `subtree`, and `attributes` changes
- Filters attributes to only `data-aos-*` keys for performance
- Collects added/removed/updated elements in Sets before processing
- Processes in order: remove → add → update
- Batches ScrollTrigger.refresh() to avoid multiple calls per frame

**Animation Lifecycle:**

- Add: Create tween, store in WeakMap
- Update: Remove old tween (revert + kill), create new one
- Remove: Revert tween, kill it, delete from WeakMap
- WeakMap ensures automatic garbage collection

**ScrollTrigger Integration:**

- Each animation gets its own ScrollTrigger instance
- Trigger element is found by traversing up to `[data-aos-container]`
- Default trigger: `start: "top-bottom"` (element top hits viewport bottom)
- Supports 9 anchor placements via `data-aos-anchor-placement`
- `toggleActions: "play none none reverse"` (play on enter, reverse on leave back)
- Can be overridden with `once: true` or `mirror: false`

**Performance Considerations:**

- Uses `autoAlpha` instead of `opacity` for better performance
- Uses `translate3d` to trigger GPU acceleration
- Batches ScrollTrigger.refresh() calls
- WeakMap prevents memory leaks
- MutationObserver attribute filter reduces callback frequency

## Export Paths

The library uses conditional exports:

- `react-gsap-aos` - Server-safe types and utilities
- `react-gsap-aos/client` - Client components (AOSProvider, useAOSScope, refreshScrollTrigger)
- `react-gsap-aos/constants` - Animation/easing/placement constants

Always import client components from `/client` path and mark files with `"use client"` directive.

## Key Conventions

- **Package Manager**: Always use `pnpm` (specified in packageManager field)
- **Internal Imports**: Use `@/` alias (configured in tsconfig paths)
- **Client Directive**: All files importing from `/client` must have `"use client"` at top
- **Container Attribute**: Animated elements should be wrapped in `[data-aos-container]` for proper ScrollTrigger positioning
- **No Nesting**: Never nest `AOSProvider` or `useAOSScope` calls
- **Layout Changes**: Call `refreshScrollTrigger()` after DOM changes that affect layout (height/position changes)

## Common Patterns

### Adding New Animation

1. Add definition to `definitions.ts` with preset + vars
2. Add factory function to `animations.ts`
3. Add mapping to ANIMATION_REGISTRY in `createAnimation.ts`
4. Add type to Animation union in `types.ts`
5. Export constant in `constants.ts`

### Debugging Animations

Use `data-aos-markers={true}` to show ScrollTrigger debug markers showing trigger points.

### Performance Testing

The demo app includes a "Large Animations" tab that tests with 50-1000 animated elements. Use this to verify performance changes.
