import { computerVisionClient } from "./client";
import { endpointTagsEn, key } from "../config/constants";

const headers = {
  "Content-Type": "multipart/form-data",
  "Ocp-Apim-Subscription-Key": key,
};

const getTagsForImage = async (image) => {
  const response = await postRequest(image);
  if (response.status === 200) {
    var tags = response.data.tags;
    // logging for analitical purposes
    console.log("_______RESPONSE_______");
    console.log("Duration: ");
    console.log(response.duration);
    console.log("Tags received: ");
    console.log(
      tags.map((object) => object.name + " (" + object.confidence + ");")
    );
    console.log("______________________");
    return tags;
  } else {
    console.log("Something went wrong... Here is the response from server: ");
    console.log(response);
  }
};

const postRequest = (image) =>
  computerVisionClient.post(endpointTagsEn, image, { headers });

export default {
  getTagsForImage,
};
