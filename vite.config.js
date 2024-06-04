import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true // For making sure that the PWA is testable from the Local dev environment
      },
      registerType: 'autoUpdate',
      manifest: {
        name: "Sports Redirect",
        short_name: "Sports Redirect",
        icons: [
          {
            "src": "/favicon.ico",
            "sizes": "64x64 32x32 24x24 16x16",
            "type": "image/x-icon"
          },
          {
            "src": "/128.png",
            "type": "image/png",
            "sizes": "16x16"
          },
          {
            "src": "/144.png",
            "type": "image/png",
            "sizes": "16x16"
          },
          {
            "src": "/256.png",
            "type": "image/png",
            "sizes": "16x16"
          },
          {
            "src": "/512.png",
            "type": "image/png",
            "sizes": "16x16"
          },
          {
            "src": "/1024.png",
            "type": "image/png",
            "sizes": "16x16"
          },
          {
            "src": "/android-launchericon-192-192.png",
            "type": "image/png",
            "sizes": "32x32"
          },
          {
            "src": "/android-launchericon-512-512.png",
            "type": "image/png",
            "sizes": "32x32"
          },


 
        ],
        theme_color: '#AAF',
      },
    }),
  ],
})
