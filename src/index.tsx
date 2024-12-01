import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FavouriteContextProvider } from './context/FavouriteContext';
import { ErrorBoundary } from 'react-error-boundary';
import FallbackComponent from './components/FallbackComponent';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={FallbackComponent}
      onReset={() => {
        console.log('Error boundary reset!');
      }}
    >
      <FavouriteContextProvider>
        <App />
      </FavouriteContextProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

reportWebVitals();
