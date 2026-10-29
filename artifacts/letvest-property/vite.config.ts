import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';

const rawPort = process.env.PORT || '5173';
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

export default defineConfig(async ({ command }) => {
  const basePath = process.env.BASE_PATH || (command === 'build' ? '/Letvest-Property-Showcase/' : '/');
  return {
    base: basePath,
  plugins: [
    {
      name: 'letvest-site-metadata',
      generateBundle() {
        const base = process.env.SITE_URL || 'https://bencoll352.github.io/Letvest-Property-Showcase/';
        const root = base.endsWith('/') ? base : `${base}/`;
        const views = ['', 'rent-to-rent', 'lettings', 'about', 'industry-news', 'contact', 'privacy', 'complaints', 'professional-standards'];
        this.emitFile({type:'asset',fileName:'sitemap.xml',source:`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${views.map(view=>`<url><loc>${root}${view?`?view=${view}`:''}</loc></url>`).join('')}</urlset>`});
      },
      transformIndexHtml(html) {
        const configuredUrl = process.env.SITE_URL || 'https://bencoll352.github.io/Letvest-Property-Showcase/';
        const siteUrl = new URL(configuredUrl);
        if (siteUrl.protocol !== 'https:' || siteUrl.search || siteUrl.hash) throw new Error('SITE_URL must be a clean HTTPS site URL');
        if (!siteUrl.pathname.endsWith('/')) siteUrl.pathname += '/';
        return html.replaceAll('__SITE_URL__', siteUrl.href).replaceAll('__ROBOTS__', process.env.PUBLICATION_READY === 'true' ? 'index, follow' : 'noindex, nofollow');
      },
    },
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== 'production' &&
    process.env.REPL_ID !== undefined
      ? [
          await import('@replit/vite-plugin-cartographer').then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, '..'),
            }),
          ),
          await import('@replit/vite-plugin-dev-banner').then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(
        import.meta.dirname,
        '..',
        '..',
        'attached_assets',
      ),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist/public'),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
    preview: {
      port,
      host: '0.0.0.0',
      allowedHosts: true,
    },
  };
});
