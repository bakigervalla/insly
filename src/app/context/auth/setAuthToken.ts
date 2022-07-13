import axios from "axios";

const setAuthToken = (value: string, baseUrl: string) => {
  console.log(axios.defaults.headers);
  console.log(axios.defaults.baseURL);

  if (value) {
    axios.defaults.headers.common["x-auth-token"] = value;
    axios.defaults.baseURL = baseUrl;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }

  console.log(axios.defaults.headers);
  console.log(axios.defaults.baseURL);
};

export default setAuthToken;
