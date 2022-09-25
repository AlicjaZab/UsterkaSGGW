import React, { useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import AppImageDeletableMinature from "./AppImageDeletableMinature";
import AppImageInput from "./AppImageInput";

import { MAX_IMAGE_COUNT } from "../config/constants";

function AppImageInputList({ images = [], onRemoveImage, onAddImage }) {
  const scrollView = useRef();

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {images.map((image) => (
            <View key={image._parts[0][1].uri} style={styles.image}>
              <AppImageDeletableMinature
                imageUri={image._parts[0][1].uri}
                onRemove={() => onRemoveImage(image)}
              />
            </View>
          ))}
          <AppImageInput
            onPress={(image) => onAddImage(image)}
            isMaxReached={() => images.length == MAX_IMAGE_COUNT}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    marginRight: 10,
  },
});

export default AppImageInputList;
