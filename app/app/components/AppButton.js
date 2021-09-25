import React from "react";
import { Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "../config/colors";

import AppText from "./AppText";

function AppButton({ label, comment, color = colors.secondary, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
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
    borderRadius: 15,
    marginVertical: 5,
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
