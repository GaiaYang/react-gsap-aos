# react-gsap-aos

[English](README.en.md) | 中文文檔

輕量的 GSAP + ScrollTrigger 整合，用法類似 AOS，專為 React / Next.js 設計。

[![npm version](https://img.shields.io/npm/v/react-gsap-aos.svg)](https://www.npmjs.com/package/react-gsap-aos)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

[線上展示](https://react-gsap-aos-nextjs.vercel.app)

## 什麼是 react-gsap-aos？

`react-gsap-aos` 結合了 GSAP 強大的動畫能力與 AOS（Animate On Scroll）的簡潔性。它提供：

- **熟悉的 API**：如果你用過 AOS，就已經知道如何使用
- **GSAP 的強大功能**：基於 GSAP + ScrollTrigger 打造流暢、高效能的動畫
- **React 優先**：專為 React 和 Next.js 設計，完整支援 SSR
- **TypeScript**：動畫、緩動函式和錨點位置的完整型別安全
- **自動清理**：正確管理動畫生命週期與 React 元件生命週期

### 解決的問題

雖然 AOS 很適合原生 JavaScript，但整合到 React 會有問題：

- 需要手動初始化和清理
- 不支援 SSR
- TypeScript 支援有限
- 難以處理動態內容

`react-gsap-aos` 透過 React 來解決這些問題，自動處理 DOM 變更、元件生命週期和 SSR 場景。

## 功能特色

- 🎬 基於 GSAP + ScrollTrigger 的捲動觸發動畫
- 🎯 類似 AOS 的 API，使用 `data-aos` 屬性
- ⚛️ 為 React / Next.js 打造，支援 SSR
- 🔄 自動管理 DOM 變更的動畫
- 📦 支援多個平行範圍，互不干擾
- 🎨 34 種動畫預設（fade、slide、flip、zoom 變化）
- 🎭 17 種 GSAP 緩動選項
- 📍 9 種錨點位置選項，精確觸發
- 🧹 元件卸載時自動清理
- 💪 完整 TypeScript 支援

## 安裝

```bash
npm install react-gsap-aos gsap @gsap/react
# 或
yarn add react-gsap-aos gsap @gsap/react
# 或
pnpm add react-gsap-aos gsap @gsap/react
```

### 相依套件版本

- `react` >= 17
- `gsap` ^3.12.5
- `@gsap/react` ^2.1.2

## 快速開始

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

## 使用方式

### 設置 AOSProvider

用 `AOSProvider` 包覆你的動畫內容。所有帶有 `data-aos` 屬性的子元素都會自動產生動畫。

```tsx
import { AOSProvider } from "react-gsap-aos/client";

export default function Demo() {
  return (
    <AOSProvider className="overflow-hidden">{/* 你的動畫內容 */}</AOSProvider>
  );
}
```

> `overflow-hidden` 類別可防止元素在初始動畫狀態時溢出。

⚠️ **重要**：不要巢狀使用 `AOSProvider` 元件，這會造成重複的監聽器和動畫。

### 使用 Data Attributes 設定動畫

使用 `data-aos-*` 屬性來設定動畫行為：

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
  動畫內容
</div>
```

### 使用 toAOSProps 輔助函式

為了更好的 TypeScript 支援和驗證，使用 `toAOSProps` 輔助函式：

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
  動畫內容
</div>;
```

### 使用 data-aos-container 定位容器

為確保 ScrollTrigger 計算準確，請在父容器標記 `data-aos-container`：

```tsx
<AOSProvider className="overflow-hidden">
  {/* ✅ 正確：已指定容器 */}
  <div data-aos-container>
    <div data-aos="fade-up" data-aos-offset="200">
      Hello AOS
    </div>
  </div>

  {/* ❌ 錯誤：可能導致偏移問題 */}
  <div data-aos="fade-up" data-aos-offset="200">
    Hello AOS
  </div>
</AOSProvider>
```

⚠️ **不建議**使用巢狀容器：

```tsx
<div data-aos-container>
  <div data-aos="fade-up">父層動畫</div>

  <div data-aos-container>
    <div data-aos="zoom-in">巢狀動畫</div>
  </div>
</div>
```

巢狀容器會增加動畫初始化與 ScrollTrigger 刷新的複雜度。雖然仍可註冊動畫，但使用者需自行確保在適當時機呼叫 `ScrollTrigger.refresh()`。

## API 參考

### AOSProvider

為子元素提供動畫範圍的包裝元件。

**屬性：**

| 屬性        | 型別                        | 預設值      | 說明                     |
| ----------- | --------------------------- | ----------- | ------------------------ |
| `component` | `React.ElementType`         | `'div'`     | 要渲染的容器元素         |
| `className` | `string`                    | `undefined` | 容器的 CSS 類別          |
| `options`   | `Partial<AnimationOptions>` | `undefined` | 所有子元素的預設動畫選項 |
| `children`  | `React.ReactNode`           | -           | 子元素                   |

**範例：**

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
  {/* 子元素會繼承這些預設選項 */}
</AOSProvider>
```

> ⚠️ 注意：預設選項只作用於後續生成的動畫，這是刻意設計的行為。

### useAOSScope

驅動 `AOSProvider` 的核心 hook。當你需要直接控制容器 ref 時使用。

```tsx
function useAOSScope<E extends HTMLElement = HTMLElement>(
  options?: Partial<AnimationOptions>,
): { containerRef: React.RefObject<E> };
```

**範例：**

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
      <div data-aos="fade-up">動畫內容</div>
    </div>
  );
}
```

⚠️ **重要**：

- 不要巢狀呼叫 `useAOSScope`
- 僅在客戶端元件中使用（加上 `"use client"` 指令）
- 避免放在 `app/layout.tsx` 以確保正確清理

**平行使用：**

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

將動畫選項轉換為 data 屬性，具有型別安全。

```tsx
import { toAOSProps } from "react-gsap-aos";

const props = toAOSProps({
  animation: "fade-up",
  duration: 600,
  easing: "power2.out",
});
// 回傳：{ "data-aos": "fade-up", "data-aos-duration": 600, ... }
```

### refreshScrollTrigger

手動刷新 AOS 動畫位置，封裝自 [`ScrollTrigger.refresh`](<https://gsap.com/docs/v3/Plugins/ScrollTrigger/refresh()>)

```tsx
import { refreshScrollTrigger } from "react-gsap-aos";

// 在動態 DOM 變更後呼叫
refreshScrollTrigger();
```

**動態內容範例：**

```tsx
"use client";

import { useState, useEffect } from "react";
import { AOSProvider, refreshScrollTrigger } from "react-gsap-aos/client";

export default function DynamicList() {
  const [visible, setVisible] = useState(true);
  const [items, setItems] = useState([1, 2, 3]);

  useEffect(() => {
    // 佈局變更後刷新
    refreshScrollTrigger();
  }, [visible]);

  return (
    <AOSProvider className="overflow-hidden">
      <button onClick={() => setVisible((e) => !e)}>切換顯示</button>
      // 當 visible 變更後佈局產生變化
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

## 動畫選項

| 選項              | 型別              | Data 屬性                   | 預設值         | 說明                   |
| ----------------- | ----------------- | --------------------------- | -------------- | ---------------------- |
| `animation`       | `Animation`       | `data-aos`                  | `undefined`    | 動畫類型               |
| `offset`          | `number`          | `data-aos-offset`           | `120`          | 從觸發點的偏移量（px） |
| `delay`           | `number`          | `data-aos-delay`            | `0`            | 動畫延遲（ms）         |
| `duration`        | `number`          | `data-aos-duration`         | `400`          | 動畫持續時間（ms）     |
| `easing`          | `Easing`          | `data-aos-easing`           | `"none"`       | 緩動函式               |
| `once`            | `boolean`         | `data-aos-once`             | `false`        | 只執行一次動畫         |
| `mirror`          | `boolean`         | `data-aos-mirror`           | `false`        | 向上捲動時反轉動畫     |
| `anchorPlacement` | `AnchorPlacement` | `data-aos-anchor-placement` | `"top-bottom"` | 錨點位置               |
| `markers`         | `boolean`         | `data-aos-markers`          | `false`        | ScrollTrigger 標記     |

## 可用型別

### 動畫類型（共 34 種）

**淡入動畫：**

- `fade`, `fade-up`, `fade-down`, `fade-left`, `fade-right`
- `fade-up-right`, `fade-up-left`, `fade-down-right`, `fade-down-left`

**翻轉動畫：**

- `flip-up`, `flip-down`, `flip-left`, `flip-right`

**滑動動畫：**

- `slide-up`, `slide-down`, `slide-left`, `slide-right`

**縮放動畫：**

- `zoom-in`, `zoom-in-up`, `zoom-in-down`, `zoom-in-left`, `zoom-in-right`
- `zoom-out`, `zoom-out-up`, `zoom-out-down`, `zoom-out-left`, `zoom-out-right`

### 緩動類型（共 17 種）

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

### 錨點位置類型（共 9 種）

格式：`[元素位置]-[視窗位置]`

- `top-bottom`, `top-center`, `top-top`
- `center-bottom`, `center-center`, `center-top`
- `bottom-bottom`, `bottom-center`, `bottom-top`
