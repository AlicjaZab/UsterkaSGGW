import React from "react";
import { View } from "react-native";

import AppText from "./AppText";

import styles from "../config/styles";

function AppDetailsItem({ title, children }) {
  return (
    <View
      style={{
        marginVertical: 5,
        padding: 5,
        paddingLeft: 10,
        backgroundColor: "white",
        borderRadius: 20,
      }}
    >
      <AppText style={styles.headerText2}>{title}:</AppText>
      {children}
    </View>
  );
}

export default AppDetailsItem;
