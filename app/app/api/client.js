import { create } from "apisauce";
import { serverUrl, cognitiveServicesBaseUrl } from "../config/constants";

const baseURL = serverUrl + "/api";

const apiClient = create({
  baseURL: baseURL,
});

export default apiClient;

//client for Microsoft Azure Cognitive Services - Computer Vision API
export const computerVisionClient = create({
  baseURL: cognitiveServicesBaseUrl,
});
