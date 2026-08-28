/**
 * Canonical site origin used for absolute URLs in <head> tags,
 * Open Graph / Twitter metadata, JSON-LD, and the generated sitemap.
 *
 * Override at build time with VITE_SITE_URL when needed (staging, etc.).
 */
export const SITE_URL: string =
  (import.meta as { env?: { VITE_SITE_URL?: string } }).env?.VITE_SITE_URL?.replace(
    /\/$/,
    "",
  ) || "https://www.sourcestandard.org";

export const absoluteUrl = (path?: string): string => {
  if (!path) return SITE_URL + "/";
  if (/^https?:\/\//i.test(path)) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
};
