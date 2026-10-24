# Third-Party Notices

## @planby-tech/rmbg-webgpu

This project uses the `@planby-tech/rmbg-webgpu` npm package.

- Upstream project: https://github.com/planby-technologies/rmbg-webgpu
- Package: https://www.npmjs.com/package/@planby-tech/rmbg-webgpu
- License: MIT + Apache-2.0
  - Library source code: MIT
  - Bundled model `u2netp.onnx`: Apache License 2.0 (via the U²-Net project)
  - Optional model BiRefNet: MIT (via the BiRefNet project)

The package is used for AI-powered image background removal with WebGPU acceleration and WASM fallback.

## Model Licenses

| Model | License | Commercial Use |
|-------|---------|----------------|
| U2NetP (default, ~4MB) | Apache-2.0 | Yes |
| BiRefNet (optional, ~98MB) | MIT | Yes |

## Other Third-Party Dependencies

See `package.json` and the applicable lockfile for the dependencies used by this project. Their respective licenses must be reviewed and complied with separately.

## Important

This notice is provided for attribution and license identification. It does not replace the full text of any applicable license or grant additional rights to third-party materials.