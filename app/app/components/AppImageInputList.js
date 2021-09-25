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
          {imageUris.map((uri) => (
            <View key={uri} style={styles.image}>
              <AppImageDeletableMinature
                imageUri={uri}
                onRemove={() => onRemoveImage(uri)}
              />
            </View>
          ))}
          <AppImageInput onPress={(uri) => onAddImage(uri)} />
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
