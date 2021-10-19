import { create } from "apisauce";
import { serverUrl } from "../config/constants";

const baseURL = serverUrl + "/api";

const apiClient = create({
  baseURL: baseURL,
});

export default apiClient;
