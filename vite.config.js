import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
  },
  assetsInclude: ["**/*.onnx"],
  optimizeDeps: {
    exclude: ["@planby-tech/rmbg-webgpu"],
  },
  configureServer(server) {
    server.middlewares.use("/hf-mirror", async (req, res, next) => {
      try {
        const targetUrl = `https://hf-mirror.com${req.url}`;
        const upstream = await fetch(targetUrl, { redirect: "follow" });

        if (!upstream.ok) {
          res.statusCode = upstream.status;
          res.end(`Upstream error: ${upstream.status}`);
          return;
        }

        const h = upstream.headers;
        if (h.has("content-type")) res.setHeader("Content-Type", h.get("content-type"));
        if (h.has("content-length")) res.setHeader("Content-Length", h.get("content-length"));
        if (h.has("content-disposition")) res.setHeader("Content-Disposition", h.get("content-disposition"));

        const reader = upstream.body.getReader();
        const pump = async () => {
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              if (!res.write(value)) await new Promise((r) => res.once("drain", r));
            }
            res.end();
          } catch {
            res.end();
          }
        };
        pump();
      } catch (e) {
        next(e);
      }
    });
  },
});