import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true, 
    setupFiles: './src/tests/setup.ts', // Ensure this path matches your folder structure!
    exclude: ['**/node_modules/**', '**/tests/e2e/**'], // Add this line to ignore E2E tests
  },
});