import React from "react";
import AppImageInput from "../AppImageInput";
import { useFormikContext } from "formik";
import { View } from "react-native";
import AppText from "../AppText";
import ErrorMessage from "./ErrorMessage";
import defaultStyles from "../../config/styles";
import AppImageInputList from "../AppImageInputList";

function AppFormImagePicker({ name, ...otherProps }) {
  const { setFieldValue, values } = useFormikContext();
  const imageUris = values[name];

  const handleAdd = (uri) => {
    setFieldValue(name, [...imageUris, uri]);
    console.log(imageUris);
  };

  const handleRemove = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri !== uri)
    );
  };

  return (
    <AppImageInputList
      imageUris={imageUris}
      onAddImage={handleAdd}
      onRemoveImage={handleRemove}
    />
  );
}

export default AppFormImagePicker;
