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

const InslyReducer = (state, action) => {
  switch (action.type) {
    case SET_INSTANCE:
      return {
        ...state,
        instances: action.payload,
      };
    case GET_INSTANCES:
      return {
        ...state,
        instances: action.payload,
      };
    case GET_SETTINGS:
      return {
        ...state,
        instances: action.payload,
      };

    case GET_SCHEMAS:
      return {
        ...state,
        schemas: action.payload,
      };
    case GET_FIELDS:
      return {
        ...state,
        fields: action.payload,
      };
    case GET_TEMPLATES:
      return {
        ...state,
        templates: action.payload,
      };
    case SUBMIT_DOCUMENT:
      return {
        ...state,
        document: action.payload,
      };
    case GET_DOCUMENT:
      return {
        ...state,
        document: action.payload,
      };
    case ERROR:
      return {
        ...state,
        error: JSON.stringify(action.payload.message), //action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      throw new Error(`Unsupported type of: ${action.type}`);
  }
};

export default InslyReducer;
