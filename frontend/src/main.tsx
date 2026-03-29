import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.tsx';

/**
 * Match Bootstrap light/dark to the OS setting so components look correct
 * without custom CSS variables.
 */
function syncBootstrapTheme() {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute(
    'data-bs-theme',
    isDark ? 'dark' : 'light'
  );
}

syncBootstrapTheme();
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', syncBootstrapTheme);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
