import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://zachquintana.com',
  output: 'static',
  publicDir: './static',
  outDir: './dist',
});
