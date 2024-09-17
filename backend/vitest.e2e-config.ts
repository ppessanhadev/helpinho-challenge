import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    include: ['./test/e2e/**/*.spec.ts'],
    globals: true,
    setupFiles: ['./test/e2e/fixtures/setup'],
    root: './',
    alias: {},
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
  },
  plugins: [swc.vite(), tsconfigPaths()],
});
