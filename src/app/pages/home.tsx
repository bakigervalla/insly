import React, { useEffect } from "react";

import { useAuth } from "../context/auth/AuthProvider";

import LogIn from "./../components/account/login";
import Account from "./../components/account/account";

const Home = () => {
  const [authState, authDispatch] = useAuth();
  const { isAuthenticated } = authState;

  return isAuthenticated ? <Account /> : <LogIn />;
};

export default Home;
