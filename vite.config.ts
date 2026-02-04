import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://api.escuelajs.co/api/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@modules": "/src/modules",
      "@assets": "/src/assets",
      "@utils": "/src/utils",
    },
  },
});
