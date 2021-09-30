import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AddReportScreen from "../screens/AddReportScreen";
import StartupScreen from "../screens/StartupScreen";
import ReportDetailsScreen from "../screens/ReportDetailsScreen";
import colors from "../config/colors";

const Stack = createStackNavigator();

const MainNavigator = () => (
  <Stack.Navigator
    initialRouteName="StartupScreen"
    screenOptions={{
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor: colors.white,
      headerBackTitleVisible: false,
      headerTitleStyle: { fontFamily: "Ubuntu-Regular", fontSize: 23 },
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
  </Stack.Navigator>
);

export default MainNavigator;
