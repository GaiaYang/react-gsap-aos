# react-gsap-aos

[react-gsap-aos](/packages/react-gsap-aos)

[中文文檔](README.zh-TW.md) | English

## Contributing

This is a monorepo managed with pnpm workspaces.

### Development Setup

```bash
# Install dependencies
pnpm install

# Build the library
cd packages/react-gsap-aos
pnpm build

# Run the demo app
cd apps/nextjs
pnpm dev
```

### Project Structure

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

### Conventions

- **Package Manager**: Use `pnpm`
- **Imports**: Use `@/` alias for internal imports
- **Exports**:
  - `react-gsap-aos` - Types and utilities
  - `react-gsap-aos/client` - Client-side components and hooks
  - `react-gsap-aos/constants` - Animation constants

### Building

The library uses `tsup` for bundling with three entry points:

- `index.ts` - Main exports
- `client.ts` - Client components
- `constants.ts` - Constants

```bash
cd packages/react-gsap-aos
pnpm build    # Production build
pnpm dev      # Watch mode
```

## License

MIT © [Gaia Yang](https://github.com/GaiaYang)

## Credits

Animation styles inspired by [AOS](https://github.com/michalsnik/aos)

Powered by [GSAP](https://greensock.com/gsap) and [ScrollTrigger](https://greensock.com/scrolltrigger)
