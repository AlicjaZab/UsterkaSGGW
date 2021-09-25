import React from "react";
import { TouchableOpacity } from "react-native";

import Icon from "./Icon";

function IconButton({
  name,
  size,
  backgroundColor,
  iconColor,
  style,
  onPress,
}) {
  return (
    <TouchableOpacity
      styles={{ backgroundColor: "blue", flex: 1 }}
      onPress={onPress}
      style={style}
    >
      <Icon
        name={name}
        size={size}
        backgroundColor={backgroundColor}
        iconColor={iconColor}
      ></Icon>
    </TouchableOpacity>
  );
}

export default IconButton;
