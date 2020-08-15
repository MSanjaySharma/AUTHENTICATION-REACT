import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:7383/apiv1",
  withCredentials: true,
});

export default axios;
