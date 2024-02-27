import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import { VitePWA } from 'vite-plugin-pwa';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader({
      svgo: false,
    }),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      includeAssets: ['favicon.ico'],
      workbox: {
        runtimeCaching: [{
          handler: 'CacheFirst',
          urlPattern: /^https:\/\/sheets\.googleapis\.com*/,
          method: 'GET',
          options: {
            cacheName: 'google-sheet',
            expiration: {
            maxAgeSeconds: 60 * 2
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }]
      },
      manifest: {
        name: 'sagrafik.online',
        short_name: 'SAgrafik',
        description: 'Meetingi w całej Polsce na CITO',
        theme_color: '#27272a',
        icons: [  
          {  
            src: 'logo.png',  
            sizes: '192x192',  
            type: 'image/png',  
          },  
          {  
            src: 'logo.png',  
            sizes: '512x512',  
            type: 'image/png',  
          },  
          {  
            src: 'logo.png',  
            sizes: '512x512',  
            type: 'image/png',  
            purpose: 'any maskable',  
          },  
        ],
      }
    }),
  ],
  server: {
    watch: {
      usePolling: true,
    },
  },
  publicPath: '/',
  base: '/',
})
