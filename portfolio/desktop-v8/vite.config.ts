import { readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, type Plugin } from 'vite';

// These paths are requested dynamically by the existing DOM and HTML.
// Keep their public URLs stable while the current shell is migrated.
function preserveLegacyPublicAssets(): Plugin {
  return {
    name: 'deonos-preserve-public-assets',
    apply: 'build',
    generateBundle() {
      for (const fileName of ['icons.svg', 'analytics.js', 'vercel.json']) {
        this.emitFile({
          type: 'asset',
          fileName,
          source: readFileSync(fileURLToPath(new URL(fileName, import.meta.url))),
        });
      }
    },
  };
}

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2022',
    minify: 'esbuild',
    sourcemap: false,
    cssCodeSplit: true,
  },
  plugins: [preserveLegacyPublicAssets()],
});
