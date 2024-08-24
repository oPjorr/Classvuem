import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api/spotify": {
        target: "https://api.spotify.com/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/spotify/, ""),
      },
      "/api/musixmatch": {
        target: "https://api.musixmatch.com/ws/1.1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/musixmatch/, ""),
      },
    },
  },
});
