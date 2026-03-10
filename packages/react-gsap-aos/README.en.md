# react-gsap-aos

English | [中文文檔](README.zh-TW.md)

A lightweight GSAP + ScrollTrigger integration with an AOS-like API, specifically designed for React and Next.js applications.

[![npm version](https://img.shields.io/npm/v/react-gsap-aos.svg)](https://www.npmjs.com/package/react-gsap-aos)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

[Live Demo](https://react-gsap-aos-nextjs.vercel.app)

## Project Advantages

This is a monorepo managed with pnpm workspaces.

- **Stable Performance** - Built on GSAP and ScrollTrigger, delivers smooth animation experience
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
        <h1 {...toAOSProps({ animation: "fade-up" })}>Hello World</h1>
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
      <div data-aos-container>
        <div {...toAOSProps({ animation: "fade-up", duration: 600 })}>
          First Block
        </div>
      </div>
      <div data-aos-container>
        <div {...toAOSProps({ animation: "zoom-in", delay: 200 })}>
          Second Block
        </div>
      </div>
      <div data-aos-container>
        <div {...toAOSProps({ animation: "slide-left", easing: "power2.out" })}>
          Third Block
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
            <div {...toAOSProps({ animation: "fade-up" })}>Item {item}</div>
          </li>
        ))}
      </ul>
    </AOSProvider>
  );
}
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
</AOSProvider>;
```

**Props**

| Name        | Type                        | Default     | Description                                |
| ----------- | --------------------------- | ----------- | ------------------------------------------ |
| `component` | `React.ElementType`         | `'div'`     | Container element to render                |
| `className` | `string`                    | `undefined` | CSS class for container                    |
| `options`   | `Partial<AnimationOptions>` | `undefined` | Default animation options for all children |
| `children`  | `React.ReactNode`           | -           | Child elements                             |

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

| Name      | Type                        | Description               |
| --------- | --------------------------- | ------------------------- |
| `options` | `Partial<AnimationOptions>` | Default animation options |

**Returns**

| Name           | Type                 | Description               |
| -------------- | -------------------- | ------------------------- |
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

| Name      | Type                        | Description       |
| --------- | --------------------------- | ----------------- |
| `options` | `Partial<AnimationOptions>` | Animation options |

**Returns**

Returns an object containing `data-aos-*` attributes

### refreshScrollTrigger

Manually refresh AOS animation positions, wraps `ScrollTrigger.refresh`

```tsx
import { refreshScrollTrigger } from "react-gsap-aos";

// Call after dynamic DOM changes
refreshScrollTrigger();
```

**When to Use**

Call manually when layout changes occur, GSAP and its library have already addressed the following scenarios for you.

- Window resize
- Content height changes

However, due to certain limitations, the following situations require users to manually refresh.

- Dynamically adding or removing large elements

https://gsap.com/docs/v3/Plugins/ScrollTrigger/refresh()

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

Supported animation types

- `fade`, `fade-up`, `fade-down`, `fade-left`, `fade-right`, `fade-up-right`, `fade-up-left`, `fade-down-right`, `fade-down-left`
- `flip-up`, `flip-down`, `flip-left`, `flip-right`
- `slide-up`, `slide-down`, `slide-left`, `slide-right`
- `zoom-in`, `zoom-in-up`, `zoom-in-down`, `zoom-in-left`, `zoom-in-right`, `zoom-out`, `zoom-out-up`, `zoom-out-down`, `zoom-out-left`, `zoom-out-right`

### Easing

Supported easing functions

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
