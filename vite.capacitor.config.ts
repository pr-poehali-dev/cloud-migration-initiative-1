import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

/**
 * Vite config for Capacitor (iOS / Android) builds.
 * Key difference: base is './' so all asset paths are relative,
 * which is required when the app is loaded from the device filesystem.
 *
 * Usage:
 *   bun run build:mobile          → vite build --config vite.capacitor.config.ts
 *   bun run cap:sync:android      → build + npx cap sync android
 *   bun run cap:sync:ios          → build + npx cap sync ios
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Relative base is mandatory for Capacitor file:// loading
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
