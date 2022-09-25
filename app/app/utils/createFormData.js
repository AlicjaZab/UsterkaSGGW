const createFormData = (object) => {
  const data = new FormData();

  data.append("file", {
    name: "noname.jpg",
    type: "multipart/form-data",
    uri:
      Platform.OS === "android"
        ? object.uri
        : object.uri.replace("file://", ""),
  });

  return data;
};

export default createFormData;
