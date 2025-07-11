import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './router';       // <-- must match src/router.tsx
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRouter/>
  </React.StrictMode>
);
