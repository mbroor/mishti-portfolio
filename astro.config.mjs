import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mbroor.github.io',
  base: '/mishti-portfolio',
  integrations: [sitemap()],
  output: 'static'
});
