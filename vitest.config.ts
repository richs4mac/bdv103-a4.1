import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['vitestSetup.ts'],
    includeSource: ['**/*.ts'],
    exclude: ['adapter', 'node_modules', 'vitest.config.ts', 'vitestSetup.ts']
  },
  // dead code elimination for production build
  define: {
    'import.meta.vitest': 'undefined',
  },
});