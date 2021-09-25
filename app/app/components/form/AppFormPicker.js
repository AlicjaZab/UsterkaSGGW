import React from "react";
import { useFormikContext } from "formik";
import { View } from "react-native";

import AppPicker from "../AppPicker";
import AppText from "../AppText";
import ErrorMessage from "./ErrorMessage";
import defaultStyles from "../../config/styles";

function AppFormPicker({ items, name, placeholder, width }) {
  const { setFieldValue, values } = useFormikContext();
  return (
    <AppPicker
      items={items}
      onSelectItem={(item) => setFieldValue(name, item)}
      placeholder={placeholder}
      selectedItem={values[name]}
      width={width}
    />
  );
}

export default AppFormPicker;
