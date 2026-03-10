# react-gsap-aos

[react-gsap-aos](/packages/react-gsap-aos)

[中文文檔](README.zh-TW.md) | English

### Development Setup

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

### Conventions

- Use `pnpm` as package manager
- Use `@/` alias for internal imports
- Export paths
  - `react-gsap-aos` - Types and utilities
  - `react-gsap-aos/client` - Client-side components and hooks
  - `react-gsap-aos/constants` - Animation constants

### Building

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

## License

MIT © [Gaia Yang](https://github.com/GaiaYang)

Documentation and LLM [danielchim](https://github.com/danielchim)

## Credits

Animation styles inspired by [AOS](https://github.com/michalsnik/aos)

Powered by [GSAP](https://greensock.com/gsap) and [ScrollTrigger](https://greensock.com/scrolltrigger)
