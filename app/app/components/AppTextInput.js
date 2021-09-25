import React from "react";
import { StyleSheet, TextInput } from "react-native";
import defaultStyles from "../config/styles";

import colors from "../config/colors";

function AppTextInput({ width = "100%", ...otherProps }) {
  return (
    <TextInput
      style={[defaultStyles.text, defaultStyles.inputField, { width }]}
      {...otherProps}
    />
  );
}

export default AppTextInput;
