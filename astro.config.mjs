import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.zachquintana.com',
  output: 'static',
  publicDir: './static',
  outDir: './dist',
});
