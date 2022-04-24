import { create } from "apisauce";
import { serverUrl, cognitiveServicesBaseUrl } from "../config/constants";

const baseURL = serverUrl + "/api";

const apiClient = create({
  baseURL: baseURL,
});

export default apiClient;

export const computerVisionClient = create({
  baseURL: cognitiveServicesBaseUrl,
});
