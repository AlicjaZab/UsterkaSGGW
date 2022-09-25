import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import AppText from "./AppText";

import colors from "../config/colors";

function AppSmallButton({ label, color = colors.secondary, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <AppText style={styles.label}>{label}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.secondary,
    padding: 10,
    alignSelf: "flex-start",
    alignItems: "center",
    borderRadius: 15,
    marginVertical: 5,
  },
  label: {
    fontSize: 15,
    color: colors.white,
  },
  comment: {
    color: colors.white,
    fontSize: 15,
  },
});

export default AppSmallButton;
