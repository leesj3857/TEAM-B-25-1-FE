const images = import.meta.glob('/src/**/*.webp', { eager: true, as: 'url' });

export function preloadAllWebpImages() {
  Object.values(images).forEach((src) => {
    const img = new Image();
    img.src = src as string;
  });
}