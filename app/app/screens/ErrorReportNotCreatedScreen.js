import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import AppText from "../components/AppText";

import colors from "../config/colors";

function ErrorReportNotCreatedScreen({ route }) {
  const { data } = route.params;

  return (
    <Screen style={{ marginVertical: 20 }}>
      <View style={styles.container}>
        <AppText style={{ textAlign: "center" }}>
          Niestety, wysyłanie zgłoszenia nie powiodło się.
        </AppText>
        <MaterialCommunityIcons
          name="emoticon-sad"
          color={colors.primary}
          size={50}
          style={{ padding: 20 }}
        />
        <AppText style={{ textAlign: "center", color: colors.primary }}>
          Problem: {data.problem}
        </AppText>
        <AppText style={{ color: colors.primary }}>
          Status: {data.status || "None"}
        </AppText>
        <AppText style={{ textAlign: "center", marginTop: 20 }}>
          Skontaktuj się z administratorem lub spróbuj ponownie później.
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export default ErrorReportNotCreatedScreen;
