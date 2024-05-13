/**
 * The isDev variable is used to determine if the application is running in development mode
 * @type {boolean} isDev
 */

export const isDev = import.meta.env.DEV;

/**
 * The URL of the socket server changes based on the environment
 * @type {string} SOCKET_URL
 */

export const SOCKET_URL = isDev
  ? import.meta.env.VITE_SOCKET_URL
  : window.location.origin;

/**
 * The URL of the backend server changes based on the environment
 * @type {string} BACKEND_SERVER_URL
 */

export const BACKEND_SERVER_URL = isDev
  ? import.meta.env.VITE_SERVER_URL
  : window.location.origin;
