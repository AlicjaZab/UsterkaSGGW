import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles.js";
import AppText from "./AppText.js";
import Screen from "./Screen.js";
import PickerItem from "./PickerItem.js";
import colors from "../config/colors.js";
import IconButton from "./IconButton.js";
import ListItemSeparator from "./ListItemSeparator.js";

function AppPicker({
  placeholder,
  items,
  onSelectItem,
  selectedItem,
  width = "100%",
}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[defaultStyles.inputField, { width }]}>
          {selectedItem ? (
            <AppText style={[defaultStyles.text, { flex: 1 }]}>
              {selectedItem.label}
            </AppText>
          ) : (
            <AppText style={[defaultStyles.text, { flex: 1 }]}></AppText>
          )}
          <MaterialCommunityIcons
            name="chevron-down"
            size={25}
            color={colors.dark}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <IconButton
              style={styles.closeButton}
              name="close"
              backgroundColor={colors.secondary}
              size={30}
              onPress={() => setModalVisible(false)}
            />
            <FlatList
              data={Object.values(items)}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <PickerItem
                  item={item}
                  onPress={() => {
                    setModalVisible(false);
                    onSelectItem(item);
                  }}
                />
              )}
              ItemSeparatorComponent={ListItemSeparator}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 150,
    flex: 1,
  },
  modal: {
    backgroundColor: colors.background,
    padding: 20,
    margin: 20,
    borderRadius: 25,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
});

export default AppPicker;
