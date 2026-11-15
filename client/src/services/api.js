/**
 * SOCIETIX Client API Configuration
 * -------------------------------------------------------------
 * In local development:
 *   VITE_API_URL is unset -> defaults to '' (empty string),
 *   so requests like `${API_BASE_URL}/api/v1/auth/login` resolve to
 *   `/api/v1/auth/login` and are automatically proxied by Vite to localhost:5000.
 *
 * In production (e.g. Vercel deployment):
 *   Configure VITE_API_URL in Vercel project environment variables
 *   (e.g., https://societix-api.onrender.com).
 *   All requests will automatically route to your cloud backend.
 */
export const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
