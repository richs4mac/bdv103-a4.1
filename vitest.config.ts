import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    includeSource: ['**/*.ts'],
    exclude: ['adapter', 'node_modules', 'vitest.config.ts']
  },
  // dead code elimination for production build
  define: {
    'import.meta.vitest': 'undefined',
  },
});