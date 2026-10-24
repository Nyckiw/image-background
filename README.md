## License and Attribution

This project uses the open-source package `@planby-tech/rmbg-webgpu` for AI-powered background removal.

Original project:
https://github.com/planby-technologies/rmbg-webgpu

The upstream package is licensed under MIT + Apache-2.0, which permits commercial use.

### Model Configuration

This project supports two AI models (configurable in `src/main.js`):

| Model | Size | Quality | License | Commercial |
|-------|------|---------|--------|------------|
| `u2netp` (default) | ~4MB | Good | Apache-2.0 | Yes |
| `birefnet` | ~98MB | Excellent | MIT | Yes |

To switch models, change the `AI_MODEL` constant at the top of `src/main.js`.

This project adds certificate-photo background replacement features, including background color selection, custom background images, image previews, and image export.

Please refer to `LICENSE` for this project's license and `THIRD_PARTY_NOTICES.md` for third-party attribution.