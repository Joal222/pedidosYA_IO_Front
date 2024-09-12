// src/App.jsx
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextUIProvider } from '@nextui-org/react';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/authContext';
import { AuthModalProvider } from './context/AuthModalContext';
import AppRoutes from './components/router/AppRoutes';
import { HashRouter } from "react-router-dom"; // Importar HashRouter
import Auth from './components/auth/Auth'; // Importar AuthModal

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AuthProvider>
        <AuthModalProvider>
          <NextUIProvider>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <HashRouter>
              <AppRoutes />
              <Auth /> {/* Asegúrate de que Auth se renderiza aquí */}
            </HashRouter>
          </NextUIProvider>
        </AuthModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
