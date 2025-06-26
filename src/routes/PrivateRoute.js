import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Componente para rotas protegidas que requerem autenticação
const PrivateRoute = () => {
  const { currentUser } = useAuth();
  
  // Redireciona para a página de login se o usuário não estiver autenticado
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
