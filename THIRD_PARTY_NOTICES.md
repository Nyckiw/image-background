# Third-Party Notices

## @planby-tech/rmbg-webgpu

This project uses the `@planby-tech/rmbg-webgpu` npm package.

- Upstream project: https://github.com/planby-technologies/rmbg-webgpu
- Package: https://www.npmjs.com/package/@planby-tech/rmbg-webgpu
- License: MIT AND Apache-2.0 (SPDX)
  - Library source code: MIT — Copyright (c) 2026 Planby Technologies
  - Bundled model `u2netp.onnx`: Apache License 2.0 (via the U-2-Net project)
  - Optional model BiRefNet: MIT (via the BiRefNet project)

The package is used for AI-powered image background removal with WebGPU acceleration and WASM fallback.

## Bundled U-2-Netp Model (Apache-2.0)

- File: `u2netp.onnx` (bundled via `@planby-tech/rmbg-webgpu/models/u2netp.onnx`)
- Model family: U-2-Net / U-2-Netp
- Original project: https://github.com/xuebinqin/U-2-Net
- Download source: https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2netp.onnx
- License: Apache License 2.0
- Full license text: [`LICENSES/Apache-2.0.txt`](LICENSES/Apache-2.0.txt)

This model is redistributed under the Apache License 2.0. Keep this notice and the
Apache License 2.0 text when redistributing the package or the model file.

## BiRefNet Model (MIT)

- File: `birefnet-lite-512-fp32.onnx` (self-hosted at project root / public)
- Official project: https://github.com/ZhengPeng7/BiRefNet
- ONNX model source: https://huggingface.co/onnx-community/BiRefNet-ONNX
- License: MIT — Copyright (c) ZhengPeng7

BiRefNet model files are not bundled in the npm package. This project self-hosts
the ONNX model file. Keep the upstream MIT license notice when redistributing
BiRefNet model files.

## ONNX Runtime Web (MIT)

- Used via `onnxruntime-common` (dependency of `@planby-tech/rmbg-webgpu`)
- Project: https://github.com/microsoft/onnxruntime
- License: MIT — Copyright (c) Microsoft Corporation

## Model Licenses Summary

| Model | License | Commercial Use | Full Text |
|-------|---------|----------------|-----------|
| U2NetP (~4MB) | Apache-2.0 | Yes | [`LICENSES/Apache-2.0.txt`](LICENSES/Apache-2.0.txt) |
| BiRefNet (~183MB) | MIT | Yes | [`LICENSE`](LICENSE) |

## Other Third-Party Dependencies

See `package.json` and the applicable lockfile for the dependencies used by this project. Their respective licenses must be reviewed and complied with separately.

## Important

This notice is provided for attribution and license identification. It does not replace the full text of any applicable license or grant additional rights to third-party materials.