import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import reportsApi from "../api/reports";
import ReportListItem from "../components/ReportListItem";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import Screen from "../components/Screen";
import { Button } from "react-native";
import IconButton from "../components/IconButton";

function ReportsListScreen({ navigation }) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    loadReports();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          onPress={loadReports}
          name="refresh"
          backgroundColor={colors.primary}
          size={55}
        />
      ),
    });
  }, [navigation]);

  const loadReports = async () => {
    const response = await reportsApi.getReportsList();
    setReports(response.data);
  };

  return (
    <Screen style={styles.container}>
      <AppButton
        style={styles.button}
        label="Nowe zgłoszenie"
        onPress={() => navigation.navigate("AddReportScreen")}
        icon="plus"
      ></AppButton>

      <FlatList
        data={reports}
        keyExtractor={(report) => report.id.toString()}
        renderItem={({ item }) => (
          <ReportListItem navigation={navigation} reportData={item} />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  button: {
    marginBottom: 20,
  },
});

export default ReportsListScreen;
