import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import reportsApi from "../api/reports";
import ReportListItem from "../components/ReportListItem";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import Screen from "../components/Screen";
import { Button } from "react-native";
import IconButton from "../components/IconButton";
import AppText from "../components/AppText";
import defaultStyles from "../config/styles";
import ListItemSeparator from "../components/ListItemSeparator";

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
