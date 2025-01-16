// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     sourcemap: true,
//   },
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  server: {
    proxy: {
      "/users": {
        target: "https://connections-api.herokuapp.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users/, "/users"),
      },
    },
  },
});
