import React from 'react';
import ReactDOM from 'react-dom/client';
import './app2.css';
import App2 from './App2.tsx';
import OverlayProvider from './components/OverlayContext.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import ChangelogPage from './pages/Changelog.tsx';
import MultiplayerPage from './pages/multiplayer/MultiplayerPage.tsx';
import PeerProvider from './components/peer/PeerProvider.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App2 />,
    errorElement: < ErrorBoundary />
  },
  {
    path: '/changelog',
    element: <ChangelogPage />,
    errorElement: < ErrorBoundary />
  },
  {
    path: '/multiplayer',
    element: <MultiplayerPage />,
    errorElement: < ErrorBoundary />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PeerProvider>
      <OverlayProvider>
        <RouterProvider router={router} />
      </OverlayProvider>
    </PeerProvider>
  </React.StrictMode>
);
