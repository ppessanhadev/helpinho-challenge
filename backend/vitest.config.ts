import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    include: ['./test/unit/**/*.spec.ts'],
    globals: true,
    root: './',
    alias: {},
  },
  plugins: [swc.vite(), tsconfigPaths()],
});
