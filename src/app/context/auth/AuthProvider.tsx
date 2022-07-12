import React, { useContext, useReducer, useEffect } from "react";
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";

import AuthContext from "./AuthContext";
import { AuthReducer } from "./AuthReducer";

import axios from "axios";

import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_ERRORS } from "../types";

// Create a custom hook to use the auth context
export const useAuth = (): any => {
  const { state, dispatch } = useContext(AuthContext);
  return [state, dispatch];
};

export const setLogin = (dispatch, user) => {
  console.log("set login");
  if (user && user.token?.length > 0)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: user,
    });
};

// Login User
export const login = (dispatch, formData: any, instances: any) => {
  axios
    .post(`${formData.instance.replace(/(\s*\/?\s*)*$/, "")}/api/login`, {
      email: formData.email,
      password: formData.password,
    })
    .then((res) => {
      // save login
      let user = { instance: formData.instance, email: formData.email, token: res.data.access_token };
      if (formData.rememberme) writeStorage("user", user);

      if (instances.indexOf(formData.instance) === -1) {
        instances.push(formData.instance);
        writeStorage("instances", instances);
      }
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user,
      });
    })
    .catch((err) =>
      dispatch({
        type: LOGIN_FAIL,
        payload: err,
      })
    );
};

// Logout
export const logout = (dispatch) => {
  dispatch({ type: LOGOUT });
};

// Clear Errors
export const clearErrors = (dispatch) => dispatch({ type: CLEAR_ERRORS });

export const AuthProvider = (props: any) => {
  let [user] = useLocalStorage<any>("user");
  const initialState = {
    initialized: false,
    loading: false,
    token: user?.token,
    isAuthenticated: false,
    user: {},
    error: {},
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return <AuthContext.Provider value={{ state, dispatch }}>{props.children}</AuthContext.Provider>;
};

export default AuthProvider;
