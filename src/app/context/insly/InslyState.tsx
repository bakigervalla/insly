import React, { useContext, useReducer } from "react";
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
  SET_SELECTED_SCHEMA,
  GET_TEMPLATES,
  SUBMIT_DOCUMENT,
  GET_DOCUMENT,
  GET_PAYLOAD,
  DOCUMENT_PREVIEW,
  ERROR,
  CLEAR_ERRORS,
} from "../types";
import { reject } from "lodash";

// Create a custom hook to use the Vehicle context

export const useInsly = () => {
  const { state, dispatch } = useContext(InslyContext);
  return [state, dispatch];
};

export const getSchemas = (dispatch) => {
  axios(`/api/add-ins/word/schemas/`)
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
    .catch((err) => {
      dispatch({
        type: ERROR,
        payload: err,
      });
    });
};

// Get Fields
export const getFields = (dispatch, schema_id, integration_key) => {
  dispatch({
    type: GET_FIELDS,
    payload: [],
  });

  if (!schema_id || !integration_key) return;

  axios(`/api/add-ins/word/schemas/${schema_id}/integrations/${integration_key}`)
    .then((res) => {
      const { fields } = res.data.data;
      dispatch({
        type: GET_FIELDS,
        payload: fields,
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
export const getTemplates = async (dispatch) => {
  axios(`/api/add-ins/word/templates/`)
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

export const setSchema = (dispatch, schema) => {
  dispatch({
    type: SET_SELECTED_SCHEMA,
    payload: schema,
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

export const getInstances = (dispatch) => {
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

export const getSettings = (dispatch) => {
  axios(`assets?limit=1500`)
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

// Submit Document
export const submitDocument = async (dispatch, template_tag, template_locale, filePath) => {
  var ext = filePath.split(".").pop();
  var leafname = filePath.split("\\").pop().split("/").pop();
  getFileBytes(ext).then((result) => {
    let formData = new FormData();
    formData.append("file", result, leafname);
    formData.append("_method", "put");

    axios
      .post(`/api/add-ins/word/templates/${template_tag}/${template_locale}`, formData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((res) => {
        dispatch({
          type: SUBMIT_DOCUMENT,
          payload: res.data.data,
        });
      })
      .catch((err) =>
        dispatch({
          type: ERROR,
          payload: err,
        })
      );
  });
};

const getFileBytes = (ext: string): any => {
  return new Promise((resolve) => {
    Office.context.document.getFileAsync(Office.FileType.Compressed, { sliceSize: 1000000 }, function (result) {
      if (result.status == Office.AsyncResultStatus.Succeeded) {
        var file = result.value;
        file.getSliceAsync(0, function (result) {
          if (result.status == Office.AsyncResultStatus.Succeeded) {
            var blob = new Blob(result.value.data);
            var reader = new FileReader();
            reader.onload = function (event) {
              var base64 = event.target.result;
              resolve(base64);
            };
            reader.readAsDataURL(blob);
            // resolve(result.value.data);
            resolve(
              new Blob([new Uint8Array(result.value.data)], {
                type:
                  ext === "docx"
                    ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    : "application/msword",
              })
            );
          } else if (result.status == Office.AsyncResultStatus.Failed) {
            reject(null);
          } else {
            reject(null);
          }
        });
      } else {
        reject(null);
      }
    });
  });
};

// Get Document
export const getDocument = async (dispatch, template_id) => {
  axios(`/api/add-ins/word/templates/${template_id}/download`)
    .then((res) => {
      console.log("res.data");
      console.log(res);

      Word.run(async (context) => {
        context.document.body.insertFileFromBase64(res.data, Word.InsertLocation.replace);
        await context.sync();
      });

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

// Payload JSON
export const getPayloadJSON = async (dispatch, schema_id, integration_key) => {
  axios
    .post(`/api/add-ins/word/schemas/integrations/${integration_key}/payload`, { schema_id: schema_id })
    .then((res) => {
      dispatch({
        type: GET_PAYLOAD,
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
export const getDocumentPreview = async (dispatch, filePath) => {
  var ext = filePath.split(".").pop();
  var leafname = filePath.split("\\").pop().split("/").pop();
  getFileBytes(ext).then((result) => {
    let formData = new FormData();
    formData.append("file", result, leafname);
    formData.append("data[insured]", "Vardenis Pavardenis");
    formData.append("data[occupation]", "Occupation123");
    formData.append("data[policy][number]", "Policy number 123456");
    formData.append("data[inceptionDate]", new Date().toLocaleDateString());

    axios
      .post(`/api/add-ins/word/preview`, formData)
      .then((res) => {
        var blob = new Blob([res.data], { type: "application/pdf" });
        var win = window.open("", "_blank");
        var URL = window.URL || window.webkitURL;
        var dataUrl = URL.createObjectURL(blob);

        dispatch({
          type: DOCUMENT_PREVIEW,
          payload: dataUrl,
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
  });
};

export const clearError = async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

const InslyState = (props) => {
  const initialState: any = {
    vehicles: null,
    filtered: [],
    schemas: [],
    templates: [],
    instances: null,
    schema: { label: "", value: "" },
    error: null,
    isLoading: false,
    step: 1,
  };

  const [state, dispatch] = useReducer(InslyReducer, initialState);

  return <InslyContext.Provider value={{ state: state, dispatch }}>{props.children}</InslyContext.Provider>;
};

export default InslyState;

//   const { instances, settings, schemas, fields, templats, documents } = state;
//   const providerValue: any = {
//     instances,
//     settings,
//     schemas,
//     fields,
//     templats,
//     documents,
//     setInstance,
//     getInstances,
//     getSettings,
//     getSchemas,
//     getFields,
//     getTemplates,
//     submitDocument,
//     getDocument,
//     clearError,
//   };

//   return <InslyContext.Provider value={providerValue}>{children}</InslyContext.Provider>;
// }
