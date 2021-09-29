import React from "react";
import { Alert, View, Image, StyleSheet } from "react-native";
import colors from "../config/colors";
import IconButton from "./IconButton";

function AppImageDeletableMinature({ imageUri, onRemove }) {
  const handlePress = () => {
    if (!imageUri) selectImage();
    else
      Alert.alert("Usuń zdjęcie", "Usunąć zdjęcie?", [
        { text: "Tak", onPress: () => onRemove(imageUri) }, //here was null -> why ??
        { text: "Nie" },
      ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>
      <IconButton
        style={styles.deleteButton}
        name="trash-can"
        backgroundColor={colors.secondary}
        onPress={handlePress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 110,
  },
  imageContainer: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 15,
    height: 100,
    justifyContent: "center",
    marginVertical: 10,
    overflow: "hidden",
    width: 100,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  deleteButton: {
    position: "absolute",
    alignSelf: "flex-end",
  },
});

export default AppImageDeletableMinature;
