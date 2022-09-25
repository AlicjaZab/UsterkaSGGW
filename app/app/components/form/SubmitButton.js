import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../AppButton";

import colors from "../../config/colors";

function SubmitButton({ label, color = colors.primary, style }) {
  const { handleSubmit } = useFormikContext();
  return (
    <AppButton
      label={label}
      onPress={handleSubmit}
      style={style}
      color={color}
    />
  );
}

export default SubmitButton;
