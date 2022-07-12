import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../app/context/auth/AuthProvider";
import Spinner from "../../app/components/common/Spinner";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [authState, authDispatch] = useAuth();
  const { isAuthenticated, loading } = authState;

  <Spinner spinning={loading} />;
  return <Route {...rest} render={(props) => (isAuthenticated ? <Component {...props} /> : <Redirect to="/home" />)} />;
};

export default PrivateRoute;
