export const ICON_PATHS = {
  search: "M11 11l4 4m-1.5-6.5a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z",
  menu: "M3 6h18M3 12h18M3 18h18",
  close: "M6 6l12 12M18 6L6 18",
  check: "m4.5 12.5 5 5 10-11",
  arrowRight: "M4 12h15m0 0-6-6m6 6-6 6",
  arrowLeft: "M20 12H5m0 0 6-6m-6 6 6 6",
  chevronDown: "m6 9 6 6 6-6",
  play: "M8 5.5v13l11-6.5-11-6.5Z",
  sparkle:
    "M12 3.5 13.6 9 19 10.5 13.6 12 12 17.5 10.4 12 5 10.5 10.4 9 12 3.5Z",
  book: "M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5v-13Zm16 0A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5v-13Z",
  fire: "M12 3s5 4.2 5 8.6a5 5 0 0 1-10 0C7 9.4 9 8 9 8s-.5 2 1 2.6c0-2.2 2-4.6 2-7.6Z",
  link: "M10 14a4 4 0 0 0 5.7 0l2.6-2.6a4 4 0 1 0-5.7-5.7L11.5 7M14 10a4 4 0 0 0-5.7 0L5.7 12.6A4 4 0 1 0 11.4 18.3L12.5 17",
  lock: "M7 10V8a5 5 0 0 1 10 0v2m-11 0h12v9H6v-9Z",
  undo: "M9 14 5 10l4-4M5 10h8a5 5 0 0 1 0 10h-3",
  send: "M4 12 20 4l-6 16-2.5-6L4 12Z",
  mic: "M12 4a3 3 0 0 1 3 3v5a3 3 0 1 1-6 0V7a3 3 0 0 1 3-3Zm7 8a7 7 0 0 1-14 0m7 7v3",
  users:
    "M15.5 19v-1.5a4 4 0 0 0-4-4h-5a4 4 0 0 0-4 4V19M9 6.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm12.5 12.5v-1.5a4 4 0 0 0-3-3.87M16 3.63a4 4 0 0 1 0 7.75",
  trophy:
    "M8 4h8v5a4 4 0 0 1-8 0V4Zm0 2H5.5A2.5 2.5 0 0 0 8 11m8-5h2.5A2.5 2.5 0 0 1 16 11m-4-2v6m-3 3h6",
  grid: "M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z",
  code: "m9 8-4 4 4 4m6-8 4 4-4 4m-2-11-2 14",
};

export function hasIcon(name) {
  return typeof name === "string" && Object.hasOwn(ICON_PATHS, name);
}
