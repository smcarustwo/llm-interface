import { defineConfig } from "vite"
import { resolve } from "path"
import vercel from "vite-plugin-vercel"

export default defineConfig({
  plugins: [vercel()],
  vercel: {
    // optional configuration options, see "Advanced usage" below for details
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        gui: resolve(__dirname, "gui.html")
      }
    }
  }
})