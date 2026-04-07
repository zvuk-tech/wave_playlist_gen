// ========================
// PALETTE & FORBIDDEN PAIRS
// ========================
const paletteColors = [
  "06DF65","B9FF8E","209F6D","AEEEFF","F7F0B1","FFD1E5","CBF2EC",
  "D7D9FF","2CB1FF","FF9535","FF49A0","00DBDB","765BFF"
];

const forbiddenPairsRaw = [
  ["AEEEFF","CBF2EC"],["B9FF8E","AEEEFF"],["B9FF8E","CBF2EC"],
  ["D3C8D0","F7F0B1"],["CBF2EC","AEEEFF"],["D3C8D0","FFD1E5"],
  ["D7D9FF","FFD1E5"],["209F6D","FF49A0"],["00DBDB","D3C8D0"],
  ["209F6D","D3C8D0"],["D3C8D0","D7D9FF"],["F7F0B1","B9FF8E"],
  ["FF9535","D7D9FF"],["D7D9FF","209F6D"],["D7D9FF","06DF65"],
  ["D7D9FF","CBF2EC"],["FF9535","00DBDB"],["FFD1E5","CBF2EC"],
  ["B9FF8E","FFD1E5"],["765BFF","209F6D"],["FFD1E5","AEEEFF"],
  ["00DBDB","06DF65"],["D3C8D0","CBF2EC"],["209F6D","765BFF"],
  ["B9FF8E","AEEEFF"],["F7F0B1","CBF2EC"],["AEEEFF","D7D9FF"],
  ["FF9535","D3C8D0"],["AEEEFF","D3C8D0"],["06DF65","FF9535"],
  ["B9FF8E","D7D9FF"],["06DF65","FF49A0"],["CBF2EC","B9FF8E"],
  ["FF49A0","06DF65"],
];

function normHex(h) {
  return String(h).trim().replace(/^#/, "").toUpperCase();
}

function pairKey(a, b) {
  const x = normHex(a);
  const y = normHex(b);
  return x < y ? `${x}|${y}` : `${y}|${x}`;
}

const forbiddenSet = new Set(forbiddenPairsRaw.map(([a, b]) => pairKey(a, b)));

function isForbidden(a, b) {
  return forbiddenSet.has(pairKey(a, b));
}

function randPalette() {
  return paletteColors[Math.floor(Math.random() * paletteColors.length)];
}

function pickAllowed() {
  for (let i = 0; i < 500; i++) {
    const bg = randPalette();
    const fg = randPalette();
    if (bg === fg || isForbidden(bg, fg)) continue;
    return [bg, fg];
  }
  return ["765BFF", "06DF65"];
}

function pickFor(fixed) {
  for (let i = 0; i < 500; i++) {
    const c = randPalette();
    if (c === normHex(fixed) || isForbidden(fixed, c)) continue;
    return c;
  }
  return "06DF65";
}

// ========================
// LOGO / PLAQUE SVG PATHS
// ========================
const LOGO_PATH = "M39.4025 0C27.8247 0 21.9616 1.55629 17.3063 3.48527C11.0464 6.07679 6.07705 11.0493 3.48542 17.3056C1.55636 21.9606 0 27.8235 0 39.4042C0 50.985 1.55636 56.8443 3.48542 61.5029C6.07705 67.7625 11.0498 72.7316 17.3063 75.3232C21.965 77.2521 27.8247 78.805 39.4025 78.805C50.9803 78.805 56.8434 77.2487 61.5021 75.3232C67.7621 72.7316 72.7314 67.7591 75.323 61.5029C77.2521 56.8443 78.805 50.985 78.805 39.4042C78.805 27.8235 77.2486 21.9641 75.323 17.3056C72.7314 11.0459 67.7586 6.07679 61.5021 3.48527C56.8468 1.55629 50.9837 0 39.4025 0ZM21.2369 12.968C24.4255 11.6463 28.9152 10.266 39.4059 10.266C49.9002 10.266 54.3863 11.6463 57.575 12.968C61.3158 14.5173 64.2905 17.4919 65.8434 21.236C67.1651 24.4245 68.5454 28.9139 68.5454 39.4042C68.5454 49.8945 67.1651 54.384 65.8434 57.5725C65.1566 59.2288 64.1938 60.7334 63.0067 62.0343C62.5926 62.4863 62.3407 62.759 62.144 62.9246C62.0543 62.6416 61.9818 62.2103 61.8679 61.5063C58.1858 38.6623 40.1479 20.6286 17.3063 16.9467C16.6023 16.8328 16.171 16.7603 15.888 16.6706C16.0536 16.4739 16.3263 16.222 16.7783 15.8079C18.0759 14.6209 19.5839 13.6581 21.2404 12.9714L21.2369 12.968ZM15.7016 16.5912H15.6947V16.5878H15.6982L15.7016 16.5912ZM11.1844 27.2437C11.2465 26.9056 11.2845 26.7261 11.3224 26.6053C11.4501 26.5984 11.6365 26.6123 11.985 26.6399C33.4324 28.2548 50.5558 45.374 52.1709 66.8239C52.1985 67.1725 52.2088 67.3588 52.2054 67.4865C52.0846 67.5245 51.9051 67.559 51.5669 67.6245C49.5861 68.0007 47.1394 68.2974 44.006 68.4424C43.6126 68.4596 43.3952 68.47 43.2468 68.4596C43.2019 68.3009 43.1709 68.0697 43.1122 67.6521C40.776 51.1195 27.697 38.0412 11.1637 35.705C10.7461 35.6463 10.5184 35.6118 10.3596 35.5704C10.3493 35.4186 10.3596 35.2046 10.3769 34.8113C10.5218 31.678 10.8186 29.2314 11.1948 27.2506L11.1844 27.2437ZM10.5632 46.9614C10.5218 46.4714 10.4977 46.1919 10.5046 46.0021C10.6875 46.0159 10.9497 46.0676 11.4122 46.1608C22.0513 48.3624 30.437 56.7443 32.6422 67.3864C32.7388 67.8488 32.7905 68.1145 32.8009 68.2974C32.6111 68.3043 32.3316 68.2836 31.8415 68.2388C26.4892 67.7626 23.5352 66.7894 21.2334 65.8336C17.4927 64.2842 14.518 61.3096 12.9651 57.5656C12.0092 55.2639 11.036 52.3066 10.5598 46.9545L10.5632 46.9614Z";
const PLAQUE_PATH = "M50.074 0C35.3605 0 27.9095 1.97779 21.9934 4.42919C14.0381 7.72258 7.72292 14.0419 4.42939 21.9925C1.97787 27.9083 0 35.359 0 50.0762C0 64.7934 1.97787 72.2397 4.42939 78.1599C7.72292 86.1149 14.0425 92.4298 21.9934 95.7232C27.9139 98.1746 35.3605 100.148 50.074 100.148C64.7875 100.148 72.2385 98.1702 78.1589 95.7232C86.1143 92.4298 92.4295 86.1105 95.723 78.1599C98.1745 72.2397 100.148 64.7934 100.148 50.0762C100.148 35.359 98.1701 27.9127 95.723 21.9925C92.4295 14.0375 86.1099 7.72258 78.1589 4.42919C72.2429 1.97779 64.7918 0 50.074 0Z";

// ========================
// QUALITY
// ========================
const PREVIEW_STEPS = 600;
const SVG_SOURCE_STEPS = 180;
const SVG_EDIT_POINTS_TARGET = 16;
const GLOBAL_SKEW_FACTOR = 0.6;

// ========================
// STATE
// ========================
let bgColor = "765BFF";
let fgColor = "06DF65";
let showLogo = false;
let showPlaque = false;

let params = {
  peaks: 8,
  amplitude: 150,
  thickness: 550,
  peakSkew: 0,
  rotation: 0,
  posZ: 0,
  organic: 0,
};

const DEFAULTS = { ...params };
let orgSeed = Math.random() * 100;

// ========================
// ORGANIC FIELD
// ========================
function organicField(a0, t, scl) {
  const aa = a0 * scl;
  const w1 = Math.sin(aa * 6.0 + t * 1.0);
  const w2 = Math.sin(aa * 2.6 + t * 0.55 + 1.7);
  const mod = 0.65 + 0.35 * Math.sin(aa * 1.3 - t * 0.25);
  return (w1 * 0.65 + w2 * 0.35) * mod;
}

// ========================
// GLOBAL SKEW
// ========================

function applyAffineSkewX(points, centerX, centerY, skewStrength, shearFactor = GLOBAL_SKEW_FACTOR) {
  if (!skewStrength || !points?.length) return points;

  const k = skewStrength * shearFactor;

  return points.map(pt => {
    const dx = pt.x - centerX;
    const dy = pt.y - centerY;

    return {
      x: centerX + dx + dy * k,
      y: centerY + dy
    };
  });
}

// ========================
// WAVE GENERATION
// ========================
function generateWave(p, size, steps = PREVIEW_STEPS) {
  const top = [];
  const bot = [];
  const len = size * 1.4;
  const x0 = -len * 0.05;
  const cy = size * 0.5;
  const phaseTop = -1.5;
  const phaseBottom = 1.5;
  const orgScl = 3.0;

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const env = t;
    const thick = p.thickness * env;
    const freq = p.peaks * Math.PI * 2;

    const rawTop = Math.sin(t * freq + phaseTop);
    const rawBot = Math.sin(t * freq + phaseBottom);

    const tW = rawTop * p.amplitude * env;
    const bW = rawBot * p.amplitude * env;

    const wob = organicField(t, orgSeed, orgScl) * p.organic * env;

    const rx = x0 + t * len;
    const topOff = Math.max(0, thick * 0.5 + tW);
    const botOff = Math.max(0, thick * 0.5 + bW);

    let topY = cy - topOff + wob;
    let botY = cy + botOff + wob;

    if (topY > botY) {
      const mid = (topY + botY) * 0.5;
      topY = mid;
      botY = mid;
    }

    top.push({ x: rx, y: topY });
    bot.push({ x: rx, y: botY });
  }

  const allPoints = [...top, ...bot];

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const pt of allPoints) {
    if (pt.x < minX) minX = pt.x;
    if (pt.x > maxX) maxX = pt.x;
    if (pt.y < minY) minY = pt.y;
    if (pt.y > maxY) maxY = pt.y;
  }

  const centerX = (minX + maxX) * 0.5;
  const centerY = (minY + maxY) * 0.5;

  const skewedTop = applyAffineSkewX(top, centerX, centerY, p.peakSkew);
  const skewedBot = applyAffineSkewX(bot, centerX, centerY, p.peakSkew);

  return { top: skewedTop, bot: skewedBot };
}

// ========================
// BADGE
// ========================
function drawBadge(ctx, w, h) {
  const logo = new Path2D(LOGO_PATH);
  const plaque = new Path2D(PLAQUE_PATH);

  const margin = w * 0.06;
  const badgeH = w * 0.12;

  let pS = 0, pW = 0, pH = 0;
  if (showPlaque) {
    pS = badgeH / 101;
    pW = 101 * pS;
    pH = 101 * pS;
  }

  const lH = showPlaque ? Math.min(w * 0.095, pH * 0.9) : w * 0.095;
  const lS = lH / 79;
  const lW = 79 * lS;

  if (!showPlaque) {
    pW = lW * 1.25;
    pH = lH * 1.25;
  }

  const x = w - margin - pW;
  const y = margin;
  const lX = x + (pW - lW) * 0.5;
  const lY = y + (pH - lH) * 0.5;

  ctx.save();
  ctx.globalAlpha = 1;

  if (showPlaque) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(pS, pS);
    ctx.fillStyle = "#" + bgColor;
    ctx.fill(plaque);
    ctx.restore();
  }

  ctx.save();
  ctx.translate(lX, lY);
  ctx.scale(lS, lS);
  ctx.fillStyle = showPlaque ? "#" + fgColor : "#" + bgColor;
  ctx.fill(logo);
  ctx.restore();

  ctx.restore();
}

function buildBadgeSVG(w, h) {
  if (!showLogo) return "";

  const margin = w * 0.06;
  const badgeH = w * 0.12;

  let pS = 0, pW = 0, pH = 0;
  if (showPlaque) {
    pS = badgeH / 101;
    pW = 101 * pS;
    pH = 101 * pS;
  }

  const lH = showPlaque ? Math.min(w * 0.095, pH * 0.9) : w * 0.095;
  const lS = lH / 79;
  const lW = 79 * lS;

  if (!showPlaque) {
    pW = lW * 1.25;
    pH = lH * 1.25;
  }

  const x = w - margin - pW;
  const y = margin;
  const lX = x + (pW - lW) * 0.5;
  const lY = y + (pH - lH) * 0.5;

  let out = "";

  if (showPlaque) {
    out += `
  <path
    d="${PLAQUE_PATH}"
    transform="translate(${svgNum(x)} ${svgNum(y)}) scale(${pS})"
    fill="#${bgColor}"
  />`;
  }

  out += `
  <path
    d="${LOGO_PATH}"
    transform="translate(${svgNum(lX)} ${svgNum(lY)}) scale(${lS})"
    fill="${showPlaque ? "#" + fgColor : "#" + bgColor}"
  />`;

  return out;
}
// ========================
// VIEW TRANSFORM
// ========================
function getWaveTransform(w, h) {
  const baseSize = 1000;

  let scale;

  // Для 640x320 сохраняем тот же центр и тот же "зум",
  // что у квадратной композиции: квадрат вписывается по высоте.
  if (w === 640 && h === 320) {
    scale = h / baseSize; // 0.32
  } else {
    scale = w / baseSize;
  }

  const scaledW = baseSize * scale;
  const scaledH = baseSize * scale;

  const offsetX = (w - scaledW) * 0.5;
  const offsetY = (h - scaledH) * 0.5;

  return { scale, offsetX, offsetY };
}
// ========================
// RENDER PREVIEW
// ========================
function render(canvas, w, h) {
  const ctx = canvas.getContext("2d");
  canvas.width = w;
  canvas.height = h;

  ctx.fillStyle = "#" + bgColor;
  ctx.fillRect(0, 0, w, h);

  const wave = generateWave(params, 1000, PREVIEW_STEPS);
  const { scale, offsetX, offsetY } = getWaveTransform(w, h);

  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.scale(scale, scale);

  const zScale = 1 + params.posZ / 500;

  ctx.translate(500, 500);
  ctx.scale(zScale, zScale);
  ctx.rotate(params.rotation * Math.PI / 180);
  ctx.translate(-500, -500);

  ctx.fillStyle = "#" + fgColor;
  ctx.beginPath();
  ctx.moveTo(wave.top[0].x, wave.top[0].y);

  for (let i = 1; i < wave.top.length; i++) {
    ctx.lineTo(wave.top[i].x, wave.top[i].y);
  }

  for (let i = wave.bot.length - 1; i >= 0; i--) {
    ctx.lineTo(wave.bot[i].x, wave.bot[i].y);
  }

  ctx.closePath();
  ctx.fill();
  ctx.restore();

  if (showLogo) drawBadge(ctx, w, h);
}
// ========================
// CANVAS SIZING
// ========================
function getCanvasSize() {
  const container = document.getElementById("canvas-container");
  const size = Math.min(container.clientWidth - 40, container.clientHeight - 40, 600);
  return Math.max(300, size);
}

function redraw() {
  const canvas = document.getElementById("mainCanvas");
  const size = getCanvasSize();
  canvas.style.width = size + "px";
  canvas.style.height = size + "px";
  render(canvas, size, size);
}

// ========================
// SLIDER SYNC
// ========================
function syncSliders() {
  for (const key in params) {
    const el = document.getElementById(key);
    if (el) el.value = params[key];
  }
}

function enforceConstraints() {
  if (params.thickness < 450 && params.amplitude > 200) {
    params.amplitude = 200;
    const el = document.getElementById("amplitude");
    if (el) el.value = 200;
  }

  const ampSlider = document.getElementById("amplitude");
  if (ampSlider) ampSlider.max = params.thickness < 450 ? 200 : 250;

  if (params.organic > 200) {
    params.peakSkew = Math.max(-0.25, Math.min(0.25, params.peakSkew));
    const el = document.getElementById("peakSkew");
    if (el) el.value = params.peakSkew;
  }

  const skewSlider = document.getElementById("peakSkew");
  if (skewSlider) {
    skewSlider.min = params.organic > 200 ? -0.25 : -1.5;
    skewSlider.max = params.organic > 200 ? 0.25 : 1.5;
  }

  const organicNorm = params.organic / 500;
  const minAmpFromOrganic = 100 + organicNorm * 120;

  if (params.amplitude < minAmpFromOrganic) {
    params.amplitude = minAmpFromOrganic;
    const el = document.getElementById("amplitude");
    if (el) el.value = params.amplitude;
  }

  const ampMax = params.thickness < 450 ? 200 : 250;
  if (params.amplitude > ampMax) {
    params.amplitude = ampMax;
    const el = document.getElementById("amplitude");
    if (el) el.value = params.amplitude;
  }
}

// ========================
// PALETTE SWATCHES
// ========================
function createSwatches() {
  const bgDiv = document.getElementById("bgPalette");
  const wvDiv = document.getElementById("wavePalette");
  if (!bgDiv || !wvDiv) return;

  bgDiv.innerHTML = "";
  wvDiv.innerHTML = "";

  paletteColors.forEach(hex => {
    const bgS = document.createElement("div");
    bgS.className = "swatch";
    bgS.style.backgroundColor = "#" + hex;
    bgS.addEventListener("click", () => {
      if (hex === fgColor || isForbidden(hex, fgColor)) fgColor = pickFor(hex);
      bgColor = hex;
      updateSwatchActive();
      redraw();
    });
    bgDiv.appendChild(bgS);

    const wvS = document.createElement("div");
    wvS.className = "swatch";
    wvS.style.backgroundColor = "#" + hex;
    wvS.addEventListener("click", () => {
      if (hex === bgColor || isForbidden(bgColor, hex)) bgColor = pickFor(hex);
      fgColor = hex;
      updateSwatchActive();
      redraw();
    });
    wvDiv.appendChild(wvS);
  });

  updateSwatchActive();
}

function updateSwatchActive() {
  document.querySelectorAll("#bgPalette .swatch").forEach((s, i) => {
    s.classList.toggle("is-active", paletteColors[i] === normHex(bgColor));
  });

  document.querySelectorAll("#wavePalette .swatch").forEach((s, i) => {
    s.classList.toggle("is-active", paletteColors[i] === normHex(fgColor));
  });
}

// ========================
// GENERATE / RESET
// ========================
function generateRandom() {
  const [bg, fg] = pickAllowed();
  bgColor = bg;
  fgColor = fg;

  const r = Math.random;
  const thickness = 400 + Math.floor(r() * 600);
  const ampMax = thickness < 450 ? 200 : 250;
  orgSeed = r() * 100;

  const organic = Math.floor(r() * 500);
  const organicNorm = organic / 500;
  const minAmp = 100 + organicNorm * 120;
  const skewMax = organic > 200 ? 0.25 : 1.0;

  params = {
    peaks: 3 + Math.floor(r() * 8),
    amplitude: minAmp + Math.floor(r() * Math.max(1, (ampMax - minAmp))),
    thickness,
    peakSkew: (r() - 0.5) * 2 * skewMax,
    rotation: Math.floor(r() * 360),
    posZ: Math.floor(r() * 500),
    organic,
  };

  syncSliders();
  enforceConstraints();
  updateSwatchActive();
  redraw();
}

function resetParams() {
  params = { ...DEFAULTS };
  const [bg, fg] = pickAllowed();
  bgColor = bg;
  fgColor = fg;

  syncSliders();
  enforceConstraints();
  updateSwatchActive();
  redraw();
}

// ========================
// SAVE PNG
// ========================
function saveHighRes(w, h) {
  const c = document.createElement("canvas");
  const mode = (w === 640 && h === 320) ? "cover" : "contain";
  render(c, w, h, mode);

  const a = document.createElement("a");
  a.download = `wave_${w}x${h}.png`;
  a.href = c.toDataURL("image/png");
  a.click();
}

// ========================
// SVG HELPERS
// ========================
function svgNum(n) {
  return Number(n).toFixed(2);
}

function pointAngle(a, b, c) {
  const abx = b.x - a.x;
  const aby = b.y - a.y;
  const bcx = c.x - b.x;
  const bcy = c.y - b.y;

  const abLen = Math.hypot(abx, aby);
  const bcLen = Math.hypot(bcx, bcy);
  if (abLen === 0 || bcLen === 0) return Math.PI;

  let dot = (abx * bcx + aby * bcy) / (abLen * bcLen);
  dot = Math.max(-1, Math.min(1, dot));
  return Math.acos(dot);
}

function findKeyPointIndices(points) {
  const keep = new Set();
  const n = points.length;

  if (n <= 2) {
    for (let i = 0; i < n; i++) keep.add(i);
    return [...keep].sort((a, b) => a - b);
  }

  keep.add(0);
  keep.add(n - 1);

  for (let i = 1; i < n - 1; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const next = points[i + 1];

    const dy1 = curr.y - prev.y;
    const dy2 = next.y - curr.y;

    const isExtremum = (dy1 >= 0 && dy2 < 0) || (dy1 <= 0 && dy2 > 0);
    if (isExtremum) {
      keep.add(i);
      continue;
    }

    const ang = pointAngle(prev, curr, next);
    const bend = Math.abs(Math.PI - ang);

    if (bend > 0.18) {
      keep.add(i);
    }
  }

  return [...keep].sort((a, b) => a - b);
}

function reducePointsEditorFriendly(points, targetCount = SVG_EDIT_POINTS_TARGET) {
  if (!points || points.length <= targetCount) return [...points];

  const keyIdx = findKeyPointIndices(points);
  const selected = new Set(keyIdx);

  if (selected.size < targetCount) {
    const candidates = [];

    for (let i = 1; i < points.length - 1; i++) {
      if (selected.has(i)) continue;

      const ang = pointAngle(points[i - 1], points[i], points[i + 1]);
      const bend = Math.abs(Math.PI - ang);

      const prev = points[i - 1];
      const curr = points[i];
      const next = points[i + 1];
      const dy1 = curr.y - prev.y;
      const dy2 = next.y - curr.y;
      const extremumBoost = ((dy1 >= 0 && dy2 < 0) || (dy1 <= 0 && dy2 > 0)) ? 10 : 0;

      candidates.push({
        i,
        importance: bend + extremumBoost
      });
    }

    candidates.sort((a, b) => b.importance - a.importance);

    for (const item of candidates) {
      if (selected.size >= targetCount) break;
      selected.add(item.i);
    }
  }

  const sorted = [...selected].sort((a, b) => a - b);

  if (sorted.length > targetCount) {
    const mustKeep = new Set(findKeyPointIndices(points));
    const removable = sorted
      .filter(i => !mustKeep.has(i))
      .map(i => {
        const idx = sorted.indexOf(i);
        const prevIdx = sorted[idx - 1];
        const nextIdx = sorted[idx + 1];
        const score = (nextIdx ?? i) - (prevIdx ?? i);
        return { i, score };
      })
      .sort((a, b) => a.score - b.score);

    let result = new Set(sorted);
    for (const item of removable) {
      if (result.size <= targetCount) break;
      result.delete(item.i);
    }

    return [...result].sort((a, b) => a - b).map(i => points[i]);
  }

  return sorted.map(i => points[i]);
}

function makeEditableWave(wave, targetCount = SVG_EDIT_POINTS_TARGET) {
  return {
    top: reducePointsEditorFriendly(wave.top, targetCount),
    bot: reducePointsEditorFriendly(wave.bot, targetCount)
  };
}

function buildSmoothPath(points, moveTo = true) {
  if (!points || points.length < 2) return "";

  let d = moveTo ? `M ${svgNum(points[0].x)} ${svgNum(points[0].y)}` : "";

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;

    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${svgNum(cp1x)} ${svgNum(cp1y)}, ${svgNum(cp2x)} ${svgNum(cp2y)}, ${svgNum(p2.x)} ${svgNum(p2.y)}`;
  }

  return d;
}

function buildWavePathData(wave) {
  if (!wave.top.length || !wave.bot.length) return "";

  const topPath = buildSmoothPath(wave.top, true);
  const reversedBot = [...wave.bot].reverse();
  const startBot = reversedBot[0];
  const joinLine = ` L ${svgNum(startBot.x)} ${svgNum(startBot.y)}`;
  const botPath = buildSmoothPath(reversedBot, false);

  return `${topPath}${joinLine}${botPath} Z`;
}

function buildSVG(w, h) {
  const rawWave = generateWave(params, 1000, SVG_SOURCE_STEPS);
  const wave = makeEditableWave(rawWave, SVG_EDIT_POINTS_TARGET);
  const wavePath = buildWavePathData(wave);

  const { scale, offsetX, offsetY } = getWaveTransform(w, h);
  const zScale = 1 + params.posZ / 500;
  const angle = params.rotation;

  const transform = [
    `translate(${svgNum(offsetX)} ${svgNum(offsetY)})`,
    `scale(${scale})`,
    `translate(500 500)`,
    `scale(${zScale})`,
    `rotate(${angle})`,
    `translate(-500 -500)`
  ].join(" ");

  const badgeSVG = buildBadgeSVG(w, h);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     width="${w}"
     height="${h}"
     viewBox="0 0 ${w} ${h}">
  <rect x="0" y="0" width="${w}" height="${h}" fill="#${bgColor}" />
  <g transform="${transform}">
    <path d="${wavePath}" fill="#${fgColor}" />
  </g>${badgeSVG}
</svg>`;
}

function saveSVG(w, h) {
  const mode = (w === 640 && h === 320) ? "cover" : "contain";
  const svg = buildSVG(w, h, mode);

  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `wave_${w}x${h}.svg`;
  a.click();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ========================
// INIT
// ========================
window.addEventListener("DOMContentLoaded", () => {
  const [bg, fg] = pickAllowed();
  bgColor = bg;
  fgColor = fg;

  for (const key in params) {
    const el = document.getElementById(key);
    if (!el) continue;

    el.addEventListener("input", () => {
      params[key] = parseFloat(el.value);
      enforceConstraints();
      redraw();
    });
  }

  document.getElementById("randomBtn")?.addEventListener("click", generateRandom);
  document.getElementById("resetBtn")?.addEventListener("click", resetParams);

  document.getElementById("save1000Btn")?.addEventListener("click", () => saveHighRes(1000, 1000));
  document.getElementById("save534Btn")?.addEventListener("click", () => saveHighRes(534, 530));
  document.getElementById("save640Btn")?.addEventListener("click", () => saveHighRes(640, 320));

  document.getElementById("save1000SvgBtn")?.addEventListener("click", () => saveSVG(1000, 1000));
  document.getElementById("save534SvgBtn")?.addEventListener("click", () => saveSVG(534, 530));
  document.getElementById("save640SvgBtn")?.addEventListener("click", () => saveSVG(640, 320));

  document.getElementById("randomColorBothBtn")?.addEventListener("click", () => {
    const [b, f] = pickAllowed();
    bgColor = b;
    fgColor = f;
    updateSwatchActive();
    redraw();
  });

  document.getElementById("randomBgBtn")?.addEventListener("click", () => {
    bgColor = pickFor(fgColor);
    updateSwatchActive();
    redraw();
  });

  document.getElementById("randomWaveBtn")?.addEventListener("click", () => {
    fgColor = pickFor(bgColor);
    updateSwatchActive();
    redraw();
  });

  const logoEl = document.getElementById("exportLogoToggle");
  const plaqueEl = document.getElementById("exportPlaqueToggle");

  logoEl?.addEventListener("change", () => {
    showLogo = logoEl.checked;

    if (showLogo) {
      showPlaque = true;
      if (plaqueEl) plaqueEl.checked = true;
    }

    if (!showLogo) {
      showPlaque = false;
      if (plaqueEl) plaqueEl.checked = false;
    }

    redraw();
  });

  plaqueEl?.addEventListener("change", () => {
    showPlaque = plaqueEl.checked;

    if (showPlaque && !showLogo) {
      showLogo = true;
      if (logoEl) logoEl.checked = true;
    }

    redraw();
  });

  createSwatches();
  syncSliders();
  enforceConstraints();
  redraw();

  window.addEventListener("resize", redraw);
});