import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Guard against third-party extension errors (MetaMask inpage.js, web3 wallet extensions, etc.)
if (typeof window !== 'undefined') {
  const isExtensionError = (msg?: string, src?: string, stack?: string) => {
    const text = `${msg || ''} ${src || ''} ${stack || ''}`.toLowerCase();
    return (
      text.includes('metamask') ||
      text.includes('chrome-extension://') ||
      text.includes('moz-extension://') ||
      text.includes('failed to connect to metamask')
    );
  };

  window.addEventListener('unhandledrejection', (event) => {
    const reason = (event.reason || {}) as { message?: string; stack?: string };
    const msg = typeof reason === 'string' ? reason : reason.message || '';
    if (isExtensionError(msg, '', reason.stack)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });

  window.addEventListener(
    'error',
    (event) => {
      const err = (event.error || {}) as { stack?: string };
      if (isExtensionError(event.message, event.filename, err.stack)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
