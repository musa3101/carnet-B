import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { ProgressProvider } from './context/ProgressContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ProgressProvider>
        <App />
      </ProgressProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
