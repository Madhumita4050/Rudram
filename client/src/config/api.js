// Centralized API configuration for Development & Production hosting
const envApiUrl = import.meta.env.VITE_API_URL;

if (!envApiUrl) {
  console.warn(
    '[RudranPay API Config] VITE_API_URL is not set. Falling back to http://localhost:5000/api. For live production deployment, please configure VITE_API_URL in your hosting environment (e.g. Vercel/Netlify).'
  );
}

export const API_BASE_URL = envApiUrl || 'http://localhost:5000/api';

