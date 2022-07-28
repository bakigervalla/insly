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

export const InslyReducer = (state: any, action: any) => {
  switch (action.type) {
    case INITIALIZED:
      return {
        ...state,
        initialized: action.payload,
        loading: false,
      };
    case SET_INSTANCE:
      return {
        ...state,
        instances: action.payload,
        loading: false,
      };
    case GET_INSTANCES:
      return {
        ...state,
        instances: action.payload,
        loading: false,
      };
    case GET_SETTINGS:
      return {
        ...state,
        settings: action.payload,
        loading: false,
      };

    case GET_SCHEMAS:
      return {
        ...state,
        schemas: action.payload,
        loading: false,
      };
    case GET_FIELDS:
      return {
        ...state,
        fields: action.payload,
        loading: false,
      };
    case SET_SELECTED_SCHEMA:
      return {
        ...state,
        schema: action.payload,
        loading: false,
      };
    case GET_TEMPLATES:
      return {
        ...state,
        templates: action.payload,
        loading: false,
      };
    case SUBMIT_DOCUMENT:
      return {
        ...state,
        documents: action.payload,
        loading: false,
      };
    case GET_DOCUMENT:
      return {
        ...state,
        documents: action.payload,
        loading: false,
      };
    case GET_PAYLOAD:
      return {
        ...state,
        payloadJson: action.payload,
        loading: false,
      };
    case DOCUMENT_PREVIEW:
      return {
        ...state,
        documentPreview: action.payload,
        loading: false,
      };
    case ERROR:
      return {
        ...state,
        error: JSON.stringify(action.payload.message), //action.payload,
        loading: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        loading: false,
      };
    default:
      throw new Error(`Unsupported type of: ${action.type}`);
  }
};

export default InslyReducer;
