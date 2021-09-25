import React from "react";
import { useFormikContext } from "formik";
import { TextInput, View } from "react-native";

import ErrorMessage from "./ErrorMessage";
import AppText from "../AppText";
import defaultStyles from "../../config/styles";
import AppTextInput from "../AppTextInput";

function AppFormTextInput({ name, width = "100%", ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();
  return (
    <AppTextInput
      onBlured={() => setFieldTouched(name)}
      onChangeText={handleChange(name)}
      width={width}
      {...otherProps}
    />
  );
}

export default AppFormTextInput;
