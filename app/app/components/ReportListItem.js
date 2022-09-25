import React from "react";
import { StyleSheet, View } from "react-native";
import format from "date-fns/format";
import { TouchableOpacity } from "react-native-gesture-handler";

import AppText from "./AppText";
import Icon from "./Icon";

import { CATEGORY_TO_ICON } from "../config/constants";
import { getLabelByValue } from "../utils/getCategory";
import colors from "../config/colors";

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
          name={CATEGORY_TO_ICON[reportData.category.name]}
        />
        <View>
          <AppText style={styles.reportId}>Zgłoszenie {reportData.id}</AppText>
          <AppText style={styles.category}>
            {getLabelByValue(reportData.category.name)}
          </AppText>
          <AppText style={styles.date}>
            {format(new Date(reportData.createDate), "dd/LL/yyyy hh:mm")}
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
