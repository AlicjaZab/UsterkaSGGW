import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import AppText from "./AppText";

//should be PickerItem
function PickerItem({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.text} onPress={onPress}>
      <AppText>{item.label}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    alignSelf: "flex-start",
    padding: 15,
  },
});

export default PickerItem;
