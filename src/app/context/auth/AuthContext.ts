import React, { createContext } from "react";

type AuthProps = {
  initialized: boolean;
  loading: boolean;
  token: string;
  isAuthenticated: boolean;
  user: any;
  error: any;
};

const initialState: AuthProps = {
  initialized: false,
  loading: false,
  token: "",
  isAuthenticated: false,
  user: {},
  error: {},
};

const authContext = createContext<{ state: AuthProps; dispatch: React.Dispatch<any> }>({
  state: initialState,
  dispatch: () => null,
});

export default authContext;
