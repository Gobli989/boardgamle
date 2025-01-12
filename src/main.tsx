import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.tsx';
// import './main.css';
import './app2/app2.css';
import App2 from './app2/App2.tsx';
import OverlayProvider from './app2/components/OverlayContext.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/', element: <OverlayProvider>
      <App2 />
    </OverlayProvider>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
