import axios from "axios";
// import { useInstly, getInstance } from "../context/store/InslyState";

const client = axios.create({
  baseURL: process.env.API_URL,
});

client.interceptors.request.use(
  function (config) {
    // const [inslyState] = useInstly();
    // const { instanceUrl } = inslyState;

    // config.url = join(instanceUrl, config.url);
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

export default client;
