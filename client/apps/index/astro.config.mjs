// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  site: 'https://experiments.codeserk.es',
  vite: {
    server: {
      hmr: {
        overlay: false,
      },
      watch: {
        usePolling: false,
      },
    }
  }
});