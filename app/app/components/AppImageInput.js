import React from "react";
import colors from "../config/colors";
import styles from "../config/styles";
import IconButton from "./IconButton";
import * as ImagePicker from "expo-image-picker";

function AppImageInput({ onPress }) {
  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) onPress(result.uri);
    } catch (error) {
      console.log("Błąd podczas ładowania zdjęcia", error);
    }
  };

  return (
    <IconButton
      style={{ margin: 15 }}
      name="image-plus"
      backgroundColor={colors.secondary}
      onPress={selectImage}
    ></IconButton>
  );
}

export default AppImageInput;
