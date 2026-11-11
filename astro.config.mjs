import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { customSitemapPageUrls, sitemapSerialize } from './src/config/sitemap.ts';
import { pruneDist } from './scripts/prune-inline-css.mjs';
import { SITE_URL } from './src/config/site-url.mjs';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

function deferredBootUrlIntegration() {
  const marker = '__DEFERRED_BOOT_URL__';
  return {
    name: 'deferred-boot-url',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const outDir = fileURLToPath(dir);
        const astroDir = path.join(outDir, '_astro');
        const bootName = fs
          .readdirSync(astroDir)
          .find((name) => name.startsWith('deferred-boot.') && name.endsWith('.js'));
        if (!bootName) return;
        const url = `/_astro/${bootName}`;

        const writeHtml = (folder) => {
          for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
            const full = path.join(folder, entry.name);
            if (entry.isDirectory()) {
              writeHtml(full);
              continue;
            }
            if (!entry.name.endsWith('.html')) continue;
            const html = fs.readFileSync(full, 'utf8');
            if (!html.includes(marker)) continue;
            fs.writeFileSync(full, html.replaceAll(marker, url));
          }
        };

        writeHtml(outDir);
      },
    },
  };
}

function pruneInlineCssIntegration() {
  return {
    name: 'prune-inline-css',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const result = pruneDist(fileURLToPath(dir));
        console.log(
          `[prune-inline-css] removed unused rules from ${result.files} pages (${result.saved} bytes)`,
        );
      },
    },
  };
}

function deferredBootPlugin() {
  const marker = '__DEFERRED_BOOT_URL__';
  let refId = '';
  return {
    name: 'deferred-boot-entry',
    apply: 'build',
    buildStart() {
      refId = this.emitFile({
        type: 'chunk',
        id: path.join(projectRoot, 'src/scripts/deferred-boot.ts'),
        name: 'deferred-boot',
      });
    },
    generateBundle(_options, bundle) {
      if (!refId) return;
      const fileName = this.getFileName(refId).replaceAll('\\', '/');
      const url = fileName.startsWith('/') ? fileName : `/${fileName}`;
      for (const item of Object.values(bundle)) {
        if (item.type === 'chunk' && item.code.includes(marker)) {
          item.code = item.code.replaceAll(marker, url);
        }
      }
    },
  };
}

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  i18n: {
    locales: ['en', 'es', 'de', 'fr'],
    defaultLocale: 'en',
    fallback: {
      es: 'en',
      de: 'en',
      fr: 'en',
    },
    routing: {
      prefixDefaultLocale: false,
      fallbackType: 'rewrite',
    },
  },
  // Path redirects: `src/middleware.ts` (dev) + `scripts/redirects.mjs` (`npm start`).
  // Do not use `redirects` here — Astro serves a static HTML stub that does not 301 in dev.
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    deferredBootUrlIntegration(),
    pruneInlineCssIntegration(),
    sitemap({
      customPages: customSitemapPageUrls(),
      filter: (page) => {
        if (page.includes('/404') || page.includes('/go/')) return false;
        if (/\/(es|de|fr)\/404\//.test(page)) return false;
        if (page.includes('/en/') || page.endsWith('/en')) return false;
        if (/\/(es|de|fr)\/go\//.test(page)) return false;
        return true;
      },
      serialize: sitemapSerialize,
    }),
  ],
  vite: {
    plugins: [deferredBootPlugin(), tailwindcss()],
    build: {
      cssMinify: true,
      minify: 'esbuild',
      target: 'es2022',
      assetsInlineLimit: 8192,
      modulePreload: { polyfill: false },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (
              id.includes('node_modules/embla-carousel') ||
              id.includes('@starwind-ui/runtime/carousel')
            ) {
              return 'carousel';
            }
            if (id.includes('@starwind-ui/runtime/drawer')) return 'drawer';
            if (id.includes('@starwind-ui/runtime/accordion')) return 'accordion';
          },
        },
      },
    },
  },
  build: {
    /** One document request. A separate stylesheet was the mobile critical path on every page. */
    inlineStylesheets: 'always',
  },
});
