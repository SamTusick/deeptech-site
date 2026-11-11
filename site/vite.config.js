import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Multi-page build: each HTML file is its own entry, so URLs stay
// index.html / payload.html / join.html and GitHub Pages needs no routing.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(import.meta.dirname, 'index.html'),
        payload: resolve(import.meta.dirname, 'payload.html'),
        join: resolve(import.meta.dirname, 'join.html'),
      },
    },
  },
});
