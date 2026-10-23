# Third-Party Notices

## @bunnio/rembg-web

This project uses the `@bunnio/rembg-web` npm package for AI-powered background removal.

- Package: https://www.npmjs.com/package/@bunnio/rembg-web
- Repository: https://github.com/bunnio/rembg-web
- License: MIT License
- Copyright: bunnio and other respective copyright holders

The package runs ONNX Runtime Web in the browser and uses deep learning models (e.g., U2Net, Silueta) for image segmentation.

## ONNX Runtime Web

The `@bunnio/rembg-web` package depends on ONNX Runtime Web for running neural network inference in the browser.

- Project: https://github.com/microsoft/onnxruntime
- License: MIT License
- Copyright: Microsoft Corporation

## Model Weights

The AI models used by this project (e.g., U2Net, Silueta) are pre-trained deep learning models loaded at runtime. These models are subject to their respective licenses as defined by their original authors. Please review the model licenses before redistribution or commercial use.

- U2Net: https://github.com/xuebinqin/U-2-Net (Apache 2.0 / MIT)
- Silueta: Derived from U2Net architecture

## Other Third-Party Dependencies

See `package.json` and the applicable lockfile for the dependencies used by this project. Their respective licenses must be reviewed and complied with separately.

## Important

This notice is provided for attribution and license identification. It does not replace the full text of any applicable license or grant additional rights to third-party materials.