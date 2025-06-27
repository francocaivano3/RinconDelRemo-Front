// src/routers/ProtectedRoute.jsx
import React from 'react';
import { useAuth } from '../components/context/authContext/AuthContext';
import { determineUserType } from '../utils/authUtils';
import NotFound from '../components/pages/notFound/NotFound';

const ProtectedRoute = ({ userType, children, allowAllAuthenticated = false }) => {
  const { userInfo } = useAuth();

  console.log('ProtectedRoute - userInfo:', userInfo);
  console.log('ProtectedRoute - userType:', userType);
  console.log('ProtectedRoute - allowAllAuthenticated:', allowAllAuthenticated);


  // Verificar si el usuario está autenticado (tiene tipo o rol)
  const userRole = determineUserType(userInfo);
  const hasTypeOrRole = userRole !== null;
  
  console.log('ProtectedRoute - userRole:', userRole);
  console.log('ProtectedRoute - hasTypeOrRole:', hasTypeOrRole);

  // Si allowAllAuthenticated es true, permitir acceso a cualquier usuario autenticado
  const hasAccess = allowAllAuthenticated 
    ? hasTypeOrRole 
    : userRole === userType;

  if (!hasAccess) {
    console.log('ProtectedRoute - Acceso denegado');
    return <NotFound />;
  }

  console.log('ProtectedRoute - Acceso permitido');
  return children;
};
export default ProtectedRoute;