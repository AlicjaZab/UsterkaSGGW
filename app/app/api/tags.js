import client from "./client";

const endpoint = "/tagsForImage";

const headers = {
  "Content-Type": "multipart/form-data",
};

const getTags = (object) => client.post(endpoint, object, { headers });

export default {
  getTags,
};
