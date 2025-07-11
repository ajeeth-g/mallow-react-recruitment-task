import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.token);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};
