import { RmbgSession } from "@planby-tech/rmbg-webgpu";
import u2netpModelUrl from "@planby-tech/rmbg-webgpu/models/u2netp.onnx?url";
import JSZip from "jszip";
import { createIcons } from "lucide";
import {
  Image as ImageIcon, House, Ruler, Camera, Package, CircleQuestionMark, Menu,
  FolderOpen, Scissors, Target, Undo2, Download,
  CreditCard, GraduationCap, Briefcase, Car,
  Lightbulb, PersonStanding, FaceSlightlySmiling, Shirt, Glasses,
  Smartphone, ClipboardList, Rocket, Trash
} from "lucide";

// const AI_MODEL = "u2netp";
const AI_MODEL = "birefnet";
// ──────────────────────────────────────────────
// 模型配置（修改此处即可切换模型）：
//   "u2netp"  → 快速模式，~4MB，秒级加载，精度良好（默认）
//   "birefnet" → 高质量模式，~183MB，首次加载较慢，精度更优
// ──────────────────────────────────────────────

const MODEL_CONFIGS = {
  u2netp: { model: "u2netp", modelUrl: u2netpModelUrl },
  birefnet: {
    model: {
      inputSize: 512,
      mean: [0.485, 0.456, 0.406],
      std: [0.229, 0.224, 0.225],
      normalization: "unit",
      outputTransform: "sigmoid",
      inputTensorType: "float32",
    },
    modelUrl: "/birefnet-lite-512-fp32.onnx",
  },
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const SIZE_PRESETS = {
  original: { label: "原大小", width: null, height: null },
  "1inch": { label: "1寸", width: 295, height: 413 },
  "2inch": { label: "2寸", width: 413, height: 579 },
  big1inch: { label: "大1寸", width: 390, height: 567 },
  small2inch: { label: "小2寸", width: 413, height: 526 },
};

let originalImage = null;
let foregroundImageData = null;
let currentPreviewTab = "result";
let isPickMode = false;
let bgImageSrc = null;
let rmbgSession = null;
let selectedSize = "original";

const mainCanvas = $("#mainCanvas");
const mainCtx = mainCanvas.getContext("2d", { willReadFrequently: true });
const previewCanvas = $("#previewCanvas");
const previewCtx = previewCanvas.getContext("2d");

function showOverlay(text) {
  $("#canvasOverlay").classList.remove("hidden");
  $("#overlayText").textContent = text;
}

function hideOverlay() {
  $("#canvasOverlay").classList.add("hidden");
}

function drawCheckerboard(ctx, w, h, size = 10) {
  for (let y = 0; y < h; y += size) {
    for (let x = 0; x < w; x += size) {
      ctx.fillStyle = (Math.floor(x / size) + Math.floor(y / size)) % 2 === 0 ? "#e2e8f0" : "#cbd5e1";
      ctx.fillRect(x, y, size, size);
    }
  }
}

function renderCanvas() {
  if (!originalImage) return;

  const w = originalImage.width;
  const h = originalImage.height;
  mainCanvas.width = w;
  mainCanvas.height = h;

  if (foregroundImageData) {
    drawCheckerboard(mainCtx, w, h);
    const bgType = document.querySelector('input[name="bgType"]:checked').value;

    if (bgType === "color") {
      mainCtx.fillStyle = $("#bgColor").value;
      mainCtx.fillRect(0, 0, w, h);
    } else if (bgType === "gradient") {
      drawGradient(mainCtx, w, h);
    } else if (bgType === "image" && bgImageSrc) {
      drawBgImage(mainCtx, w, h);
    }

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = w;
    tempCanvas.height = h;
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.putImageData(foregroundImageData, 0, 0);
    mainCtx.drawImage(tempCanvas, 0, 0);
  } else {
    mainCtx.drawImage(originalImage, 0, 0);
  }

  updatePreview();
  $("#imageSizeInfo").textContent = `${w} × ${h}`;
}

function drawGradient(ctx, w, h) {
  const dir = $("#gradDirection").value;
  const c1 = $("#gradStart").value;
  const c2 = $("#gradEnd").value;
  let gradient;

  if (dir === "circle") {
    gradient = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) / 2);
  } else {
    const coords = {
      "to bottom": [0, 0, 0, h],
      "to right": [0, 0, w, 0],
      "to bottom right": [0, 0, w, h],
      "to bottom left": [w, 0, 0, h],
    };
    const [x0, y0, x1, y1] = coords[dir] || coords["to bottom"];
    gradient = ctx.createLinearGradient(x0, y0, x1, y1);
  }

  gradient.addColorStop(0, c1);
  gradient.addColorStop(1, c2);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);
}

function drawBgImage(ctx, w, h) {
  const img = new Image();
  img.src = bgImageSrc;
  if (img.complete) {
    fitImageToCanvas(ctx, img, w, h);
  } else {
    img.onload = () => fitImageToCanvas(ctx, img, w, h);
  }
}

function fitImageToCanvas(ctx, img, cw, ch) {
  const scale = Math.max(cw / img.width, ch / img.height);
  const sw = img.width * scale;
  const sh = img.height * scale;
  ctx.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh);
}

function updatePreview() {
  if (!originalImage) return;

  const container = $("#previewContainer");
  const size = container.clientWidth;
  previewCanvas.width = size;
  previewCanvas.height = size;

  const w = originalImage.width;
  const h = originalImage.height;

  const preset = SIZE_PRESETS[selectedSize];
  const usePreset = preset && preset.width && preset.height;
  const targetW = usePreset ? preset.width : w;
  const targetH = usePreset ? preset.height : h;

  const previewScale = Math.min(size / targetW, size / targetH);
  const dw = targetW * previewScale;
  const dh = targetH * previewScale;
  const dx = (size - dw) / 2;
  const dy = (size - dh) / 2;

  previewCtx.clearRect(0, 0, size, size);

  function drawResultToPreview() {
    drawCheckerboard(previewCtx, size, size);

    if (foregroundImageData) {
      const bgType = document.querySelector('input[name="bgType"]:checked').value;

      if (bgType === "color") {
        previewCtx.fillStyle = $("#bgColor").value;
        previewCtx.fillRect(dx, dy, dw, dh);
      } else if (bgType === "gradient") {
        previewCtx.save();
        previewCtx.beginPath();
        previewCtx.rect(dx, dy, dw, dh);
        previewCtx.clip();
        const gradCanvas = document.createElement("canvas");
        gradCanvas.width = targetW;
        gradCanvas.height = targetH;
        drawGradient(gradCanvas.getContext("2d"), targetW, targetH);
        previewCtx.drawImage(gradCanvas, dx, dy, dw, dh);
        previewCtx.restore();
      }

      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = w;
      tempCanvas.height = h;
      const tempCtx = tempCanvas.getContext("2d");
      tempCtx.putImageData(foregroundImageData, 0, 0);

      const fitScale = Math.min(targetW / w, targetH / h);
      const fitW = w * fitScale;
      const fitH = h * fitScale;
      const fitX = (targetW - fitW) / 2;
      const fitY = (targetH - fitH) / 2;

      const resultCanvas = document.createElement("canvas");
      resultCanvas.width = targetW;
      resultCanvas.height = targetH;
      const resultCtx = resultCanvas.getContext("2d");
      resultCtx.drawImage(tempCanvas, fitX, fitY, fitW, fitH);

      previewCtx.drawImage(resultCanvas, dx, dy, dw, dh);
    } else {
      const fitScale = Math.min(targetW / w, targetH / h);
      const fitW = w * fitScale;
      const fitH = h * fitScale;
      const fitX = (targetW - fitW) / 2;
      const fitY = (targetH - fitH) / 2;

      const resultCanvas = document.createElement("canvas");
      resultCanvas.width = targetW;
      resultCanvas.height = targetH;
      const resultCtx = resultCanvas.getContext("2d");
      resultCtx.drawImage(originalImage, fitX, fitY, fitW, fitH);

      previewCtx.drawImage(resultCanvas, dx, dy, dw, dh);
    }
  }

  if (currentPreviewTab === "original") {
    const origScale = Math.min(size / w, size / h);
    const origDw = w * origScale;
    const origDh = h * origScale;
    const origDx = (size - origDw) / 2;
    const origDy = (size - origDh) / 2;
    previewCtx.drawImage(originalImage, origDx, origDy, origDw, origDh);
  } else if (currentPreviewTab === "compare") {
    previewCtx.save();
    previewCtx.beginPath();
    previewCtx.rect(dx, dy, dw / 2, dh);
    previewCtx.clip();
    const origScale = Math.min(targetW / w, targetH / h);
    const origFitW = w * origScale;
    const origFitH = h * origScale;
    const origFitX = (targetW - origFitW) / 2;
    const origFitY = (targetH - origFitH) / 2;
    const origCanvas = document.createElement("canvas");
    origCanvas.width = targetW;
    origCanvas.height = targetH;
    origCanvas.getContext("2d").drawImage(originalImage, origFitX, origFitY, origFitW, origFitH);
    previewCtx.drawImage(origCanvas, dx, dy, dw, dh);
    previewCtx.restore();

    previewCtx.save();
    previewCtx.beginPath();
    previewCtx.rect(dx + dw / 2, dy, dw / 2, dh);
    previewCtx.clip();
    drawResultToPreview();
    previewCtx.restore();

    previewCtx.strokeStyle = "#fff";
    previewCtx.lineWidth = 2;
    previewCtx.beginPath();
    previewCtx.moveTo(dx + dw / 2, dy);
    previewCtx.lineTo(dx + dw / 2, dy + dh);
    previewCtx.stroke();

    previewCtx.font = "12px sans-serif";
    previewCtx.fillStyle = "rgba(0,0,0,0.6)";
    previewCtx.fillRect(dx, dy + dh - 24, 50, 24);
    previewCtx.fillRect(dx + dw - 50, dy + dh - 24, 50, 24);
    previewCtx.fillStyle = "#fff";
    previewCtx.fillText("原图", dx + 8, dy + dh - 8);
    previewCtx.fillText("结果", dx + dw - 42, dy + dh - 8);
  } else {
    drawResultToPreview();
  }
}

async function handleFile(file) {
  if (!file || !file.type.startsWith("image/")) return;

  const url = URL.createObjectURL(file);
  const img = new Image();
  img.src = url;

  await new Promise((resolve) => {
    img.onload = resolve;
  });

  originalImage = img;
  foregroundImageData = null;
  bgImageSrc = null;

  $("#uploadSection").classList.add("hidden");
  $("#editorSection").classList.remove("hidden");

  renderCanvas();
}

async function getRmbgSession() {
  if (!rmbgSession) {
    const config = MODEL_CONFIGS[AI_MODEL] || MODEL_CONFIGS.u2netp;
    const modelLabel = AI_MODEL === "birefnet" ? "BiRefNet-Lite 512 FP32 (~183MB)" : "U2NetP 快速 (~4MB)";
    showOverlay(`正在加载 AI 模型 (${modelLabel})，首次使用需下载...`);
    rmbgSession = await RmbgSession.create(config);
  }
  return rmbgSession;
}

async function removeBackgroundAI() {
  if (!originalImage) return;

  try {
    const session = await getRmbgSession();
    showOverlay("正在推理抠图...");

    const response = await fetch(originalImage.src);
    const imageBlob = await response.blob();
    const result = await session.remove(imageBlob);
    const resultBlob = result.outputBlob;

    showOverlay("处理完成，正在渲染...");

    const resultImg = new Image();
    resultImg.src = URL.createObjectURL(resultBlob);
    await new Promise((resolve) => {
      resultImg.onload = resolve;
    });

    const w = originalImage.width;
    const h = originalImage.height;
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = w;
    tempCanvas.height = h;
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.drawImage(resultImg, 0, 0, w, h);
    foregroundImageData = tempCtx.getImageData(0, 0, w, h);

    renderCanvas();
  } catch (err) {
    console.error("背景去除失败:", err);
    alert("背景去除失败，请重试或换一张图片。\n" + err.message);
  } finally {
    hideOverlay();
  }
}

function removeBackgroundManual(targetColor, tolerance, feather) {
  if (!originalImage) return;

  const w = originalImage.width;
  const h = originalImage.height;
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = w;
  tempCanvas.height = h;
  const tempCtx = tempCanvas.getContext("2d");
  tempCtx.drawImage(originalImage, 0, 0);

  const imageData = tempCtx.getImageData(0, 0, w, h);
  const data = imageData.data;

  const tr = parseInt(targetColor.slice(1, 3), 16);
  const tg = parseInt(targetColor.slice(3, 5), 16);
  const tb = parseInt(targetColor.slice(5, 7), 16);

  for (let i = 0; i < data.length; i += 4) {
    const dr = data[i] - tr;
    const dg = data[i + 1] - tg;
    const db = data[i + 2] - tb;
    const dist = Math.sqrt(dr * dr + dg * dg + db * db);

    if (dist < tolerance) {
      data[i + 3] = 0;
    } else if (dist < tolerance + feather) {
      const ratio = (dist - tolerance) / feather;
      data[i + 3] = Math.round(data[i + 3] * ratio);
    }
  }

  foregroundImageData = imageData;
  renderCanvas();
}

function downloadResult() {
  if (!foregroundImageData && !originalImage) return;

  const w = originalImage.width;
  const h = originalImage.height;
  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = w;
  exportCanvas.height = h;
  const exportCtx = exportCanvas.getContext("2d");

  if (foregroundImageData) {
    const bgType = document.querySelector('input[name="bgType"]:checked').value;

    if (bgType === "color") {
      exportCtx.fillStyle = $("#bgColor").value;
      exportCtx.fillRect(0, 0, w, h);
    } else if (bgType === "gradient") {
      drawGradient(exportCtx, w, h);
    } else if (bgType === "image" && bgImageSrc) {
      const img = new Image();
      img.src = bgImageSrc;
      if (img.complete) {
        fitImageToCanvas(exportCtx, img, w, h);
      }
    }

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = w;
    tempCanvas.height = h;
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.putImageData(foregroundImageData, 0, 0);
    exportCtx.drawImage(tempCanvas, 0, 0);
  } else {
    exportCtx.drawImage(originalImage, 0, 0);
  }

  const bgType = document.querySelector('input[name="bgType"]:checked').value;
  const ext = bgType === "transparent" && foregroundImageData ? "png" : "png";
  const mime = "image/png";

  const preset = SIZE_PRESETS[selectedSize];
  const finalCanvas = exportCanvas;

  if (preset && preset.width && preset.height) {
    const resizedCanvas = document.createElement("canvas");
    resizedCanvas.width = preset.width;
    resizedCanvas.height = preset.height;
    const resizedCtx = resizedCanvas.getContext("2d");

    const scale = Math.min(preset.width / w, preset.height / h);
    const dw = w * scale;
    const dh = h * scale;
    const dx = (preset.width - dw) / 2;
    const dy = (preset.height - dh) / 2;

    resizedCtx.drawImage(exportCanvas, dx, dy, dw, dh);
    finalCanvas.width = resizedCanvas.width;
    finalCanvas.height = resizedCanvas.height;
    finalCanvas.getContext("2d").drawImage(resizedCanvas, 0, 0);
  }

  const sizeLabel = preset ? preset.label : "original";

  finalCanvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `background-changed-${sizeLabel}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  }, mime);
}

function setupEvents() {
  const uploadArea = $("#uploadArea");
  const fileInput = $("#fileInput");

  uploadArea.addEventListener("click", (e) => {
    if (e.target === fileInput) return;
    fileInput.click();
  });

  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadArea.classList.add("dragover");
  });

  uploadArea.addEventListener("dragleave", (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadArea.classList.remove("dragover");
  });

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadArea.classList.remove("dragover");
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  });

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
    fileInput.value = "";
  });

  $("#btnRemoveBg").addEventListener("click", removeBackgroundAI);

  $("#btnManualPick").addEventListener("click", () => {
    isPickMode = !isPickMode;
    $("#btnManualPick").classList.toggle("btn-primary", isPickMode);
    mainCanvas.classList.toggle("pick-mode", isPickMode);
    $("#manualPanel").classList.toggle("hidden", !isPickMode);
  });

  mainCanvas.addEventListener("click", (e) => {
    if (!isPickMode || !originalImage) return;

    const rect = mainCanvas.getBoundingClientRect();
    const scaleX = mainCanvas.width / rect.width;
    const scaleY = mainCanvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = originalImage.width;
    tempCanvas.height = originalImage.height;
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.drawImage(originalImage, 0, 0);
    const pixel = tempCtx.getImageData(x, y, 1, 1).data;

    const hex = "#" + [pixel[0], pixel[1], pixel[2]].map((v) => v.toString(16).padStart(2, "0")).join("");
    const tolerance = parseInt($("#tolerance").value);
    const feather = parseInt($("#feather").value);

    $("#pickedColorBox").classList.remove("hidden");
    $("#pickedSwatch").style.background = hex;
    $("#pickedColorText").textContent = hex;

    showOverlay("正在处理...");
    setTimeout(() => {
      removeBackgroundManual(hex, tolerance * 2.55, feather * 2);
      hideOverlay();
    }, 50);
  });

  $("#tolerance").addEventListener("input", (e) => {
    $("#toleranceValue").textContent = e.target.value;
  });

  $("#feather").addEventListener("input", (e) => {
    $("#featherValue").textContent = e.target.value;
  });

  $$('input[name="bgType"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      const val = radio.value;
      $("#bgColorOption").classList.toggle("hidden", val !== "color");
      $("#bgGradientOption").classList.toggle("hidden", val !== "gradient");
      $("#bgImageOption").classList.toggle("hidden", val !== "image");
      renderCanvas();
    });
  });

  $("#bgColor").addEventListener("input", (e) => {
    $("#bgColorText").value = e.target.value;
    renderCanvas();
  });

  $("#bgColorText").addEventListener("input", (e) => {
    if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) {
      $("#bgColor").value = e.target.value;
      renderCanvas();
    }
  });

  ["gradStart", "gradEnd", "gradDirection"].forEach((id) => {
    $(`#${id}`).addEventListener("input", renderCanvas);
    $(`#${id}`).addEventListener("change", renderCanvas);
  });

  $("#btnSelectBgImage").addEventListener("click", () => {
    $("#bgImageInput").click();
  });

  $("#bgImageInput").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      bgImageSrc = ev.target.result;
      $("#bgImagePreview").classList.remove("hidden");
      $("#bgImagePreviewImg").src = bgImageSrc;
      renderCanvas();
    };
    reader.readAsDataURL(file);
  });

  $(".preview-tabs").addEventListener("click", (e) => {
    const btn = e.target.closest(".tab-btn");
    if (!btn) return;
    $$(".tab-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentPreviewTab = btn.dataset.tab;
    updatePreview();
  });

  $("#btnReset").addEventListener("click", () => {
    foregroundImageData = null;
    isPickMode = false;
    mainCanvas.classList.remove("pick-mode");
    $("#btnManualPick").classList.remove("btn-primary");
    $("#manualPanel").classList.add("hidden");
    renderCanvas();
  });

  $("#btnReupload").addEventListener("click", () => {
    originalImage = null;
    foregroundImageData = null;
    bgImageSrc = null;
    isPickMode = false;
    $("#editorSection").classList.add("hidden");
    $("#uploadSection").classList.remove("hidden");
    $("#manualPanel").classList.add("hidden");
    $("#pickedColorBox").classList.add("hidden");
    mainCanvas.classList.remove("pick-mode");
    $("#btnManualPick").classList.remove("btn-primary");
    fileInput.value = "";
  });

  $("#btnDownload").addEventListener("click", downloadResult);

  $$(".size-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$(".size-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      selectedSize = btn.dataset.size;
      updatePreview();
    });
  });

  window.addEventListener("resize", () => {
    if (originalImage) updatePreview();
  });
}

const lucideIcons = {
  Image: ImageIcon, House, Ruler, Camera, Package, CircleQuestionMark, Menu,
  FolderOpen, Scissors, Target, Undo2, Download,
  CreditCard, GraduationCap, Briefcase, Car,
  Lightbulb, PersonStanding, FaceSlightlySmiling, Shirt, Glasses,
  Smartphone, ClipboardList, Rocket, Trash
};

createIcons({ icons: lucideIcons });
setupEvents();

// ──────────────────────────────────────────────
// 页面路由
// ──────────────────────────────────────────────
const PAGES = ["home", "specs", "guide", "batch", "faq"];
const PAGE_MAP = {
  home: "#pageHome",
  specs: "#pageSpecs",
  guide: "#pageGuide",
  batch: "#pageBatch",
  faq: "#pageFaq",
};

function getCurrentPage() {
  const hash = location.hash.replace("#", "");
  return PAGES.includes(hash) ? hash : "home";
}

function switchPage(page) {
  PAGES.forEach((p) => {
    const el = document.querySelector(PAGE_MAP[p]);
    if (el) el.classList.toggle("hidden", p !== page);
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.page === page);
  });

  if (page !== "home") {
    document.querySelector(PAGE_MAP.home).classList.add("hidden");
  }
}

window.addEventListener("hashchange", () => {
  switchPage(getCurrentPage());
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = link.dataset.page;
    location.hash = page;
    switchPage(page);
    const nav = document.querySelector(".nav");
    if (nav) nav.classList.remove("open");
  });
});

document.querySelector(".header-brand")?.addEventListener("click", () => {
  location.hash = "home";
  switchPage("home");
});

document.querySelector("#navToggle")?.addEventListener("click", () => {
  document.querySelector(".nav")?.classList.toggle("open");
});

switchPage(getCurrentPage());

// ──────────────────────────────────────────────
// 批量换底
// ──────────────────────────────────────────────
let batchFiles = [];
let batchResults = [];
let batchBgColor = "#ffffff";

async function getBatchRmbgSession() {
  if (!rmbgSession) {
    const config = MODEL_CONFIGS[AI_MODEL] || MODEL_CONFIGS.u2netp;
    const modelLabel = AI_MODEL === "birefnet" ? "BiRefNet-Lite (~183MB)" : "U2NetP (~4MB)";
    const progressText = document.querySelector("#batchProgressText");
    if (progressText) progressText.textContent = `正在加载 AI 模型 (${modelLabel})，首次需下载...`;
    rmbgSession = await RmbgSession.create(config);
  }
  return rmbgSession;
}

function setupBatchEvents() {
  const area = document.querySelector("#batchUploadArea");
  const input = document.querySelector("#batchFileInput");
  if (!area || !input) return;

  area.addEventListener("click", () => input.click());

  area.addEventListener("dragover", (e) => {
    e.preventDefault();
    area.classList.add("dragover");
  });

  area.addEventListener("dragleave", () => area.classList.remove("dragover"));

  area.addEventListener("drop", (e) => {
    e.preventDefault();
    area.classList.remove("dragover");
    addBatchFiles(e.dataTransfer.files);
  });

  input.addEventListener("change", (e) => {
    addBatchFiles(e.target.files);
    input.value = "";
  });

  document.querySelectorAll(".batch-color-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".batch-color-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      batchBgColor = btn.dataset.color;
      const customInput = document.querySelector("#batchCustomColor");
      const customText = document.querySelector("#batchCustomColorText");
      if (batchBgColor !== "transparent" && customInput) {
        customInput.value = batchBgColor;
        if (customText) customText.value = batchBgColor;
      }
    });
  });

  document.querySelector("#batchCustomColor")?.addEventListener("input", (e) => {
    batchBgColor = e.target.value;
    const customText = document.querySelector("#batchCustomColorText");
    if (customText) customText.value = e.target.value;
    document.querySelectorAll(".batch-color-btn").forEach((b) => b.classList.remove("active"));
  });

  document.querySelector("#batchCustomColorText")?.addEventListener("input", (e) => {
    if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) {
      batchBgColor = e.target.value;
      const customInput = document.querySelector("#batchCustomColor");
      if (customInput) customInput.value = e.target.value;
      document.querySelectorAll(".batch-color-btn").forEach((b) => b.classList.remove("active"));
    }
  });

  document.querySelector("#btnBatchProcess")?.addEventListener("click", processBatch);
  document.querySelector("#btnBatchDownload")?.addEventListener("click", downloadBatchAsZip);
  document.querySelector("#btnBatchClear")?.addEventListener("click", clearBatch);
}

function addBatchFiles(fileList) {
  for (const file of fileList) {
    if (!file.type.startsWith("image/")) continue;
    batchFiles.push({ file, status: "pending", result: null });
  }
  renderBatchList();
  document.querySelector("#batchSettings")?.classList.remove("hidden");
  document.querySelector("#batchActions")?.classList.remove("hidden");
}

function renderBatchList() {
  const list = document.querySelector("#batchPreviewList");
  if (!list) return;
  list.innerHTML = "";

  batchFiles.forEach((item, idx) => {
    const div = document.createElement("div");
    div.className = "batch-preview-item";

    const img = document.createElement("img");
    img.src = URL.createObjectURL(item.file);
    div.appendChild(img);

    const status = document.createElement("div");
    status.className = `batch-item-status ${item.status}`;
    const statusText = { pending: "等待处理", processing: "处理中...", done: "已完成", error: "失败" };
    status.textContent = statusText[item.status] || item.status;
    div.appendChild(status);

    const removeBtn = document.createElement("button");
    removeBtn.className = "batch-item-remove";
    removeBtn.textContent = "×";
    removeBtn.addEventListener("click", () => {
      batchFiles.splice(idx, 1);
      renderBatchList();
      if (batchFiles.length === 0) {
        document.querySelector("#batchSettings")?.classList.add("hidden");
        document.querySelector("#batchActions")?.classList.add("hidden");
      }
    });
    div.appendChild(removeBtn);

    list.appendChild(div);
  });
}

async function processBatch() {
  if (batchFiles.length === 0) return;

  const progressEl = document.querySelector("#batchProgress");
  const progressFill = document.querySelector("#batchProgressFill");
  const progressText = document.querySelector("#batchProgressText");

  progressEl?.classList.remove("hidden");
  if (progressFill) progressFill.style.width = "0%";
  document.querySelector("#btnBatchProcess").disabled = true;

  const sizeKey = document.querySelector("#batchSizeSelect")?.value || "original";
  const preset = SIZE_PRESETS[sizeKey];

  let session;
  try {
    session = await getBatchRmbgSession();
  } catch (err) {
    console.error("AI 模型加载失败:", err);
    if (progressText) progressText.textContent = `AI 模型加载失败: ${err.message}`;
    document.querySelector("#btnBatchProcess").disabled = false;
    return;
  }

  batchResults = [];

  for (let i = 0; i < batchFiles.length; i++) {
    batchFiles[i].status = "processing";
    renderBatchList();
    if (progressText) progressText.textContent = `AI 抠图 ${i + 1}/${batchFiles.length}...`;

    try {
      const origImg = new Image();
      const origUrl = URL.createObjectURL(batchFiles[i].file);
      origImg.src = origUrl;
      await new Promise((r, reject) => { origImg.onload = r; origImg.onerror = reject; });

      const w = origImg.width;
      const h = origImg.height;

      const result = await session.remove(batchFiles[i].file);
      const resultBlob = result.outputBlob;

      const resultImg = new Image();
      resultImg.src = URL.createObjectURL(resultBlob);
      await new Promise((r, reject) => { resultImg.onload = r; resultImg.onerror = reject; });

      const fgCanvas = document.createElement("canvas");
      fgCanvas.width = w;
      fgCanvas.height = h;
      fgCanvas.getContext("2d").drawImage(resultImg, 0, 0, w, h);

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");

      if (batchBgColor !== "transparent") {
        ctx.fillStyle = batchBgColor;
        ctx.fillRect(0, 0, w, h);
      } else {
        ctx.clearRect(0, 0, w, h);
      }

      ctx.drawImage(fgCanvas, 0, 0);

      let finalCanvas = canvas;
      if (preset && preset.width && preset.height) {
        finalCanvas = document.createElement("canvas");
        finalCanvas.width = preset.width;
        finalCanvas.height = preset.height;
        const fCtx = finalCanvas.getContext("2d");
        const scale = Math.min(preset.width / w, preset.height / h);
        const dw = w * scale;
        const dh = h * scale;
        const dx = (preset.width - dw) / 2;
        const dy = (preset.height - dh) / 2;
        fCtx.drawImage(canvas, dx, dy, dw, dh);
      }

      const outBlob = await new Promise((r) => finalCanvas.toBlob(r, "image/png"));
      batchResults.push({ blob: outBlob, name: batchFiles[i].file.name.replace(/\.\w+$/, "") + "_processed.png" });
      batchFiles[i].status = "done";

      URL.revokeObjectURL(origUrl);
    } catch (err) {
      console.error("批量处理第" + (i + 1) + "张失败:", err);
      batchFiles[i].status = "error";
      batchFiles[i].errorMsg = err.message;
    }

    if (progressFill) progressFill.style.width = `${((i + 1) / batchFiles.length) * 100}%`;
    renderBatchList();
  }

  if (progressText) progressText.textContent = `处理完成！成功 ${batchResults.length}/${batchFiles.length}`;
  document.querySelector("#btnBatchProcess").disabled = false;
  if (batchResults.length > 0) {
    document.querySelector("#btnBatchDownload")?.classList.remove("hidden");
  }
}

async function downloadBatchAsZip() {
  if (batchResults.length === 0) return;

  const btn = document.querySelector("#btnBatchDownload");
  const originalText = btn?.textContent;
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i data-lucide="package"></i> 正在打包...';
    createIcons({ icons: lucideIcons });
  }

  try {
    const zip = new JSZip();
    const folderName = `证件照批量结果_${new Date().toISOString().slice(0, 10).replace(/-/g, "")}`;
    const folder = zip.folder(folderName);

    for (const item of batchResults) {
      folder.file(item.name, item.blob);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${folderName}.zip`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("打包下载失败:", err);
    alert("打包下载失败: " + err.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i data-lucide="download"></i> 打包下载全部';
      createIcons({ icons: lucideIcons });
    }
  }
}

function clearBatch() {
  batchFiles = [];
  batchResults = [];
  renderBatchList();
  document.querySelector("#batchSettings")?.classList.add("hidden");
  document.querySelector("#batchActions")?.classList.add("hidden");
  document.querySelector("#btnBatchDownload")?.classList.add("hidden");
  document.querySelector("#batchProgress")?.classList.add("hidden");
}

setupBatchEvents();