// Generate random hex color
const getRandomHex = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;

// Generate similar shades by changing lightness
export const generateSimilarShades = (baseHex) => {
  const shades = [];
  const hsl = hexToHSL(baseHex);

  for (let i = -2; i <= 2; i++) {
    const lightness = Math.min(100, Math.max(0, hsl.l + i * 10));
    shades.push(HSLToHex(hsl.h, hsl.s, lightness));
  }

  return shades;
};

// Generate a palette of 5 different random colors with similar shades
export const generateRandomPalette = () => {
  const baseColors = Array.from({ length: 5 }, () => getRandomHex());
  return baseColors.map((hex) => ({
    base: hex,
    shades: generateSimilarShades(hex),
  }));
};

// Helpers
const hexToHSL = (hex) => {
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }

  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

const HSLToHex = (h, s, l) => {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) [r, g, b] = [c, x, 0];
  else if (60 <= h && h < 120) [r, g, b] = [x, c, 0];
  else if (120 <= h && h < 180) [r, g, b] = [0, c, x];
  else if (180 <= h && h < 240) [r, g, b] = [0, x, c];
  else if (240 <= h && h < 300) [r, g, b] = [x, 0, c];
  else if (300 <= h && h < 360) [r, g, b] = [c, 0, x];

  const toHex = (n) =>
    Math.round((n + m) * 255)
      .toString(16)
      .padStart(2, '0');

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};
