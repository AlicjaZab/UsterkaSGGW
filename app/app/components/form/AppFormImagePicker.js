import React, { useEffect, useState } from "react";
import AppImageInput from "../AppImageInput";
import { useFormikContext } from "formik";
import { View } from "react-native";
import AppText from "../AppText";
import ErrorMessage from "./ErrorMessage";
import defaultStyles from "../../config/styles";
import AppImageInputList from "../AppImageInputList";
import mediaObjectApi from "../../api/mediaObject";
import createFormData from "../../utils/createFormData";
import _ from "lodash";

function AppFormImagePicker({ name, ...otherProps }) {
  const { setFieldValue, values } = useFormikContext();
  const photos = values[name];
  //const [photos, setPhotos] = useState([]);
  const [categories, setCategories] = useState([]);

  // const handleAdd = (image) => {
  //   if (onAddImage) onAddImage(image);
  //   setFieldValue(name, [...imageUris, image.uri]);
  //   console.log(imageUris);
  // };

  // const handleRemove = (uri) => {
  //   if (onRemoveImage) onRemoveImage(image.uri);
  //   setFieldValue(
  //     name,
  //     imageUris.filter((imageUri) => imageUri !== uri)
  //   );
  // };

  //source: https://stackoverflow.com/questions/1053843/get-the-element-with-the-highest-occurrence-in-an-array
  function mode(array) {
    if (array.length == 0) return null;
    var modeMap = {};
    var maxEl = array[0],
      maxCount = 1;
    for (var i = 0; i < array.length; i++) {
      var el = array[i];
      if (modeMap[el] == null) modeMap[el] = 1;
      else modeMap[el]++;
      if (modeMap[el] > maxCount) {
        maxEl = el;
        maxCount = modeMap[el];
      }
    }
    return maxEl;
  }

  const handleAdd = async (image) => {
    const response = await mediaObjectApi.postMediaObject(
      createFormData(image)
    );
    if (response.status === 201) {
      //setPhotos([...photos, { uri: image.uri, id: response.data.id }]);
      //updateCategory(response.data.category);

      // console.log("photos: " + image);
      // console.log("category: " + category);
      setFieldValue(name, [
        ...photos,
        { id: response.data.id, uri: image.uri },
      ]);
      setCategories([...categories, response.data.category]);
    } else {
      console.log("Something went wrong...");
    }
    //console.log(response);
  };

  const handleRemove = async (uri) => {
    //TODO delete photo from database
    const id = _.find(photos, { uri: uri }).id;
    const response = await mediaObjectApi.deleteMediaObject(id);
    if (response.status === 204) {
      setFieldValue(
        name,
        photos.filter((image) => image.uri !== uri)
      );
    } else {
      console.log("Something went wrong!");
    }
  };

  useEffect(() => {
    const maxCategory = mode(categories);
    console.log(maxCategory);
    setFieldValue("category", { label: maxCategory, value: maxCategory });
  }, [categories]);

  return (
    <AppImageInputList
      imageUris={photos}
      onAddImage={handleAdd}
      onRemoveImage={handleRemove}
    />
  );
}

export default AppFormImagePicker;
