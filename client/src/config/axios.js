import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:7331/apiv1",
});

export default axios;
