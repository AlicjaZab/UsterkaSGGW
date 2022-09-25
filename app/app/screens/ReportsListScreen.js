import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";

import ReportListItem from "../components/ReportListItem";
import AppButton from "../components/AppButton";
import IconButton from "../components/IconButton";

import reportsApi from "../api/reports";
import colors from "../config/colors";

function ReportsListScreen({ navigation }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadReports();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          onPress={loadReports}
          name="refresh"
          backgroundColor={"transparent"}
          size={55}
        />
      ),
    });
  }, [navigation]);

  const loadReports = async () => {
    setLoading(true);
    const response = await reportsApi.getReportsList();
    setLoading(false);
    setReports(response.data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppButton
        style={styles.button}
        label="Nowe zgłoszenie"
        onPress={() => navigation.navigate("AddReportScreen")}
        icon="plus"
      ></AppButton>
      {loading == true && (
        <View style={{ paddingBottom: 20 }}>
          <ActivityIndicator
            animating={true}
            size="large"
            color={colors.secondary}
          ></ActivityIndicator>
        </View>
      )}
      <FlatList
        data={reports}
        keyExtractor={(report) => report.id.toString()}
        renderItem={({ item }) => (
          <ReportListItem navigation={navigation} reportData={item} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: colors.background,
    flex: 1,
    marginHorizontal: 10,
  },
  button: {
    marginBottom: 20,
  },
});

export default ReportsListScreen;
