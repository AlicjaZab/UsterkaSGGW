import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";

import IconButton from "./IconButton";

import colors from "../config/colors";

function AppImageGallery({ imageUrls, style }) {
  const scrollView = useRef();

  const [modalVisible, setModalVisible] = useState(false);
  const [pickedImageUrl, setPickedImageUrl] = useState();

  return (
    <View>
      <ScrollView ref={scrollView} horizontal>
        <View style={[styles.container, style]}>
          {imageUrls.map((url) => (
            <TouchableWithoutFeedback
              onPress={() => {
                setModalVisible(true);
                setPickedImageUrl(url);
              }}
              key={url}
            >
              <Image
                progressiveRenderingEnabled={true}
                key={url}
                style={styles.image}
                source={{
                  uri: url,
                }}
                onLoad={() => console.log("loaded")} //TODO
                onError={(error) => console.log("MyError: " + error)}
              />
            </TouchableWithoutFeedback>
          ))}
        </View>
      </ScrollView>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <IconButton
              style={styles.closeButton}
              name="close"
              backgroundColor={colors.secondary}
              size={30}
              onPress={() => {
                setModalVisible(false), setPickedImageUrl(null);
              }}
            />
            <Image
              key={pickedImageUrl}
              style={styles.bigImage}
              source={{
                uri: pickedImageUrl,
              }}
              onLoad={() => console.log("loaded")} //TODO
              onError={(error) => console.log("MyError: " + error)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  bigImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  image: {
    marginRight: 10,
    width: 150,
    height: 150,
    backgroundColor: "white",
    borderRadius: 20,
  },
  modalContainer: {
    backgroundColor: 150,
    flex: 1,
  },
  modal: {
    backgroundColor: colors.background,
    padding: 20,
    margin: 20,
    borderRadius: 25,
    //justifyContent: "center",
    flex: 1,
    // marginBottom: 50,
  },
  closeButton: {
    alignSelf: "flex-end",
    top: 10,
    right: 10,
  },
});

export default AppImageGallery;
