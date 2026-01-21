// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  site: 'https://codeserk.github.io/experiments/class/',
  base: '/class',
  integrations: [preact()],
  vite: {
    server: {
      hmr: {
        overlay: false,
      },
      watch: {
        usePolling: false,
      },
    },
    optimizeDeps: {
      include: ['preact', 'preact/hooks', 'styled-components']
    },
    resolve: {
      alias: {
        'react': 'preact/compat',
        'react-dom': 'preact/compat'
      }
    }
  }
});