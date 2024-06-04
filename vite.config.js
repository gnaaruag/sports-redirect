
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
        "icons": [
          {
            "src": "/128.png",
            "type": "image/png",
            "sizes": "128x128"
          },
          {
            "src": "/144.png",
            "type": "image/png",
            "sizes": "144x144"
          },
          {
            "src": "/256.png",
            "type": "image/png",
            "sizes": "256x256"
          },
          {
            "src": "/512.png",
            "type": "image/png",
            "sizes": "512x512",
			"purpose": "any maskable"
          },
          {
            "src": "/1024.png",
            "type": "image/png",
            "sizes": "1024x1024"
          },
          {
            "src": "/android-launchericon-192-192.png",
            "type": "image/png",
            "sizes": "192x192"
          },
          {
            "src": "/android-launchericon-512-512.png",
            "type": "image/png",
            "sizes": "32x32"
          }


 
        ],
        theme_color: '#AAF',
		start_url: "/",
      },
    }),
  ],
})
