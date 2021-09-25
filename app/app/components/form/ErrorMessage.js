import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../AppText";
import Icon from "../Icon";

function ErrorMessage({ error, visible }) {
  if (!visible || !error) return null;
  return (
    <View style={styles.errorContainer}>
      <MaterialCommunityIcons
        style={styles.errorIcon}
        name="alert-circle"
        color={colors.danger}
        size={20}
      />
      <AppText style={styles.errorMessage}>{error}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.dangerBackground,
    borderRadius: 15,
  },
  errorMessage: {
    color: colors.danger,
  },
  errorIcon: {
    marginTop: 3,
    marginRight: 5,
  },
});

export default ErrorMessage;
