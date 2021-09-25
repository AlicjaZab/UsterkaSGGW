import React from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";

import defaultStyles from "../config/styles";
import colors from "../config/colors";
import AppText from "./AppText";
import ListItemSeparator from "./ListItemSeparator";

function Screen({ children, style, title }) {
  return (
    <View style={[styles.container, style]}>
      {title && (
        <View style={styles.headerContainer}>
          <AppText style={defaultStyles.headerText1}>{title}</AppText>
          <ListItemSeparator color={colors.primary}></ListItemSeparator>
        </View>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    padding: 10,
    paddingTop: Constants.statusBarHeight,
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
});

export default Screen;
