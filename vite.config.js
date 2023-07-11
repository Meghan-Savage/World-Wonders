import { defineConfig } from "vite";
import vitePluginString from "vite-plugin-string";
import react from "@vitejs/plugin-react";
//import string from 'vite-plugin-string';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginString()],
  server: {
    proxy: { "/api": { target: "https://us-central1-world-wonders-inceptionu.cloudfunctions.net/api", changeOrigin: true } },
  },
  define: {
    "process.env.VITE_FIREBASE_API_KEY": JSON.stringify(
      process.env.VITE_FIREBASE_API_KEY
    ),
    "process.env.VITE_FIREBASE_APP_ID": JSON.stringify(
      process.env.VITE_FIREBASE_APP_ID
    ),
    "process.env.VITE_FIREBASE_STORAGE_BUCKET": JSON.stringify(
      process.env.VITE_FIREBASE_STORAGE_BUCKET
    ),
    "process.env.VITE_FIREBASE_AUTH_DOMAIN": JSON.stringify(
      process.env.VITE_FIREBASE_AUTH_DOMAIN
    ),
  },
});
