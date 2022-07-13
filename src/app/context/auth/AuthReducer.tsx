import {
  INITIALIZED,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GET_SETTINGS,
  CLEAR_ERRORS,
} from "../types";
import useAlert from "../../hooks/useAlert";

export const AuthReducer = (state: any, action: any) => {
  const { setAlert } = useAlert();

  switch (action.type) {
    case INITIALIZED:
      return {
        ...state,
        initialized: action.payload,
        loading: false,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
      console.log(action.payload);

      setAlert(action.payload, "danger");
      return {
        ...state,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case GET_SETTINGS:
      return {
        ...state,
        config: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      throw new Error(`Unsupported type of: ${action.type}`);
  }
};

export default AuthReducer;
