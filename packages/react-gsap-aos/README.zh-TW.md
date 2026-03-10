# react-gsap-aos

[English](README.en.md) | 中文文檔

輕量的 GSAP + ScrollTrigger 整合，用法類似 AOS，專為 React / Next.js 設計。

[![npm version](https://img.shields.io/npm/v/react-gsap-aos.svg)](https://www.npmjs.com/package/react-gsap-aos)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

[線上展示](https://react-gsap-aos-nextjs.vercel.app)

## 專案優勢

- **穩定的效能表現** - 基於 GSAP 與 ScrollTrigger，提供流暢的動畫體驗
- **自動監聽元素變化** - 動態追蹤 DOM 元素的新增與移除，自動註冊動畫（佈局變化需手動呼叫 `refreshScrollTrigger`）
- **專注高效能實現** - 專注於 AOS 核心功能，沒有多餘的功能負擔
- **完整 TypeScript 支援** - 提供完整的型別定義與型別安全

## 快速上手

### 基本使用

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

### 多個動畫元素

```tsx
"use client";

import { AOSProvider } from "react-gsap-aos/client";
import { toAOSProps } from "react-gsap-aos";

export default function Demo() {
  return (
    <AOSProvider className="overflow-hidden">
      <div data-aos-container>
        <div {...toAOSProps({ animation: "fade-up", duration: 600 })}>
          第一個區塊
        </div>
      </div>
      <div data-aos-container>
        <div {...toAOSProps({ animation: "zoom-in", delay: 200 })}>
          第二個區塊
        </div>
      </div>
      <div data-aos-container>
        <div {...toAOSProps({ animation: "slide-left", easing: "power2.out" })}>
          第三個區塊
        </div>
      </div>
    </AOSProvider>
  );
}
```

### 動態內容

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
        新增項目
      </button>
      <ul>
        {items.map((item) => (
          <li key={item} data-aos-container>
            <div {...toAOSProps({ animation: "fade-up" })}>項目 {item}</div>
          </li>
        ))}
      </ul>
    </AOSProvider>
  );
}
```

## API 參考

### AOSProvider

為子元素提供動畫範圍的包裝元件

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
  {/* 子元素 */}
</AOSProvider>;
```

**屬性**

| 名稱        | 型別                        | 預設值      | 說明                     |
| ----------- | --------------------------- | ----------- | ------------------------ |
| `component` | `React.ElementType`         | `'div'`     | 要渲染的區塊容器元素     |
| `className` | `string`                    | `undefined` | 容器的 CSS 類別          |
| `options`   | `Partial<AnimationOptions>` | `undefined` | 所有子元素的預設動畫選項 |
| `children`  | `React.ReactNode`           | -           | 子元素                   |

### useAOSScope

驅動 `AOSProvider` 的核心 hook，當需要直接控制容器 ref 時使用

```tsx
import { useAOSScope } from "react-gsap-aos/client";

function Demo() {
  const { containerRef } = useAOSScope<HTMLDivElement>({
    easing: "bounce.out",
    duration: 800,
  });

  return (
    <div ref={containerRef} className="overflow-hidden">
      <div data-aos="fade-up">動畫內容</div>
    </div>
  );
}
```

**參數**

| 名稱      | 型別                        | 說明         |
| --------- | --------------------------- | ------------ |
| `options` | `Partial<AnimationOptions>` | 動畫預設選項 |

**回傳值**

| 名稱           | 型別                 | 說明           |
| -------------- | -------------------- | -------------- |
| `containerRef` | `React.RefObject<E>` | 容器元素的 ref |

### toAOSProps

將動畫選項轉換為 data 屬性，具有型別安全

```tsx
import { toAOSProps } from "react-gsap-aos";

const props = toAOSProps({
  animation: "fade-up",
  duration: 600,
  easing: "power2.out",
});
// 回傳 { "data-aos": "fade-up", "data-aos-duration": 600, ... }
```

**參數**

| 名稱      | 型別                        | 說明     |
| --------- | --------------------------- | -------- |
| `options` | `Partial<AnimationOptions>` | 動畫選項 |

**回傳值**

回傳包含 `data-aos-*` 屬性的物件

### refreshScrollTrigger

手動刷新 AOS 動畫位置，封裝自 `ScrollTrigger.refresh`

```tsx
import { refreshScrollTrigger } from "react-gsap-aos";

// 在動態 DOM 變更後呼叫
refreshScrollTrigger();
```

**使用時機**

當佈局發生變化時需要手動呼叫，以下情況 GSAP 以及該套件已經替你解決

- 視窗大小改變
- 內容高度變化

但是以下情況礙於限制所以需要由使用者主動刷新

- 動態新增或移除非動畫元素

https://gsap.com/docs/v3/Plugins/ScrollTrigger/refresh()

## 型別定義

### AnimationOptions

動畫選項的完整型別定義

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

支援的動畫類型

- `fade`, `fade-up`, `fade-down`, `fade-left`, `fade-right`, `fade-up-right`,`fade-up-left`, `fade-down-right`, `fade-down-left`
- `flip-up`, `flip-down`, `flip-left`, `flip-right`
- `slide-up`, `slide-down`, `slide-left`, `slide-right`
- `zoom-in`, `zoom-in-up`, `zoom-in-down`, `zoom-in-left`, `zoom-in-right`, `zoom-out`, `zoom-out-up`, `zoom-out-down`, `zoom-out-left`, `zoom-out-right`

### Easing

支援的緩動函式

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

錨點位置類型，格式為 `[元素位置]-[視窗位置]`

- `top-bottom`, `top-center`, `top-top`
- `center-bottom`, `center-center`, `center-top`
- `bottom-bottom`, `bottom-center`, `bottom-top`

## 授權

MIT © [Gaia Yang](https://github.com/GaiaYang);

說明文件以及LLM [danielchim](https://github.com/danielchim)

## 致謝

動畫樣式靈感來自 [AOS](https://github.com/michalsnik/aos)

由 [GSAP](https://greensock.com/gsap) 和 [ScrollTrigger](https://greensock.com/scrolltrigger) 驅動
