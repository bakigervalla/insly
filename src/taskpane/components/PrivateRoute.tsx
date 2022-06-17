import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../app/context/auth/AuthState";
import Spinner from "../../app/components/common/Spinner";

const PrivateRoute = ({ component: Component }) => {
  const [authState] = useAuth();
  const { isAuthenticated, loading } = authState;
  if (loading) return <Spinner />;
  if (isAuthenticated) return <Component />;
  return <Navigate to="/login" />;
};

export default PrivateRoute;
