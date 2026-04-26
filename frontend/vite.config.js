import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@icons": path.resolve(__dirname, "src/icons"),
      "@components": path.resolve(__dirname, "src/components"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@redux": path.resolve(__dirname, "src/redux"),
      "@config": path.resolve(__dirname, "config"),
      "@services": path.resolve(__dirname, "src/services"),
    },
  },

  // ❌ احذف proxy من production
  // proxy بيكسر في Railway + يسبب 431 / timeout

  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    cors: true,
  },

  preview: {
    host: "0.0.0.0",
    port: 4173,

    // ✅ لازم يكون كده في Vite الجديد
    allowedHosts: [
      "craftlink-production.up.railway.app",
    ],
  },

  base: "./",
});