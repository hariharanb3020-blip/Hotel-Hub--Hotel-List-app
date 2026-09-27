const API_BASE = "http://localhost:5000";

/**
 * Resolves a hotel image URL.
 * - If the image path starts with "/uploads/", prepend the backend base URL.
 * - If it is already an absolute URL (http/https), return as-is.
 * - Otherwise return an empty string (no image).
 */
export function resolveImageUrl(image) {
  if (!image) return "";
  if (image.startsWith("/uploads/")) {
    return `${API_BASE}${image}`;
  }
  return image; // already an absolute URL (e.g. Unsplash links in seed data)
}
