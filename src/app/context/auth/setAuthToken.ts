import axios from "axios";

const setAuthToken = (value: string) => {
  if (value) {
    axios.defaults.headers.common["x-auth-token"] = value;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
