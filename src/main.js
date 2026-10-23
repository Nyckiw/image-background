import { removeBackground as imglyRemoveBackground } from "@imgly/background-removal";

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

let originalImage = null;
let foregroundImageData = null;
let currentPreviewTab = "result";
let isPickMode = false;
let bgImageSrc = null;

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
  const scale = Math.min(size / w, size / h);
  const dw = w * scale;
  const dh = h * scale;
  const dx = (size - dw) / 2;
  const dy = (size - dh) / 2;

  previewCtx.clearRect(0, 0, size, size);

  if (currentPreviewTab === "original") {
    previewCtx.drawImage(originalImage, dx, dy, dw, dh);
  } else if (currentPreviewTab === "compare") {
    previewCtx.save();
    previewCtx.beginPath();
    previewCtx.rect(dx, dy, dw / 2, dh);
    previewCtx.clip();
    previewCtx.drawImage(originalImage, dx, dy, dw, dh);
    previewCtx.restore();

    previewCtx.save();
    previewCtx.beginPath();
    previewCtx.rect(dx + dw / 2, dy, dw / 2, dh);
    previewCtx.clip();
    drawCheckerboard(previewCtx, size, size);
    if (foregroundImageData) {
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = w;
      tempCanvas.height = h;
      const tempCtx = tempCanvas.getContext("2d");
      tempCtx.putImageData(foregroundImageData, 0, 0);
      previewCtx.drawImage(tempCanvas, dx, dy, dw, dh);
    }
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
    drawCheckerboard(previewCtx, size, size);
    if (foregroundImageData) {
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = w;
      tempCanvas.height = h;
      const tempCtx = tempCanvas.getContext("2d");
      tempCtx.putImageData(foregroundImageData, 0, 0);
      previewCtx.drawImage(tempCanvas, dx, dy, dw, dh);
    } else {
      previewCtx.drawImage(originalImage, dx, dy, dw, dh);
    }
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

async function removeBackgroundAI() {
  if (!originalImage) return;

  showOverlay("AI 模型加载中，首次使用需下载模型（约 30MB）...");

  try {
    const blob = await imglyRemoveBackground(originalImage.src, {
      progress: (key, current, total) => {
        if (key === "compute:inference") {
          const pct = total > 0 ? Math.round((current / total) * 100) : 0;
          showOverlay(`正在推理抠图... ${pct}%`);
        } else {
          showOverlay(`加载模型资源中...`);
        }
      },
    });

    showOverlay("处理完成，正在渲染...");

    const resultImg = new Image();
    resultImg.src = URL.createObjectURL(blob);
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

  exportCanvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `background-changed.${ext}`;
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

  window.addEventListener("resize", () => {
    if (originalImage) updatePreview();
  });
}

setupEvents();