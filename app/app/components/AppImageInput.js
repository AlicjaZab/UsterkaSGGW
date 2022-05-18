import React from "react";
import colors from "../config/colors";
import IconButton from "./IconButton";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync } from "expo-image-manipulator";
import { Alert } from "react-native";
import {
  MAX_IMAGE_COUNT,
  MAX_IMAGE_WIDTH_OR_HEIGHT,
} from "../config/constants";

function AppImageInput({ onPress, isMaxReached }) {
  /**
   * if maximum image count is not reached then loads photo from users phone,
   * if photo is to big then resizes it (it is needed so that it can be sent to Azure Computer Vision API)
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
      // TODO or get it from camera, ask user
      const imageFromLibrary = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!imageFromLibrary.cancelled) {
        var resizedImage;
        if (
          imageFromLibrary.height >= imageFromLibrary.width &&
          imageFromLibrary.height > MAX_IMAGE_WIDTH_OR_HEIGHT
        ) {
          resizedImage = await manipulateAsync(
            imageFromLibrary.uri,
            [{ resize: { height: 500 } }],
            { compress: 0.7 }
          );
        } else if (
          imageFromLibrary.height < imageFromLibrary.width &&
          imageFromLibrary.width > MAX_IMAGE_WIDTH_OR_HEIGHT
        ) {
          resizedImage = await manipulateAsync(
            imageFromLibrary.uri,
            [{ resize: { width: 500 } }],
            { compress: 0.7 }
          );
        } else {
          resizedImage = imageFromLibrary;
        }
        onPress(resizedImage);
      }
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
