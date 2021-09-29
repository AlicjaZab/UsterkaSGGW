import React from "react";
import { useFormikContext } from "formik";
import colors from "../../config/colors";

import AppButton from "../AppButton";

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
