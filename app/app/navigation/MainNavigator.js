import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, StyleSheet } from "react-native";

import AddReportScreen from "../screens/AddReportScreen";
import StartupScreen from "../screens/StartupScreen";
import ReportDetailsScreen from "../screens/ReportDetailsScreen";
import ReportsListScreen from "../screens/ReportsListScreen";
import colors from "../config/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

const MainNavigator = () => (
  <Stack.Navigator
    initialRouteName="ReportsListScreen"
    screenOptions={{
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor: colors.white,
      headerBackTitleVisible: false,
      headerTitleStyle: { fontFamily: "Ubuntu-Medium", fontSize: 23 },
      headerLeft: () => (
        <Image
          style={styles.logo}
          source={require("../assets/logo-small-white.png")}
        ></Image>
      ),
      // headerRight: <ReactElement>    // this may be useful (Function which returns a React Element to display on the right side of the header.)
    }}
  >
    <Stack.Screen
      name="StartupScreen"
      component={StartupScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="AddReportScreen"
      component={AddReportScreen}
      options={{ title: "Formularz zgłoszenia" }}
    />
    <Stack.Screen
      name="ReportDetailsScreen"
      component={ReportDetailsScreen}
      options={({ route }) => ({
        title: "Zgłoszenie nr " + route.params.data.id,
      })}
    />
    <Stack.Screen
      name="ReportsListScreen"
      component={ReportsListScreen}
      options={{ title: "Lista zgłoszeń" }}
    />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  logo: {
    marginLeft: 20,
    width: 30,
    height: 30,
  },
});

export default MainNavigator;
