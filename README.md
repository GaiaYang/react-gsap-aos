# react-gsap-aos

[react-gsap-aos](/packages/react-gsap-aos)

[中文文檔](README.zh-TW.md) | English

## Project Advantages

- **Stable Performance** - Built on GSAP and ScrollTrigger, delivers smooth 60fps animation experience
- **Automatic Element Tracking** - Dynamically tracks DOM element additions and removals, automatically registers animations (layout changes require manual `refreshScrollTrigger` call)
- **Focused High-Performance Implementation** - Concentrates on core AOS functionality without unnecessary features
- **Full TypeScript Support** - Provides complete type definitions and type safety.

## Quick Start

### Basic Usage

```tsx
"use client";

import { AOSProvider } from "react-gsap-aos/client";
import { toAOSProps } from "react-gsap-aos";

export default function App() {
  return (
    <AOSProvider className="overflow-hidden">
      <div data-aos-container>
        <h1 {...toAOSProps({ animation: "fade-up" })}>
          Hello World
        </h1>
      </div>
    </AOSProvider>
  );
}
```

### Multiple Animated Elements

```tsx
"use client";

import { AOSProvider } from "react-gsap-aos/client";
import { toAOSProps } from "react-gsap-aos";

export default function Demo() {
  return (
    <AOSProvider className="overflow-hidden">
      <div data-aos-container className="space-y-4">
        <div {...toAOSProps({ animation: "fade-up", duration: 600 })}>
          First Block
        </div>
        <div {...toAOSProps({ animation: "zoom-in", delay: 200 })}>
          Second Block
        </div>
        <div {...toAOSProps({ animation: "slide-left", easing: "power2.out" })}>
          Third Block
        </div>
      </div>
    </AOSProvider>
  );
}
```

### Sequential Animations

For sequential animations, use stagger delays instead of nesting `data-aos-container`. Nested containers are not recommended as they may cause timing issues.

```tsx
"use client";

import { AOSProvider } from "react-gsap-aos/client";
import { toAOSProps } from "react-gsap-aos";

export default function Card() {
  return (
    <AOSProvider className="overflow-hidden">
      <div data-aos-container>
        <div {...toAOSProps({ animation: "fade-up", duration: 400 })} className="card">
          <img {...toAOSProps({ animation: "zoom-in", delay: 100 })} src="..." alt="..." />
          <h2 {...toAOSProps({ animation: "slide-right", delay: 200 })}>
            Title
          </h2>
          <button {...toAOSProps({ animation: "slide-left", delay: 300 })}>
            Button
          </button>
        </div>
      </div>
    </AOSProvider>
  );
}
```

### Dynamic Content

```tsx
"use client";

import { useState, useEffect } from "react";
import { AOSProvider, refreshScrollTrigger } from "react-gsap-aos/client";
import { toAOSProps } from "react-gsap-aos";

export default function DynamicList() {
  const [items, setItems] = useState([1, 2, 3]);

  useEffect(() => {
    refreshScrollTrigger();
  }, [items]);

  return (
    <AOSProvider className="overflow-hidden">
      <button onClick={() => setItems([...items, items.length + 1])}>
        Add Item
      </button>
      <ul>
        {items.map((item) => (
          <li key={item} data-aos-container>
            <div {...toAOSProps({ animation: "fade-up" })}>
              Item {item}
            </div>
          </li>
        ))}
      </ul>
    </AOSProvider>
  );
}
```

## Development Setup

```bash
# Install dependencies
pnpm install

# Build the library
cd packages/react-gsap-aos
pnpm dev

# Run the demo app
cd apps/nextjs
pnpm dev
```

## Project Structure

```
react-gsap-aos/
├── packages/
│   └── react-gsap-aos/     # Core library
│       ├── src/
│       │   ├── animation/  # Animation definitions
│       │   ├── components/ # AOSProvider
│       │   ├── hooks/      # useAOSScope
│       │   └── types.ts    # TypeScript types
│       └── package.json
└── apps/
    └── nextjs/             # Demo application
        └── src/
```

## Conventions

- Use `pnpm` as package manager
- Use `@/` alias for internal imports
- Export paths
  - `react-gsap-aos` - Types and utilities
  - `react-gsap-aos/client` - Client-side components and hooks
  - `react-gsap-aos/constants` - Animation constants

## Building

The library uses `tsup` for bundling with three entry points

- `index.ts` - Main exports
- `client.ts` - Client components
- `constants.ts` - Constants

```bash
cd packages/react-gsap-aos
# Watch mode
pnpm dev
# Production build
pnpm build
```

## API Reference

### AOSProvider

Wrapper component that provides animation scope for child elements

```tsx
import { AOSProvider } from "react-gsap-aos/client";

<AOSProvider
  component="section"
  className="overflow-hidden"
  options={{
    duration: 600,
    easing: "power2.out",
    once: true,
  }}
>
  {/* Children */}
</AOSProvider>
```

**Props**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `component` | `React.ElementType` | `'div'` | Container element to render |
| `className` | `string` | `undefined` | CSS class for container |
| `options` | `Partial<AnimationOptions>` | `undefined` | Default animation options for all children |
| `children` | `React.ReactNode` | - | Child elements |

### useAOSScope

Core hook that powers `AOSProvider`, use when you need direct control over container ref

```tsx
import { useAOSScope } from "react-gsap-aos/client";

function Demo() {
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

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Partial<AnimationOptions>` | Default animation options |

**Returns**

| Name | Type | Description |
| --- | --- | --- |
| `containerRef` | `React.RefObject<E>` | Ref for container element |

### toAOSProps

Converts animation options to data attributes with type safety

```tsx
import { toAOSProps } from "react-gsap-aos";

const props = toAOSProps({
  animation: "fade-up",
  duration: 600,
  easing: "power2.out",
});
// Returns { "data-aos": "fade-up", "data-aos-duration": 600, ... }
```

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Partial<AnimationOptions>` | Animation options |

**Returns**

Returns an object containing `data-aos-*` attributes

### refreshScrollTrigger

Manually refresh AOS animation positions, wraps `ScrollTrigger.refresh`

```tsx
import { refreshScrollTrigger } from "react-gsap-aos/client";

// Call after dynamic DOM changes
refreshScrollTrigger();
```

**When to Use**

Call manually when layout changes occur, such as

- Dynamically adding or removing large elements
- Window resize
- Content height changes

## Type Definitions

### AnimationOptions

Complete type definition for animation options

```tsx
interface AnimationOptions {
  animation?: Animation;
  offset?: number;
  delay?: number;
  duration?: number;
  easing?: Easing;
  once?: boolean;
  mirror?: boolean;
  anchorPlacement?: AnchorPlacement;
  markers?: boolean;
}
```

### Animation

Supported animation types (27 total)

- Fade animations `fade`, `fade-up`, `fade-down`, `fade-left`, `fade-right`, `fade-up-right`, `fade-up-left`, `fade-down-right`, `fade-down-left`
- Flip animations `flip-up`, `flip-down`, `flip-left`, `flip-right`
- Slide animations `slide-up`, `slide-down`, `slide-left`, `slide-right`
- Zoom animations `zoom-in`, `zoom-in-up`, `zoom-in-down`, `zoom-in-left`, `zoom-in-right`, `zoom-out`, `zoom-out-up`, `zoom-out-down`, `zoom-out-left`, `zoom-out-right`

### Easing

Supported easing functions (41 total)

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

### AnchorPlacement

Anchor placement types (9 total), format is `[element-position]-[viewport-position]`

- `top-bottom`, `top-center`, `top-top`
- `center-bottom`, `center-center`, `center-top`
- `bottom-bottom`, `bottom-center`, `bottom-top`

## License

MIT © [Gaia Yang](https://github.com/GaiaYang)

Documentation and LLM [danielchim](https://github.com/danielchim)

## Credits

Animation styles inspired by [AOS](https://github.com/michalsnik/aos)

Powered by [GSAP](https://greensock.com/gsap) and [ScrollTrigger](https://greensock.com/scrolltrigger)
