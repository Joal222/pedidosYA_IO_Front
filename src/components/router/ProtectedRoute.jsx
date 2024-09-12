// src/router/ProtectedRoute.jsx
import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { useAuthModal } from '../../context/AuthModalContext';

const ProtectedRoute = ({ role }) => {
  const { user } = useContext(AuthContext);
  const { openAuthModal } = useAuthModal();

  useEffect(() => {
    if (!user) {
      openAuthModal();
    }
  }, [user, openAuthModal]);

  if (!user) {
    // No redirigimos, solo abrimos el modal
    return null;
  }

  if (role && user.role !== role) {
    return <Navigate to="/not-authorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
