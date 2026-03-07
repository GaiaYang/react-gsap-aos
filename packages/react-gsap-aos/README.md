# react-gsap-aos

[中文文檔](README.zh-TW.md) | English

A lightweight GSAP + ScrollTrigger integration with an AOS-like API, specifically designed for React and Next.js applications.

[![npm version](https://img.shields.io/npm/v/react-gsap-aos.svg)](https://www.npmjs.com/package/react-gsap-aos)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

[Live Demo](https://react-gsap-aos-nextjs.vercel.app) | [GitHub](https://github.com/GaiaYang/react-gsap-aos)

## What is react-gsap-aos?

`react-gsap-aos` bridges the gap between GSAP's powerful animation capabilities and the simplicity of AOS (Animate On Scroll). It provides:

- **Familiar API**: If you've used AOS, you already know how to use this
- **GSAP Power**: Built on GSAP + ScrollTrigger for smooth, performant animations
- **React-First**: Designed specifically for React and Next.js with proper SSR support
- **TypeScript**: Full type safety for animations, easings, and anchor placements
- **Automatic Cleanup**: Properly manages animation lifecycle with React's component lifecycle

### Problem It Solves

While AOS is great for vanilla JavaScript, integrating it with React can be problematic:

- Manual initialization and cleanup required
- Not SSR-friendly
- Limited TypeScript support
- Difficult to use with dynamic content

`react-gsap-aos` by React solution that automatically handles DOM mutations, component lifecycle, and SSR scenarios.

## Features

- 🎬 Scroll-triggered animations powered by GSAP + ScrollTrigger
- 🎯 AOS-like API with `data-aos` attributes
- ⚛️ Built for React / Next.js with SSR support
- 🔄 Automatic animation management with DOM mutations
- 📦 Multiple parallel scopes without interference
- 🎨 34 animation presets (fade, slide, flip, zoom variants)
- 🎭 17 easing options from GSAP
- 📍 9 anchor placement options for precise triggering
- 🧹 Automatic cleanup on component unmount
- 💪 Full TypeScript support

## Installation

```bash
npm install react-gsap-aos gsap @gsap/react
# or
yarn add react-gsap-aos gsap @gsap/react
# or
pnpm add react-gsap-aos gsap @gsap/react
```

### Peer Dependencies

- `react` >= 17
- `gsap` ^3.12.5
- `@gsap/react` ^2.1.2

## Quick Start

```tsx
import { AOSProvider } from "react-gsap-aos/client";

export default function Demo() {
  return (
    <AOSProvider className="overflow-hidden">
      <div data-aos-container>
        <div data-aos="fade-up" data-aos-offset="200">
          Hello AOS
        </div>
      </div>
    </AOSProvider>
  );
}
```

## Usage

### Setting up AOSProvider

Wrap your animated content with `AOSProvider`. All child elements with `data-aos` attributes will be automatically animated.

```tsx
import { AOSProvider } from "react-gsap-aos/client";

export default function Demo() {
  return (
    <AOSProvider className="overflow-hidden">
      {/* Your animated content */}
    </AOSProvider>
  );
}
```

> The `overflow-hidden` class prevents elements from overflowing during their initial animation state.

⚠️ **Important**: Do not nest `AOSProvider` components, as this will cause duplicate listeners and animations.

### Configuring Animations with Data Attributes

Use `data-aos-*` attributes to configure animation behavior:

```tsx
<div
  data-aos="fade-up"
  data-aos-offset={120}
  data-aos-delay={0}
  data-aos-duration={400}
  data-aos-easing="ease-out-cubic"
  data-aos-mirror={false}
  data-aos-once={false}
  data-aos-anchor-placement="top-bottom"
>
  Animated content
</div>
```

### Using toAOSProps Helper

For better TypeScript support and validation, use the `toAOSProps` helper:

```tsx
import { toAOSProps } from "react-gsap-aos";

<div
  {...toAOSProps({
    animation: "fade-up",
    offset: 120,
    delay: 0,
    duration: 400,
    easing: "power2.out",
    once: false,
    mirror: false,
    anchorPlacement: "top-bottom",
  })}
>
  Animated content
</div>;
```

### Container Positioning with data-aos-container

To ensure accurate ScrollTrigger calculations, mark parent containers with `data-aos-container`:

```tsx
<AOSProvider className="overflow-hidden">
  {/* ✅ Correct: Container specified */}
  <div data-aos-container>
    <div data-aos="fade-up" data-aos-offset="200">
      Hello AOS
    </div>
  </div>

  {/* ❌ Incorrect: May cause offset issues */}
  <div data-aos="fade-up" data-aos-offset="200">
    Hello AOS
  </div>
</AOSProvider>
```

Nested data-aos-container usage is **not recommended**:

```tsx
<div data-aos-container>
  <div data-aos="fade-up">Parent animation</div>

  <div data-aos-container>
    <div data-aos="zoom-in">Nested animation</div>
  </div>
</div>
```

Nested containers increase the complexity of animation initialization and ScrollTrigger refresh timing. While animations will still register, users need to manually call `ScrollTrigger.refresh()` at the appropriate time.

## API Reference

### AOSProvider

A wrapper component that provides animation scope for its children.

**Props:**

| Prop        | Type                        | Default     | Description                                |
| ----------- | --------------------------- | ----------- | ------------------------------------------ |
| `component` | `React.ElementType`         | `'div'`     | The container element to render            |
| `className` | `string`                    | `undefined` | CSS classes for the container              |
| `options`   | `Partial<AnimationOptions>` | `undefined` | Default animation options for all children |
| `children`  | `React.ReactNode`           | -           | Child elements                             |

**Example:**

```tsx
<AOSProvider
  component="section"
  className="overflow-hidden"
  options={{
    duration: 600,
    easing: "power2.out",
    once: true,
  }}
>
  {/* Children will inherit these default options */}
</AOSProvider>
```

> The default options only affect animations generated subsequently. This is intentional behavior.

### useAOSScope

The core hook that powers `AOSProvider`. Use this when you need direct control over the container ref.

```tsx
function useAOSScope<E extends HTMLElement = HTMLElement>(
  options?: Partial<AnimationOptions>,
): { containerRef: React.RefObject<E> };
```

**Example:**

```tsx
"use client";

import { useAOSScope } from "react-gsap-aos/client";

export default function Demo() {
  const { containerRef } = useAOSScope<HTMLDivElement>({
    easing: "bounce.out",
    duration: 800,
  });

  return (
    <div ref={containerRef} className="overflow-hidden">
      <div data-aos="fade-up">Animated content</div>
    </div>
  );
}
```

⚠️ **Important**:

- Do not nest `useAOSScope` calls
- Use in client components only (add `"use client"` directive)
- Avoid placing in `app/layout.tsx` for proper cleanup

**Parallel Usage:**

```tsx
function Demo() {
  return (
    <div>
      <Section1 />
      <Section2 />
    </div>
  );
}

function Section1() {
  const { containerRef } = useAOSScope<HTMLDivElement>();
  return <div ref={containerRef}>...</div>;
}

function Section2() {
  const { containerRef } = useAOSScope<HTMLDivElement>();
  return <div ref={containerRef}>...</div>;
}
```

### toAOSProps

Converts animation options to data attributes with type safety.

```tsx
import { toAOSProps } from "react-gsap-aos";

const props = toAOSProps({
  animation: "fade-up",
  duration: 600,
  easing: "power2.out",
});
// Returns: { "data-aos": "fade-up", "data-aos-duration": 600, ... }
```

### refreshScrollTrigger

Manually refresh AOS animation positions, wrapper around [`ScrollTrigger.refresh`](<https://gsap.com/docs/v3/Plugins/ScrollTrigger/refresh()>).

```tsx
import { refreshScrollTrigger } from "react-gsap-aos";

// Call after dynamic DOM changes
refreshScrollTrigger();
```

**Example with Dynamic Content:**

```tsx
"use client";

import { useState, useEffect } from "react";
import { AOSProvider, refreshAOS } from "react-gsap-aos/client";

export default function DynamicList() {
  const [visible, setVisible] = useState(true);
  const [items, setItems] = useState([1, 2, 3]);

  useEffect(() => {
    // Refresh after visible change
    refreshAOS();
  }, [visible]);

  return (
    <AOSProvider className="overflow-hidden">
      <button onClick={() => setVisible((e) => !e)}>switch visible</button>
      // When visible changes, the layout changes.
      {visible ? <div className="h-80" /> : null}
      <div data-aos-container>
        <div key={item} data-aos="fade-up">
          Hello AOS
        </div>
      </div>
    </AOSProvider>
  );
}
```

## Animation Options

| Option            | Type              | Data Attribute              | Default        | Description                    |
| ----------------- | ----------------- | --------------------------- | -------------- | ------------------------------ |
| `animation`       | `Animation`       | `data-aos`                  | `undefined`    | Animation type                 |
| `offset`          | `number`          | `data-aos-offset`           | `120`          | Offset (px) from trigger point |
| `delay`           | `number`          | `data-aos-delay`            | `0`            | Animation delay (ms)           |
| `duration`        | `number`          | `data-aos-duration`         | `400`          | Animation duration (ms)        |
| `easing`          | `Easing`          | `data-aos-easing`           | `"none"`       | Easing function                |
| `once`            | `boolean`         | `data-aos-once`             | `false`        | Animate only once              |
| `mirror`          | `boolean`         | `data-aos-mirror`           | `false`        | Reverse animation on scroll up |
| `anchorPlacement` | `AnchorPlacement` | `data-aos-anchor-placement` | `"top-bottom"` | Trigger position               |
| `markers`         | `boolean`         | `data-aos-markers`          | `false`        | ScrollTrigger markers          |

## Available Types

### Animation Types (34 total)

**Fade Animations:**

- `fade`, `fade-up`, `fade-down`, `fade-left`, `fade-right`
- `fade-up-right`, `fade-up-left`, `fade-down-right`, `fade-down-left`

**Flip Animations:**

- `flip-up`, `flip-down`, `flip-left`, `flip-right`

**Slide Animations:**

- `slide-up`, `slide-down`, `slide-left`, `slide-right`

**Zoom Animations:**

- `zoom-in`, `zoom-in-up`, `zoom-in-down`, `zoom-in-left`, `zoom-in-right`
- `zoom-out`, `zoom-out-up`, `zoom-out-down`, `zoom-out-left`, `zoom-out-right`

### Easing Types (17 total)

- `none`
- `power1`, `power1.in`, `power1.out`, `power1.inOut`
- `power2`, `power2.in`, `power2.out`, `power2.inOut`
- `power3`, `power3.in`, `power3.out`, `power3.inOut`
- `power4`, `power4.in`, `power4.out`, `power4.inOut`
- `back`, `back.in`, `back.out`, `back.inOut`
- `bounce`, `bounce.in`, `bounce.out`, `bounce.inOut`
- `circ`, `circ.in`, `circ.out`, `circ.inOut`
- `elastic`, `elastic.in`, `elastic.out`, `elastic.inOut`
- `expo`, `expo.in`, `expo.out`, `expo.inOut`
- `sine`, `sine.in`, `sine.out`, `sine.inOut`

### Anchor Placement Types (9 total)

Format: `[element-position]-[viewport-position]`

- `top-bottom`, `top-center`, `top-top`
- `center-bottom`, `center-center`, `center-top`
- `bottom-bottom`, `bottom-center`, `bottom-top`
