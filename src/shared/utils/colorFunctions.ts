/**
 * Конвертирует hex цвет в RGB компоненты
 * @param hex - hex цвет (например, "#AAF683" или "AAF683")
 * @returns объект с компонентами r, g, b (0-255)
 */
const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const cleanHex = hex.replace('#', '');

  // Поддерживаем короткую запись #RGB
  const fullHex = cleanHex.length === 3
    ? cleanHex.split('').map(char => char + char).join('')
    : cleanHex;

  return {
    r: parseInt(fullHex.substring(0, 2), 16),
    g: parseInt(fullHex.substring(2, 4), 16),
    b: parseInt(fullHex.substring(4, 6), 16)
  };
};

/**
 * Конвертирует RGB компоненты в hex цвет
 * @param r - красный компонент (0-255)
 * @param g - зеленый компонент (0-255)
 * @param b - синий компонент (0-255)
 * @returns hex цвет в формате #RRGGBB
 */
const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (n: number) => Math.round(Math.max(0, Math.min(255, n))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Конвертирует RGB в HSL
 * @param r - красный компонент (0-255)
 * @param g - зеленый компонент (0-255)
 * @param b - синий компонент (0-255)
 * @returns объект с компонентами h (0-360), s (0-100), l (0-100)
 */
const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
  const [rNorm, gNorm, bNorm] = [r / 255, g / 255, b / 255];

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const l = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l: l * 100 }; // achromatic
  }

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h: number;
  switch (max) {
    case rNorm: h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6; break;
    case gNorm: h = ((bNorm - rNorm) / d + 2) / 6; break;
    case bNorm: h = ((rNorm - gNorm) / d + 4) / 6; break;
    default: h = 0;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
};

/**
 * Конвертирует HSL в RGB
 * @param h - оттенок (0-360)
 * @param s - насыщенность (0-100)
 * @param l - яркость (0-100)
 * @returns объект с компонентами r, g, b (0-255)
 */
const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
  const hNorm = h / 360;
  const sNorm = s / 100;
  const lNorm = l / 100;

  const hue2rgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  if (sNorm === 0) {
    const gray = lNorm * 255;
    return { r: gray, g: gray, b: gray }; // achromatic
  }

  const q = lNorm < 0.5 ? lNorm * (1 + sNorm) : lNorm + sNorm - lNorm * sNorm;
  const p = 2 * lNorm - q;

  return {
    r: hue2rgb(p, q, hNorm + 1 / 3) * 255,
    g: hue2rgb(p, q, hNorm) * 255,
    b: hue2rgb(p, q, hNorm - 1 / 3) * 255
  };
};

/**
 * Вычисляет относительную яркость цвета (luminance) по стандарту WCAG
 * @param r - красный компонент (0-255)
 * @param g - зеленый компонент (0-255)
 * @param b - синий компонент (0-255)
 * @returns значение яркости (0-1)
 */
const getLuminance = (r: number, g: number, b: number): number => {
  const [rs, gs, bs] = [r, g, b].map(c => {
    const normalized = c / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

/**
 * Вычисляет контрастность между двумя цветами по стандарту WCAG
 * @param color1 - первый цвет в формате RGB
 * @param color2 - второй цвет в формате RGB
 * @returns коэффициент контрастности (1-21)
 */
const getContrastRatio = (
  color1: { r: number; g: number; b: number },
  color2: { r: number; g: number; b: number }
): number => {
  const lum1 = getLuminance(color1.r, color1.g, color1.b);
  const lum2 = getLuminance(color2.r, color2.g, color2.b);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
};

/**
 * Создает контрастный цвет на основе исходного цвета
 * Использует более мягкий подход - не доходит до крайних значений,
 * предпочитает сохранять цветность исходного цвета
 * 
 * @param originalColor - исходный hex цвет (например, "#AAF683")
 * @param minContrast - минимальный коэффициент контрастности (по умолчанию 3.5 для более мягкого контраста)
 * @returns контрастный hex цвет
 */
export const getContrastColor = (originalColor: string, minContrast = 3.5): string => {
  const originalRgb = hexToRgb(originalColor);
  const originalHsl = rgbToHsl(originalRgb.r, originalRgb.g, originalRgb.b);

  // Определяем, светлый или темный исходный цвет
  const isLight = originalHsl.l > 50;

  // Более консервативные изменения яркости
  let targetLightness: number;
  if (isLight) {
    // Для светлых цветов: начинаем с умеренного затемнения
    targetLightness = Math.max(20, originalHsl.l - 35);
  } else {
    // Для темных цветов: начинаем с умеренного осветления  
    targetLightness = Math.min(80, originalHsl.l + 35);
  }

  // Слегка увеличиваем насыщенность для более выразительного цвета
  const targetSaturation = Math.min(100, Math.max(30, originalHsl.s + 10));

  let bestColor = rgbToHex(originalRgb.r, originalRgb.g, originalRgb.b);
  let bestContrast = 1;

  // Пробуем разные уровни яркости в выбранном направлении
  const step = 3;
  const maxSteps = isLight ?
    Math.floor((targetLightness - 5) / step) :
    Math.floor((95 - targetLightness) / step);

  for (let i = 0; i <= maxSteps; i++) {
    const currentLightness = isLight ?
      targetLightness - (i * step) :
      targetLightness + (i * step);

    // Ограничиваем диапазон, чтобы не доходить до чистого черного/белого
    const clampedLightness = Math.max(8, Math.min(92, currentLightness));

    const testRgb = hslToRgb(originalHsl.h, targetSaturation, clampedLightness);
    const contrast = getContrastRatio(originalRgb, testRgb);

    if (contrast > bestContrast) {
      bestContrast = contrast;
      bestColor = rgbToHex(testRgb.r, testRgb.g, testRgb.b);
    }

    // Если достигли требуемого контраста, останавливаемся
    if (contrast >= minContrast) {
      break;
    }
  }

  // Если не достигли минимального контраста, пробуем противоположное направление
  if (bestContrast < minContrast) {
    const oppositeDirection = !isLight;
    const oppositeStart = oppositeDirection ?
      Math.min(80, originalHsl.l + 35) :
      Math.max(20, originalHsl.l - 35);

    const oppositeMaxSteps = oppositeDirection ?
      Math.floor((95 - oppositeStart) / step) :
      Math.floor((oppositeStart - 5) / step);

    for (let i = 0; i <= oppositeMaxSteps; i++) {
      const currentLightness = oppositeDirection ?
        oppositeStart + (i * step) :
        oppositeStart - (i * step);

      const clampedLightness = Math.max(8, Math.min(92, currentLightness));

      const testRgb = hslToRgb(originalHsl.h, targetSaturation, clampedLightness);
      const contrast = getContrastRatio(originalRgb, testRgb);

      if (contrast > bestContrast) {
        bestContrast = contrast;
        bestColor = rgbToHex(testRgb.r, testRgb.g, testRgb.b);
      }

      if (contrast >= minContrast) {
        break;
      }
    }
  }

  // Только если совсем не получается достичь контраста, используем нейтральные цвета
  if (bestContrast < minContrast) {
    const neutralColors = [
      { color: '#2D3748', rgb: { r: 45, g: 55, b: 72 } },   // Темно-серый
      { color: '#718096', rgb: { r: 113, g: 128, b: 150 } }, // Средне-серый  
      { color: '#E2E8F0', rgb: { r: 226, g: 232, b: 240 } }, // Светло-серый
      { color: '#1A202C', rgb: { r: 26, g: 32, b: 44 } },   // Очень темный
    ];

    let bestNeutral = neutralColors[0];
    let bestNeutralContrast = 0;

    neutralColors.forEach(neutral => {
      const contrast = getContrastRatio(originalRgb, neutral.rgb);
      if (contrast > bestNeutralContrast) {
        bestNeutralContrast = contrast;
        bestNeutral = neutral;
      }
    });

    return bestNeutral.color;
  }

  return bestColor;
};
