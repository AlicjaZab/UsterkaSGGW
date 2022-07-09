import { create } from "apisauce";
import {
  serverUrl,
  cognitiveServicesBaseUrl,
  googleApiUrl,
  googleApiKey,
} from "../config/constants";

const baseURL = serverUrl + "/api";

const apiClient = create({
  baseURL: baseURL,
});

export default apiClient;

//client for Microsoft Azure Cognitive Services - Computer Vision API
export const computerVisionClient = create({
  baseURL: cognitiveServicesBaseUrl,
});

//client for Google Cloud Vision API
export const googleVisionClient = create({
  baseURL: googleApiUrl + googleApiKey,
});
