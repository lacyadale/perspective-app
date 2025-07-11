import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom';

import { AuthProvider, useAuth } from './auth/AuthContext';
import LoginPage     from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

const Protected = ({ children }: { children: JSX.Element }) => {
  const { apiKey } = useAuth();
  return apiKey ? children : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/',     element: <Protected><DashboardPage/></Protected> },
]);

export default function AppRouter() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
