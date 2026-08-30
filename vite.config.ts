import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

/**
 * Vite plugin that generates static HTML entry points for all client-side routes
 * and ensures 404.html is properly positioned in the build output for GitHub Pages.
 * 
 * This ensures:
 * 1. Googlebot / search crawlers get immediate HTTP 200 responses when requesting any valid route URL directly.
 * 2. Direct browser navigation and refreshes on routes load the application cleanly without 404 errors.
 * 3. Any unlisted route falls back to 404.html which handles SPA client-side redirect.
 */
function githubPagesSpaPlugin(): Plugin {
  return {
    name: 'vite-plugin-github-pages-spa',
    apply: 'build',
    closeBundle() {
      const outDir = path.resolve(__dirname, 'dist');
      const indexHtmlPath = path.join(outDir, 'index.html');

      if (!fs.existsSync(indexHtmlPath)) {
        return;
      }

      const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf-8');

      // 1. Ensure essential deployment files are present in dist
      const filesToSync = ['404.html', 'sitemap.xml', 'robots.txt', '.nojekyll'];
      for (const fileName of filesToSync) {
        const publicFilePath = path.resolve(__dirname, 'public', fileName);
        const distFilePath = path.join(outDir, fileName);
        if (fs.existsSync(publicFilePath)) {
          fs.copyFileSync(publicFilePath, distFilePath);
        }
      }

      // 2. All canonical application routes & aliases
      const routes: string[] = [
        // Primary Calculators
        'ebay-fee-calculator',
        'ebay-profit-calculator',
        'ebay-break-even-calculator',
        'ebay-pricing-calculator',
        'ebay-promoted-listings-calculator',
        'ecommerce-investment-profit-calculator',

        // Common Calculator Aliases
        'calculator',
        'profit',
        'breakeven',
        'break-even',
        'pricing',
        'promoted-listings',
        'promoted',
        'ecommerce-calculator',
        'investment-calculator',

        // Country Hubs & Aliases
        'us', 'usa', 'united-states', 'ebay-us',
        'uk', 'gb', 'united-kingdom', 'ebay-uk',
        'au', 'australia', 'ebay-au',
        'ca', 'canada', 'ebay-ca',
        'de', 'germany', 'deutschland', 'ebay-de',
        'fr', 'france', 'ebay-fr',
        'it', 'italy', 'italia', 'ebay-it',
        'es', 'spain', 'espana', 'ebay-es',

        // Comparisons, Research & Guides
        'ebay-fee-comparison', 'comparison',
        'ebay-fee-history', 'history',
        'ebay-seller-guides', 'guides', 'articles',

        // Resources, Embed & Tools
        'tools/downloadable-resources', 'resources',
        'embed/ebay-fee-calculator', 'embed',
        'embed-widget',

        // Trust, Legal & Methodology
        'methodology',
        'contact',
        'about',
        'privacy',
        'terms',
        'disclaimer',

        // Seller Strategy Articles
        'articles/how-much-does-ebay-charge-sellers',
        'articles/how-ebay-final-value-fees-work',
        'articles/how-to-calculate-ebay-profit',
        'articles/how-to-calculate-ebay-break-even-price',
        'articles/ebay-promoted-listings-fees',
        'articles/ebay-international-selling-fees',
        'articles/how-to-price-products-on-ebay',
        'articles/ebay-fees-vs-other-marketplaces',
      ];

      for (const route of routes) {
        const routeDir = path.join(outDir, route);
        if (!fs.existsSync(routeDir)) {
          fs.mkdirSync(routeDir, { recursive: true });
        }
        const routeHtmlPath = path.join(routeDir, 'index.html');
        fs.writeFileSync(routeHtmlPath, indexHtmlContent, 'utf-8');
      }

      console.log(`[github-pages-spa] Successfully generated static entry points for ${routes.length} routes + 404.html fallback.`);
    },
  };
}

export default defineConfig({
  base: '/Ebay-Calculator/',
  
  plugins: [
    react(),
    tailwindcss(),
    githubPagesSpaPlugin(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },

  server: {
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
          }
        },
      },
    },
  },
});

