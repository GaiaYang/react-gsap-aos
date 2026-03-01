import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    constants: "src/constants.ts",
  },
  format: ["esm", "cjs"],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
});
