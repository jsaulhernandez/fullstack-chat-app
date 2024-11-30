export const API_PREFIX = import.meta.env.VITE_PREFIX;
export const API_URL = `${import.meta.env.VITE_API_URL}${API_PREFIX}`;
export const MODE = import.meta.env.MODE;
export const SOCKET_BASE_URL =
  MODE === "development" ? import.meta.env.VITE_API_URL : "/";

// themes
export const THEMES = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
];
