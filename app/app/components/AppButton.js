import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./AppText";

import colors from "../config/colors";

function AppButton({
  label,
  comment,
  color = colors.secondary,
  onPress,
  style,
  icon,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, style, { backgroundColor: color }]}
      onPress={onPress}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          color={colors.white}
          size={25}
          style={{ marginRight: 10 }}
        />
      )}
      <AppText style={styles.label}>{label}</AppText>
      {comment && <AppText style={styles.comment}>{comment}</AppText>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.secondary,
    width: "100%",
    padding: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    marginVertical: 5,
    flexDirection: "row",
  },
  label: {
    color: colors.white,
  },
  comment: {
    color: colors.white,
    fontSize: 15,
  },
});

export default AppButton;
