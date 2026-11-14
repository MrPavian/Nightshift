import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Relative asset paths so the build works under GitHub Pages' /<repo>/ sub-path and locally.
  base: './',
  build: {
    chunkSizeWarningLimit: 1000, // three.js alone is ~500 kB minified
  },
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
  },
});
