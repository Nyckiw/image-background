import { defineConfig } from "vite";
import { cpSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
  plugins: [
    {
      name: "copy-license-files",
      closeBundle() {
        const outDir = resolve(__dirname, "dist");
        cpSync(
          resolve(__dirname, "LICENSE"),
          resolve(outDir, "LICENSE")
        );
        cpSync(
          resolve(__dirname, "THIRD_PARTY_NOTICES.md"),
          resolve(outDir, "THIRD_PARTY_NOTICES.md")
        );
        cpSync(
          resolve(__dirname, "LICENSES"),
          resolve(outDir, "LICENSES"),
          { recursive: true }
        );
      },
    },
  ],
});