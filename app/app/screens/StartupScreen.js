import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import defaultStyles from "../config/styles";

function StartupScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={[defaultStyles.headerText1, styles.appName]}>Usterka</Text>
        <Text
          style={[defaultStyles.headerText1, styles.appName, { fontSize: 36 }]}
        >
          SGGW
        </Text>
        <Image
          style={styles.logo}
          source={require("../assets/logo.png")}
        ></Image>
        <Text style={[defaultStyles.regularText, styles.descriptionText]}>
          Zgłoś nieprawidłowość na kampusie uczelni SGGW
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <AppButton label="Nowe zgłoszenie"></AppButton>
        <AppButton label="Lista zgłoszeń"></AppButton>
        <AppButton label="Ustawienia"></AppButton>
        <AppButton
          label="Zaloguj"
          comment="(Dostępne tylko dla personelu SGGW)"
        ></AppButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  appName: {
    textAlign: "center",
  },
  buttonsContainer: {
    width: "80%",
    padding: 10,
    marginBottom: 50,
    flex: 0.4,
    justifyContent: "space-between",
  },
  descriptionText: {
    textAlign: "center",
    width: 200,
    marginTop: 20,
  },
  logo: {
    marginVertical: 10,
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    alignItems: "center",
    top: 100,
  },
});

export default StartupScreen;
