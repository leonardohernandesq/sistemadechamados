
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './contexts/auth';
import React from 'react';
import RoutesApp from './routes';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RoutesApp />
        <ToastContainer autoClose={3000} />
      </BrowserRouter>
    </AuthProvider>
  );
}