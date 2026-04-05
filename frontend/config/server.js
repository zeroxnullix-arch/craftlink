// Frontend server URL configuration
// Priority:
// 1. Vite env `import.meta.env.VITE_SERVER_URL` (recommended for builds)
// 2. Fallback to the default local dev server
// const DEFAULT_SERVER_URL = "http://192.168.1.2:8000";
const DEFAULT_SERVER_URL = "http://localhost:8000";
const resolvedServerUrl =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_SERVER_URL) ||
  DEFAULT_SERVER_URL;
export const serverUrl = resolvedServerUrl;
export default serverUrl;