# react-gsap-aos

[react-gsap-aos](/packages/react-gsap-aos)

[English](README.md) | 中文文檔

## 開發設定

```bash
# 安裝相依套件
pnpm install

# 建置套件庫
cd packages/react-gsap-aos
pnpm dev

# 執行展示網站
cd apps/nextjs
pnpm dev
```

### 規範

- 使用 `pnpm` 作為套件管理器
- 內部匯入使用 `@/` 別名
- 匯出路徑
  - `react-gsap-aos` - 型別和工具
  - `react-gsap-aos/client` - 客戶端元件和 hooks
  - `react-gsap-aos/constants` - 動畫常數

### 建置

函式庫使用 `tsup` 進行打包，有三個進入點

- `index.ts` - 主要匯出
- `client.ts` - 客戶端元件
- `constants.ts` - 常數

```bash
cd packages/react-gsap-aos
# 監聽模式
pnpm dev
# 正式版建置
pnpm build
```

## 授權

MIT © [Gaia Yang](https://github.com/GaiaYang)

說明文件以及LLM [danielchim](https://github.com/danielchim)

## 致謝

動畫樣式靈感來自 [AOS](https://github.com/michalsnik/aos)

由 [GSAP](https://greensock.com/gsap) 和 [ScrollTrigger](https://greensock.com/scrolltrigger) 驅動
