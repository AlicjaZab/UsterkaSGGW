import { computerVisionClient } from "./client";
import { endpointTagsEn, key } from "../config/constants";

const headers = {
  "Content-Type": "multipart/form-data",
  "Ocp-Apim-Subscription-Key": key,
};

const getTagsForImage = (image) =>
  computerVisionClient.post(endpointTagsEn, image, { headers });

export default {
  getTagsForImage,
};
