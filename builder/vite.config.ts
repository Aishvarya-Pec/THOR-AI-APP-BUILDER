import { cloudflareDevProxyVitePlugin as remixCloudflareDevProxy, vitePlugin as remixVitePlugin } from '@remix-run/dev';
import UnoCSS from 'unocss/vite';
import { defineConfig, type ViteDevServer } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { optimizeCssModules } from 'vite-plugin-optimize-css-modules';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'node:path';

export default defineConfig((config) => {
  return {
    build: {
      target: 'esnext',
      commonjsOptions: {
        include: [/node_modules/,
          'react-use',
          'fast-deep-equal/react'
        ],
      },
      cssMinify: true,
    },
    resolve: {
      conditions: ['workerd', 'worker'],
    },
    plugins: [
      nodePolyfills({
        include: ['path', 'buffer'],
      }),
      config.mode !== 'test' && remixCloudflareDevProxy(),
      remixVitePlugin({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
        },
      }),
      UnoCSS(),
      tsconfigPaths(),
      chrome129IssuePlugin(),
      // Custom plugin to replace server-only imports in @remix-run/react
      {
        name: 'remix-server-module-replacer',
        transform(code, id) {
          // Target the specific file within node_modules
          if (id.includes('node_modules/@remix-run/react/dist/esm/single-fetch.js')) {
            // Replace the import statements with an empty string
            code = code.replace(
              /import { UNSAFE_ErrorResponseImpl, redirect } from '@remix-run\/router';/,
              ''
            );
            code = code.replace(
              /import { UNSAFE_SingleFetchRedirectSymbol } from '@remix-run\/server-runtime';/,
              ''
            );
            return { code, map: null }; // Return the transformed code
          }
          return null; // No changes for other modules
        },
      },
      // config.mode === 'production' && optimizeCssModules({ apply: 'build' }),
    ],
    optimizeDeps: {
      include: ['fast-deep-equal/react', 'gsap'],
      exclude: ['@gsap/react', 'react-use', 'fast-deep-equal'],
    },
    ssr: {
      noExternal: [
        // This is a temporary workaround to avoid a bug in Vite that prevents
        // `virtual-module` from being externalized. This will be removed once
        // the bug is fixed.
        "virtual-module",
        // Make sure to enable this when you are using a package that is not
        // compatible with ESM. For example, if you are using a package that
        // uses `require` instead of `import`.
        // "your-package-name",
      ],
      target: 'webworker',
      resolve: {
        conditions: ['workerd', 'worker'],
        alias: {
          '~': path.resolve(__dirname, './app'),
          '@': path.resolve(__dirname, './app'),
        },
      },

    },
    envPrefix:["VITE_","OPENAI_LIKE_API_","OLLAMA_API_BASE_URL"],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  };
});

function chrome129IssuePlugin() {
  return {
    name: 'chrome129IssuePlugin',
    configureServer(server: ViteDevServer) {
      server.middlewares.use((req, res, next) => {
        const raw = req.headers['user-agent']?.match(/Chrom(e|ium)\/([0-9]+)\./);

        if (raw) {
          const version = parseInt(raw[2], 10);

          if (version === 129) {
            res.setHeader('content-type', 'text/html');
            res.end(
              '<body><h1>Please use Chrome Canary for testing.</h1><p>Chrome 129 has an issue with JavaScript modules & Vite local development, see <a href="https://github.com/thor-dev/thor.dev/issues/86#issuecomment-2395519258">for more information.</a></p><p><b>Note:</b> This only impacts <u>local development</u>. `pnpm run build` and `pnpm run start` will work fine in this browser.</p></body>',
            );

            return;
          }
        }

        next();
      });
    },
  };
}
