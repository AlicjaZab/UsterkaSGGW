import React from "react";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";

function AppFormTextInput({
  name,
  width = "100%",
  placeholder = "",
  ...otherProps
}) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();
  return (
    <AppTextInput
      onBlured={() => setFieldTouched(name)}
      onChangeText={handleChange(name)}
      width={width}
      placeholder={placeholder}
      {...otherProps}
    />
  );
}

export default AppFormTextInput;
