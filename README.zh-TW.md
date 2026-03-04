# react-gsap-aos

[react-gsap-aos](/packages/react-gsap-aos)

[English](README.md) | 中文文檔

## 貢獻

這是一個使用 pnpm workspaces 管理的 monorepo。

## 開發設定

```bash
# 安裝相依套件
pnpm install

# 建置函式庫
cd packages/react-gsap-aos
pnpm build

# 執行展示應用程式
cd apps/nextjs
pnpm dev
```

### 專案結構

```
react-gsap-aos/
├── packages/
│   └── react-gsap-aos/     # 核心函式庫
│       ├── src/
│       │   ├── animation/  # 動畫定義
│       │   ├── components/ # AOSProvider
│       │   ├── hooks/      # useAOSScope
│       │   └── types.ts    # TypeScript 型別
│       └── package.json
└── apps/
    └── nextjs/             # 展示應用程式
        └── src/
```

### 規範

- **套件管理器**：使用 `pnpm`
- **匯入**：內部匯入使用 `@/` 別名
- **匯出**：
  - `react-gsap-aos` - 型別和工具
  - `react-gsap-aos/client` - 客戶端元件和 hooks
  - `react-gsap-aos/constants` - 動畫常數

### 建置

函式庫使用 `tsup` 進行打包，有三個進入點：

- `index.ts` - 主要匯出
- `client.ts` - 客戶端元件
- `constants.ts` - 常數

```bash
cd packages/react-gsap-aos
pnpm build    # 正式版建置
pnpm dev      # 監看模式
```

## 授權

MIT © [Gaia Yang](https://github.com/GaiaYang)

## 致謝

動畫樣式靈感來自 [AOS](https://github.com/michalsnik/aos)

由 [GSAP](https://greensock.com/gsap) 和 [ScrollTrigger](https://greensock.com/scrolltrigger) 驅動
