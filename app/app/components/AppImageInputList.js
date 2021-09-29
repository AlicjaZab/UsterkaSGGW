import React, { useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import AppImageDeletableMinature from "./AppImageDeletableMinature";
import AppImageInput from "./AppImageInput";

function AppImageInputList({ imageUris = [], onRemoveImage, onAddImage }) {
  const scrollView = useRef();

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {imageUris.map((image) => (
            <View key={image.uri} style={styles.image}>
              <AppImageDeletableMinature
                imageUri={image.uri}
                onRemove={() => onRemoveImage(image.uri)}
              />
            </View>
          ))}
          <AppImageInput onPress={(image) => onAddImage(image)} />
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
