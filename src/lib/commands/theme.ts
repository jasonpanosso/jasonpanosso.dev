import type { ColorPalette } from '$lib/types';

export function setPalette(palette: ColorPalette) {
  Object.keys(palette).forEach((key) => {
    const value = palette[key as keyof typeof palette];
    document.documentElement.style.setProperty(`--${key}-color`, value);
  });
}
