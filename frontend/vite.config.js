import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

//it's used to proxy the api requests to the backend server during development 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "http://localhost:3000",
      "/uploads/": "http://localhost:3000",
    },
  },
});
