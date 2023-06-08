import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader({
      svgo: false,
    }),
  ],
  server: {
    watch: {
      usePolling: true,
    },
  },
  publicPath: '/sagrafik-microfrontend/',
  base: '/sagrafik-microfrontend/',
  //base: '/',
})
