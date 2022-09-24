import { create } from "apisauce";
import { REACT_APP_API_URL, REACT_APP_API_KEY } from "@env";

const baseURL = REACT_APP_API_URL + "/api";

const apiClient = create({
  baseURL: baseURL,
  headers: {
    Authorization: REACT_APP_API_KEY,
  },
  timeout: 10000,
});

export default apiClient;
