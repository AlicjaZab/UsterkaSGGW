import client from "./client";

const endpoint = "/media_objects";

const headers = {
  "Content-Type": "multipart/form-data",
};

const getMediaObjectsList = () => client.get(endpoint);

const postMediaObject = (object) => client.post(endpoint, object, { headers });

const getMediaObject = (id) => client.get(endpoint + "/" + id);

const deleteMediaObject = (id) => client.delete(endpoint + "/" + id);

export default {
  getMediaObjectsList,
  postMediaObject,
  getMediaObject,
  deleteMediaObject,
};
