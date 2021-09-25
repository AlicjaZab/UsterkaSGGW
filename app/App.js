import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StartupScreen from "./app/screens/StartupScreen";
import { loadFonts } from "./app/config/styles";
import { AppLoading } from "expo";
import AddReportScreen from "./app/screens/AddReportScreen";

export default function App() {
  const isLoaded = loadFonts();
  if (isLoaded) {
    console.log(isLoaded);
    return <AddReportScreen />;
  } else {
    console.log(isLoaded);
    return <View />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
