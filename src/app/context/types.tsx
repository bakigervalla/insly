export const INITIALIZED = Symbol("Loading");
export const SET_INSTANCE = Symbol("Set instances");
export const GET_INSTANCES = "GET_INSTANCES";
export const GET_SETTINGS = "GET_SETTINGS";
export const GET_SCHEMAS = "GET_SCHEMAS";
export const GET_FIELDS = "GET_FIELDS";
export const SET_SELECTED_SCHEMA = "SET_SELECTED_SCHEMA";
export const GET_TEMPLATES = "GET_TEMPLATES";
export const SUBMIT_DOCUMENT = "SUBMIT_DOCUMENT";
export const GET_DOCUMENT = "GET_DOCUMENT";
export const GET_PAYLOAD = "GET_PAYLOAD";
export const DOCUMENT_PREVIEW = "DOCUMENT_PREVIEW";

export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";

export const SET_ALERT = "SET_ALERT";
export const REMOVE_ALERT = "REMOVE_ALERT";

export const ERROR = "ERROR";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export interface IInsly {
  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
