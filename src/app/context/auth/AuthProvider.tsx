import React, { useContext, useReducer } from "react";
import { useLocalStorage, writeStorage, deleteFromStorage } from "@rehooks/local-storage";

import AuthContext from "./AuthContext";
import { AuthReducer } from "./AuthReducer";

import setAuthToken from "./setAuthToken";
import axios from "axios";

import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, GET_SETTINGS, AUTH_ERROR, CLEAR_ERRORS } from "../types";

// Create a custom hook to use the auth context
export const useAuth = (): any => {
  const { state, dispatch } = useContext(AuthContext);
  return [state, dispatch];
};

export const setLogin = (dispatch, user) => {
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

      // set token and base url
      setAuthToken(user.token, user.instance);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: user,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response?.data?.message,
      });
    });
};

// Logout
export const logout = (dispatch) => {
  deleteFromStorage("user");
  dispatch({ type: LOGOUT });
};

// Get Settings
export const getSettings = (dispatch, user) => {
  const settings = {
    email: user.email,
    name: "baki gervalla",
    version: "1.2",
    url: user.instance,
    settings: {
      fieldsDisplay: "2",
      insertWithTitle: false,
      uploadConfirmation: true,
      keepMeLogged: false,
    },
  };

  writeStorage("config", settings);

  dispatch({
    type: GET_SETTINGS,
    //payload: res.data,
    payload: settings,
  });

  return;

  axios
    .post(`${user.instance}/api/addins/word/config`, {
      email: user.email,
      name: "baki gervalla",
      version: "1.2",
      url: "https://uniqa.insly.site",
      settings: {
        fieldsDisplay: "1",
        insertWithTitle: false,
        uploadConfirmation: true,
        keepMeLogged: false,
      },
    })
    .then((res) => {
      writeStorage("config", res.data);

      dispatch({
        type: GET_SETTINGS,
        //payload: res.data,
        payload: {
          email: user.email,
          name: "baki gervalla",
          version: "1.2",
          url: user.instance,
          settings: {
            fieldsDisplay: "1",
            insertWithTitle: false,
            uploadConfirmation: true,
            keepMeLogged: false,
          },
        },
      });
    })
    .catch((err) =>
      dispatch({
        type: AUTH_ERROR,
        payload: err,
      })
    );
};

export const saveSettings = (dispatch, settings) => {
  deleteFromStorage("config");
  writeStorage("config", settings);

  dispatch({
    type: GET_SETTINGS,
    //payload: res.data,
    payload: settings,
  });
};

// Clear Errors
export const clearErrors = (dispatch) => dispatch({ type: CLEAR_ERRORS });

export const AuthProvider = (props: any) => {
  let [user] = useLocalStorage<any>("user");
  let [settings] = useLocalStorage<any>("config");
  const initialState = {
    initialized: false,
    loading: false,
    token: user?.token,
    isAuthenticated: user?.token.length > 0,
    user: user || {},
    config: settings || {
      fieldsDisplay: "1",
      insertWithTitle: false,
      uploadConfirmation: true,
      keepMeLogged: false,
    },
    error: {},
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return <AuthContext.Provider value={{ state, dispatch }}>{props.children}</AuthContext.Provider>;
};

export default AuthProvider;
