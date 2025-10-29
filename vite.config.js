import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue2"

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/setupTests.js"],
  },
})
