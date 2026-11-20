// Configuration de l'URL de l'API Backend
// En local: utilise http://localhost:5000 par défaut
// En production (Vercel): lit la variable d'environnement VITE_API_URL (URL de Render)

const envApiUrl = import.meta.env.VITE_API_URL;

export const API_BASE_URL: string = envApiUrl
  ? envApiUrl.replace(/\/+$/, '')
  : (import.meta.env.DEV ? 'http://localhost:5000' : '');
