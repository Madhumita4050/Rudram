// Centralized API configuration for Development & Production hosting
const envApiUrl = import.meta.env.VITE_API_URL;

// If VITE_API_URL is provided, sanitize and use it
let selectedApiUrl = envApiUrl;

if (!selectedApiUrl) {
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    console.warn(
      '[RudranPay API Config] VITE_API_URL is missing in production build. Please set VITE_API_URL in .env.production with your Render backend URL before running npm run build.'
    );
  }
  selectedApiUrl = 'http://localhost:5000/api';
}

// Remove trailing slash if present
export const API_BASE_URL = selectedApiUrl.replace(/\/+$/, '');


