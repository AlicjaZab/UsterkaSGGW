import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import Constants from "expo-constants";

import defaultStyles from "../config/styles";
import colors from "../config/colors";
import AppText from "./AppText";
import ListItemSeparator from "./ListItemSeparator";

function Screen({ children, style, title }) {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <ScrollView>
        {title && (
          <View style={styles.headerContainer}>
            <AppText style={defaultStyles.headerText1}>{title}</AppText>
            <ListItemSeparator color={colors.primary}></ListItemSeparator>
          </View>
        )}
        {children}
      </ScrollView>
    </SafeAreaView>
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
