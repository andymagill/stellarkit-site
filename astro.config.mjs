// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import stellarKitCore from '@stellar-kit/core';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [stellarKitCore()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        ignored: ['**/*.md', '**/.changeset/**'],
      },
    },
  },
});
