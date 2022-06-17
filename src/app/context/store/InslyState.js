import React, { useReducer, useContext } from "react";
import useLocalStorage from "../../utils/local-storage";

import InslyContext from "./inslyContext";
import InslyReducer from "./inslyReducer";
import axios from "axios";
import client from "../api";

import {
  SET_INSTANCE,
  GET_INSTANCES,
  SET_LOADING,
  GET_SETTINGS,
  GET_SCHEMAS,
  GET_FIELDS,
  GET_TEMPLATES,
  SUBMIT_DOCUMENT,
  GET_DOCUMENT,
  ERROR,
  CLEAR_ERROR,
} from "../types";

// Create a custom hook to use the Vehicle context

export const useInsly = () => {
  const { state, dispatch } = useContext(InslyContext);
  return [state, dispatch];
};

export const setLoading = async (dispatch, loading) => {
  dispatch({
    type: SET_LOADING,
    payload: loading,
  });
};

export const setInstance = async (dispatch, url) => {
  try {
    const [instances, setInstances] = useLocalStorage("instances", []);
    setInstances([...instances, url]);

    dispatch({
      type: SET_INSTANCE,
      payload: url,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: err,
    });
  }
};

export const getInstances = async (dispatch) => {
  try {
    const [instances] = useLocalStorage("instances");

    dispatch({
      type: GET_INSTANCES,
      payload: instances,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: err,
    });
  }
};

// Authenticate user
export const getLogin = async (dispatch, email, password) => {
  try {
    setLoading(dispatch, true);

    const req = {
      email: email,
      password: password,
    };

    const res = await client.post("/login/", req);

    dispatch({
      type: GET_SETTINGS,
      payload: res.data,
    });

    setLoading(dispatch, false);
  } catch (err) {
    setLoading(dispatch, false);
    dispatch({
      type: ERROR,
      payload: err.response.msg,
    });
  }
};

// Get Services
export const getSchemas = async (dispatch) => {
  try {
    // const res = await client.get(`${}/login/`, req)

    dispatch({
      type: GET_SCHEMAS,
      payload: null,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: err,
    });
  }
};

// Add Service
export const addService = async (dispatch, service) => {
  try {
    service.selected = true;
    dispatch({
      type: GET_FIELDS,
      payload: service,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: err.response.msg,
    });
  }
};

// Remove Service
export const removeService = async (dispatch, service) => {
  try {
    service.selected = false;

    dispatch({
      type: GET_TEMPLATES,
      payload: service,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: err,
    });
  }
};

// Find Personal Information by phone number
export const findPerson = async (dispatch, phone) => {
  try {
    setLoading(dispatch, true);

    let url = `https://live.intouch.no/tk/search.php?qry=${phone}&from=1&to=27&format=json&charset=UTF-8&username=CARSCAS&password=caso641`;
    const res = await axios.get(url);

    const {
      1: {
        listing: { duplicates },
      },
    } = res.data.result;

    dispatch({
      type: SUBMIT_DOCUMENT,
      payload: duplicates ? duplicates[0] : {},
    });

    setLoading(dispatch, false);
  } catch (err) {
    setLoading(dispatch, false);
    dispatch({
      type: ERROR,
      payload: err,
    });
  }
};

export const setPerson = async (dispatch, person) => {
  try {
    dispatch({
      type: GET_DOCUMENT,
      payload: person,
    });

    // navigation.navigate(url);
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: err,
    });
  }
};

export const submitOrder = async (dispatch, order) => {
  try {
    setLoading(dispatch, true);

    const res = await client.post("/web-order", order);

    dispatch({
      type: SUBMIT_DOCUMENT,
      payload: res.data,
    });

    setLoading(dispatch, false);
  } catch (err) {
    setLoading(dispatch, false);
    dispatch({
      type: ERROR,
      payload: err,
    });
  }
};

export const clearError = async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};

const InslyState = (props) => {
  const initialState = {
    instances: null,
    schema: [],
    fields: [],
    templates: [],
    current: null,
    error: null,
    isLoading: false,
    step: 1,
  };

  const [state, dispatch] = useReducer(InslyReducer, initialState);

  return <InslyContext.Provider value={{ state: state, dispatch }}>{props.children}</InslyContext.Provider>;
};

export default InslyState;
