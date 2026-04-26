import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Vite configuration
// - Aliases simplify imports (e.g. `@components/MyComp`)
// - Server options tuned for local development and mobile testing
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

  server: {
    host: "0.0.0.0", // listen on all interfaces (useful for testing from other devices)
    port: 5173,
    strictPort: true, // if the port is busy, fail instead of using another port
    cors: true, // allow cross-origin requests during development
    proxy: {
      "/api": {
        target: "https://craftlink-production.up.railway.app",
        changeOrigin: true,
        secure: false,
      },
    },
    // Note: Vite handles SPA routing; `historyApiFallback` is not a Vite option
  },

  // Base path for built assets (useful when serving from relative paths)
  base: "./",
});
