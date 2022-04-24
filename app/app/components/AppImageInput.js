import React from "react";
import colors from "../config/colors";
import IconButton from "./IconButton";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { MAX_IMAGE_COUNT } from "../config/constants";

function AppImageInput({ onPress, isMaxReached }) {
  /**
   * if maximum image count is not reached then loads photo from users phone,
   * on success calls onPress method
   */
  const selectImage = async () => {
    if (isMaxReached()) {
      Alert.alert(
        "Osiągnięto limit zdjęć",
        "Do jednego zgłoszenia można załączyć maksymalnie " +
          MAX_IMAGE_COUNT +
          " zdjęć. Aby dodać kolejne, usuń jedno z dodanych zdjęć."
      );
      return;
    }

    try {
      let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission not granted!");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) onPress(result);
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
