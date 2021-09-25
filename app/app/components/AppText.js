import React from "react";
import defaultStyles from "../config/styles";
import { Text } from "react-native";

function AppText({ children, style, ...otherProps }) {
  return (
    <Text style={[defaultStyles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
}

export default AppText;
