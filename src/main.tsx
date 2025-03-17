import React from 'react';
import ReactDOM from 'react-dom/client';
import './app2.css';
import App2 from './App2.tsx';
import OverlayProvider from './components/OverlayContext.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (<OverlayProvider>
      <App2 />
    </OverlayProvider>),
    errorElement: < ErrorBoundary />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
