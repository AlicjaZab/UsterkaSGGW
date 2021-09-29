import React from "react";
import { StyleSheet, TextInput } from "react-native";
import defaultStyles from "../config/styles";

import colors from "../config/colors";

function AppTextInput({ width = "100%", placeholder = "", ...otherProps }) {
  return (
    <TextInput
      multiline={true}
      style={[defaultStyles.text, defaultStyles.inputField, { width }]}
      placeholder={placeholder}
      {...otherProps}
    />
  );
}

export default AppTextInput;
