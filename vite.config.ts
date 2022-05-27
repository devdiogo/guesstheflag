/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/utils/setup-tests.ts',
    coverage: {
      all: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/types.ts', '**/*.d.ts', '**/*.{test,spec}.{ts,tsx}', '**/main.tsx']
    }
  }
})
