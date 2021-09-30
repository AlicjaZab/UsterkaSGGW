import React, { StyleSheet } from "react";
import AppText from "./AppText";
import styles from "../config/styles";
import { View } from "react-native";

function AppDetailsItem({ title, children }) {
  return (
    <View style={{ paddingVertical: 10 }}>
      <AppText style={styles.headerText2}>{title}:</AppText>
      <AppText>{children}</AppText>
    </View>
  );
}

export default AppDetailsItem;
