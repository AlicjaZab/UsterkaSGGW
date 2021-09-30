import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { loadFonts } from "./app/config/styles";
import { AppLoading } from "expo";

import { NavigationContainer } from "@react-navigation/native";

import MainNavigator from "./app/navigation/MainNavigator";

export default function App() {
  const isLoaded = loadFonts();
  if (isLoaded) {
    console.log(isLoaded);
    return (
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    );
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
