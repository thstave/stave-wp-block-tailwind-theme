// --- Utility to parse dimensions like %, px, em, rem, vw, vh ---
function parseDimension(value, containerWidth) {
  if (typeof value !== "string") return 0;
  const baseFontSize = getBaseFontSize() || 16;
  const emFontSize = getEMFontSize(containerWidth) || 16;

  const trimmed = value.trim();

  if (trimmed.endsWith("%")) {
    const percent = parseFloat(trimmed);
    return (percent / 100) * containerWidth;
  } else if (trimmed.endsWith("px")) {
    return parseFloat(trimmed);
  } else if (trimmed.endsWith("rem")) {
    const rem = parseFloat(trimmed);
    return rem * baseFontSize;
  } else if (trimmed.endsWith("em")) {
    const em = parseFloat(trimmed);
    return em * emFontSize; 
  } else if (trimmed.endsWith("vw")) {
    const vw = parseFloat(trimmed);
    return (vw / 100) * window.innerWidth;
  } else if (trimmed.endsWith("vh")) {
    const vh = parseFloat(trimmed);
    return (vh / 100) * window.innerHeight;
  }

  return 0;
}

// --- Safely get base font size (usually 16px) ---
export function getBaseFontSize() {
  const fontSizeString = window.getComputedStyle(document.body).getPropertyValue('font-size');
  const fontSizeNumber = Number(fontSizeString.match(/\d+/)?.[0]) || 16;
  return fontSizeNumber;
}

// --- Safely get element's em font size ---
export function getEMFontSize(element) {
  if (!element || !(element instanceof Element)) {
    return 16; // fallback default
  }
  const fontSizeString = window.getComputedStyle(element).getPropertyValue('font-size');
  const fontSizeNumber = Number(fontSizeString.match(/\d+/)?.[0]) || 16;
  return fontSizeNumber;
}

// --- Safely measure width of a DOM element ---
export function measureElementWidth(element, containerWidth) {
  if (!element || !(element instanceof Element)) {
    console.warn('⚠️ measureElementWidth: element is missing or not a valid DOM Element');
    return 0;
  }

  const computedStyle = window.getComputedStyle(element);
  let width = element.getBoundingClientRect().width;

  if (width === 0) {
    width = parseDimension(computedStyle.width, containerWidth, parseFloat(computedStyle.fontSize));
  }

  return width;
}

// --- Safely parse any CSS unit to pixels ---
export function parseCssUnitToPixels(value, containerWidth) {
  return parseDimension(value, containerWidth);
}
