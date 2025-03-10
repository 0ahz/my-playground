import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import VueRouter from 'unplugin-vue-router/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import RadixVueResolver from 'radix-vue/resolver';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      logs: true,
      routesFolder: [
        {
          src: 'src/pages',
          //
        },
        //
      ],
    }),
    vue(),
    tailwindcss(),
    Components({
      resolvers: [RadixVueResolver()],
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        VueRouterAutoImports,
        {
          'unplugin-vue-router/data-loaders/basic': ['defineBasicLoader'],
        },
      ],
    }),
    {
      name: 'hmr-demo',
      enforce: 'post',
      configureServer(server) {
        server.ws.on('inc', async () => {
          console.log('====');
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
