import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Moment from "moment";

import AppText from "./AppText";
import colors from "../config/colors";
import Icon from "./Icon";
import { CATEGORY_TO_ICON } from "../config/constants";
import { TouchableOpacity } from "react-native-gesture-handler";
//could be also image - icon representing category
const ReportListItem = ({ navigation, reportData }) => {
  const onPress = () => {
    navigation.navigate("ReportDetailsScreen", { data: reportData });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.detailsContainer}>
        <Icon
          style={styles.icon}
          name={CATEGORY_TO_ICON[reportData.category]}
        />
        <View>
          <AppText style={styles.reportId}>Zgłoszenie {reportData.id}</AppText>
          <AppText style={styles.category}>{reportData.category}</AppText>
          <AppText style={styles.date}>
            {Moment(reportData.createDate).format("DD/MM/YYYY hh:mm")}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 15,
    // overflow: "hidden",
  },
  category: {
    fontSize: 20,
  },
  detailsContainer: {
    padding: 20,
    flexDirection: "row",
  },
  date: {
    fontSize: 17,
  },
  icon: {
    marginRight: 20,
    alignSelf: "center",
  },
  reportId: {
    flexDirection: "row",
    fontSize: 15,
  },
});

export default ReportListItem;
