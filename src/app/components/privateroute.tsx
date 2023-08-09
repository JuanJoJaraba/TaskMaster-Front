import React from 'react';
import { Navigate, Route } from 'react-router-dom';

interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, element }) => {
  const isLoggedIn = sessionStorage.getItem('user'); 

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Route path={path} element={element} />;
};

export default PrivateRoute;
