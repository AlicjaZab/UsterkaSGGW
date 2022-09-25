import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync } from "expo-image-manipulator";
import { Alert } from "react-native";

import IconButton from "./IconButton";

import {
  MAX_IMAGE_COUNT,
  MAX_IMAGE_WIDTH_OR_HEIGHT,
} from "../config/constants";
import colors from "../config/colors";

function AppImageInput({ onPress, isMaxReached }) {
  const [imageSource, setImageSource] = useState("");
  /**
   * if maximum image count is not reached then loads photo from users phone,
   * if photo is to big then resizes it (it is needed so that it can be sent to Azure Computer Vision API)
   * on success calls onPress method
   */
  const selectImage = () => {
    if (isMaxReached()) {
      Alert.alert(
        "Osiągnięto limit zdjęć",
        "Do jednego zgłoszenia można załączyć maksymalnie " +
          MAX_IMAGE_COUNT +
          " zdjęć. Aby dodać kolejne, usuń jedno z dodanych zdjęć."
      );
      return;
    }
    selectImageFromChosenInput();
  };

  const selectImageFromChosenInput = () => {
    Alert.alert("Dodaj zdjęcie", "Co chcesz zrobić?", [
      {
        text: "Zrobić zdjęcie",
        onPress: () => {
          getImageFromCamera();
        },
      }, //here was null -> why ??
      {
        text: "Wybrać zdjęcie z galerii",
        onPress: () => {
          getImageFromLibrary();
        },
      },
      {
        text: "Anuluj",
      },
    ]);
  };

  const getImageFromCamera = async () => {
    let statusCamera = await ImagePicker.requestCameraPermissionsAsync();
    console.log(statusCamera);
    if (!statusCamera.granted) {
      alert(
        "Nie można pobrać zdjęcia ponieważ nie udzielono dostępu do kamery."
      );
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });
    processSelectedImage(image);
  };

  const getImageFromLibrary = async () => {
    let statusLibrary = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log(statusLibrary);
    if (!statusLibrary.granted) {
      alert(
        "Nie można pobrać zdjęcia ponieważ nie udzielono dostępu do biblioteki."
      );
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });
    processSelectedImage(image);
  };

  const processSelectedImage = async (image) => {
    try {
      if (!image.cancelled) {
        var resizedImage;
        if (
          image.height >= image.width &&
          image.height > MAX_IMAGE_WIDTH_OR_HEIGHT
        ) {
          resizedImage = await manipulateAsync(
            image.uri,
            [{ resize: { height: 500 } }],
            { compress: 0.7 }
          );
        } else if (
          image.height < image.width &&
          image.width > MAX_IMAGE_WIDTH_OR_HEIGHT
        ) {
          resizedImage = await manipulateAsync(
            image.uri,
            [{ resize: { width: 500 } }],
            { compress: 0.7 }
          );
        } else {
          resizedImage = image;
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
