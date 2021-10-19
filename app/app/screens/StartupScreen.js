import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import defaultStyles from "../config/styles";

function StartupScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={[defaultStyles.headerText1, styles.appName]}>Usterka</Text>
        <Text
          style={[defaultStyles.headerText1, styles.appName, { fontSize: 36 }]}
        >
          SGGW
        </Text>
        <View style={styles.logoBackground}>
          <Image
            style={styles.logo}
            source={require("../assets/logo.png")}
          ></Image>
        </View>
        <Text style={[defaultStyles.regularText, styles.descriptionText]}>
          Zgłoś nieprawidłowość na kampusie uczelni SGGW
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <AppButton
          label="Nowe zgłoszenie"
          onPress={() => navigation.navigate("AddReportScreen")}
        ></AppButton>
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
    marginBottom: 70,
    flex: 0.7,
    //backgroundColor: "white",
    justifyContent: "space-between",
  },
  descriptionText: {
    textAlign: "center",
    width: 200,
    // marginTop: 20,
  },
  logo: {
    // marginVertical: 10,
    width: 100,
    height: 100,
  },
  logoBackground: {
    backgroundColor: colors.white,
    padding: 20,
    paddingTop: 10,
    marginVertical: 10,
    borderRadius: 90,
  },
  logoContainer: {
    //position: "absolute",
    alignItems: "center",
    marginBottom: 20,
    //top: 100,
  },
});

export default StartupScreen;
