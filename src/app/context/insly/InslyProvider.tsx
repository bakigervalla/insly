import React, { useReducer } from "react";
import { useLocalStorage } from "@rehooks/local-storage";

import InslyContext from "./InslyContext";
import { InslyReducer } from "./InslyReducer";

import axios from "axios";

import {
  INITIALIZED,
  SET_INSTANCE,
  GET_INSTANCES,
  GET_SETTINGS,
  GET_SCHEMAS,
  GET_FIELDS,
  GET_TEMPLATES,
  SUBMIT_DOCUMENT,
  GET_DOCUMENT,
  ERROR,
  CLEAR_ERRORS,
} from "../types";

// Create a custom hook to use the Vehicle context

export default function InslyProvider({ children }: any) {
  const initialState: any = {
    intialized: false,
    settings: {},
    instances: [],
    schemas: {},
    fields: [],
    templates: {},
    document: {},
  };

  const [state, dispatch] = useReducer(InslyReducer, initialState);
  const INSTANCE_URI = "";

  const setInstance = async (dispatch, url) => {
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

  const getInstances = () => {
    try {
      const instances = useLocalStorage("instances");

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

  const getSettings = () => {
    axios(`${INSTANCE_URI}assets?limit=1500`)
      .then((res) => {
        dispatch({
          type: GET_SETTINGS,
          payload: res.data.data,
        });
        dispatch({
          type: INITIALIZED,
          payload: true,
        });
      })
      .catch((err) =>
        dispatch({
          type: ERROR,
          payload: err,
        })
      );
  };

  // Get Services
  const getSchemas = () => {
    axios(`${INSTANCE_URI}assets?limit=1500`)
      .then((res) => {
        dispatch({
          type: GET_SCHEMAS,
          payload: res.data.data,
        });
        dispatch({
          type: INITIALIZED,
          payload: true,
        });
      })
      .catch((err) =>
        dispatch({
          type: ERROR,
          payload: err,
        })
      );
  };

  // Get Fields
  const getFields = () => {
    axios(`${INSTANCE_URI}assets?limit=1500`)
      .then((res) => {
        dispatch({
          type: GET_FIELDS,
          payload: res.data.data,
        });
        dispatch({
          type: INITIALIZED,
          payload: true,
        });
      })
      .catch((err) =>
        dispatch({
          type: ERROR,
          payload: err,
        })
      );
  };

  // Get GET_TEMPLATES
  const getTemplates = async (dispatch) => {
    axios(`${INSTANCE_URI}assets?limit=1500`)
      .then((res) => {
        dispatch({
          type: GET_TEMPLATES,
          payload: res.data.data,
        });
        dispatch({
          type: INITIALIZED,
          payload: true,
        });
      })
      .catch((err) =>
        dispatch({
          type: ERROR,
          payload: err,
        })
      );
  };

  // Submit Document
  const submitDocument = async (dispatch) => {
    axios(`${INSTANCE_URI}assets?limit=1500`)
      .then((res) => {
        dispatch({
          type: SUBMIT_DOCUMENT,
          payload: res.data.data,
        });
        dispatch({
          type: INITIALIZED,
          payload: true,
        });
      })
      .catch((err) =>
        dispatch({
          type: ERROR,
          payload: err,
        })
      );
  };

  // Get Document
  const getDocument = async (dispatch) => {
    axios(`${INSTANCE_URI}assets?limit=1500`)
      .then((res) => {
        dispatch({
          type: GET_DOCUMENT,
          payload: res.data.data,
        });
        dispatch({
          type: INITIALIZED,
          payload: true,
        });
      })
      .catch((err) =>
        dispatch({
          type: ERROR,
          payload: err,
        })
      );
  };

  const clearError = async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };

  const { instances, settings, schemas, fields, templats, documents } = state;
  const providerValue: any = {
    instances,
    settings,
    schemas,
    fields,
    templats,
    documents,
    setInstance,
    getInstances,
    getSettings,
    getSchemas,
    getFields,
    getTemplates,
    submitDocument,
    getDocument,
    clearError,
  };

  return <InslyContext.Provider value={providerValue}>{children}</InslyContext.Provider>;
}
