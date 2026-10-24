import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
    open: true,
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
    proxy: {
      "/hf-mirror": {
        target: "https://hf-mirror.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/hf-mirror/, ""),
      },
      "/hf-gitee": {
        target: "https://hf-api.gitee.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/hf-gitee/, ""),
      },
      "/hf-official": {
        target: "https://huggingface.co",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/hf-official/, ""),
      },
    },
  },
  build: {
    outDir: "dist",
  },
  optimizeDeps: {
    exclude: ["@huggingface/transformers"],
  },
});