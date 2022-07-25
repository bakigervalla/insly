import axios from "axios";

const setAuthToken = (token: string, baseUrl: string) => {
  if (token) {
    // axios.defaults.headers.common["x-auth-token"] = value;
    axios.defaults.headers.common = { Authorization: `bearer ${token}` };
    axios.defaults.baseURL = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  } else {
    delete axios.defaults.headers.common["Authorization"];
    // delete axios.defaults.headers.common["x-auth-token"];
  }
  console.log(token);
};

export default setAuthToken;
