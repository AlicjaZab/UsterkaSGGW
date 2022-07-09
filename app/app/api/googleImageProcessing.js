import { googleVisionClient } from "./client";
import { googleApiKey } from "../config/constants";
import * as FileSystem from "expo-file-system";

const getTagsForImage = async (image) => {
  let base64 = await FileSystem.readAsStringAsync(image.uri, {
    encoding: "base64",
  });

  let body = JSON.stringify({
    requests: [
      {
        image: {
          content: base64,
        },
        features: [{ type: "LABEL_DETECTION", maxResults: 20 }],
      },
    ],
  });
  const response = await postRequest(body);

  if (response.status == 200) {
    var tags = response.data.responses[0].labelAnnotations;
    // logging for analitical purposes
    console.log("_______RESPONSE_______");
    console.log("Duration: ");
    console.log(response.duration);
    console.log("Labels received: ");
    console.log(
      tags.map(
        (object) =>
          object.description +
          " (Score: " +
          object.score +
          ", Topicality: " +
          object.topicality +
          ");"
      )
    );

    tags.forEach((element) => {
      element.name = element.description;
      element.confidence = element.score;
      delete element.description;
      delete element.score;
    });

    return tags;
  } else {
    console.log("Something went wrong... Here is the response from server: ");
    console.log(response);
  }
};

const postRequest = (body) => googleVisionClient.post("", body, {});

export default {
  getTagsForImage,
};
