import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { View, StyleSheet } from "react-native";
import AppText from "../AppText";
import AppImageInputList from "../AppImageInputList";
import createFormData from "../../utils/createFormData";
import imageProcessingApi from "../../api/imageProcessing";
import _ from "lodash";
import colors from "../../config/colors";
import getCategory from "../../utils/getCategory";

function AppFormImagePicker({ name, name2, ...otherProps }) {
  const { setFieldValue, values } = useFormikContext();
  const photos = values[name];
  const tags = values[name2];

  /**
   * Maps image passed by user to mediaObjectImage and saves it is photos[],
   * Retrieves tags for the image, and calls method updating list of all tags,
   * And from the tags retrieves proper category
   *
   */
  const handleAdd = async (image) => {
    const mediaObjectImage = createFormData(image);
    setFieldValue(name, [...photos, mediaObjectImage]);
    console.log("Attempting to get tags for an image ...");
    const response = await imageProcessingApi.getTagsForImage(mediaObjectImage);
    if (response.status === 200) {
      response.data.tags.forEach(
        (object) => (object.imageUri = mediaObjectImage._parts[0][1].uri)
      );
      addTags(response.data.tags);
    } else {
      console.log("Something went wrong..." + response);
    }
    var category = getCategory(tags);
    setFieldValue("category", category);
  };

  /**
   * Removes image and calls tags removing method
   *
   */
  const handleRemove = async (imageToDelete) => {
    removeTags(imageToDelete._parts[0][1].uri);
    setFieldValue(
      name,
      photos.filter((image) => image != imageToDelete)
    );
  };

  /**
   * Removes all tags which were connedcted only to given image,
   * For other tags removes connection to removed image
   *
   */
  const removeTags = (imageUri) => {
    tags.forEach((tagObject) => {
      tagObject.connectedPhotos = tagObject.connectedPhotos.filter(
        (connectedPhotoObject) => connectedPhotoObject.imageUri != imageUri
      );
    });
    setFieldValue(
      name2,
      tags.filter((tagObject) => tagObject.connectedPhotos.length != 0)
    );
  };

  /**
   * Adds to tags[] all retrieved tags with names that were not already there,
   * and saves connection to the image
   * for other tags that are repetitive creates connections to image
   *
   */
  const addTags = (retrievedTags) => {
    retrievedTags.forEach((newTagObject) => {
      var oldTagObject = tags.find(
        (oldTagObject) => oldTagObject.name == newTagObject.name
      );
      if (oldTagObject === undefined) {
        newTagObject.connectedPhotos = [];
        newTagObject.connectedPhotos.push({
          imageUri: newTagObject.imageUri,
          confidence: newTagObject.confidence,
        });
        delete newTagObject.imageUri;
        tags.push(newTagObject);
      } else {
        oldTagObject.connectedPhotos.push({
          imageUri: newTagObject.imageUri,
          confidence: newTagObject.confidence,
        });
        oldTagObject.confidence = Math.max.apply(
          null,
          oldTagObject.connectedPhotos.map(
            (connectedPhotoObject) => connectedPhotoObject.confidence
          )
        );
      }
    });
    setFieldValue(name2, tags);
  };

  return (
    <View>
      <AppImageInputList
        images={photos}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      {tags.length !== 0 && (
        <AppText style={styles.tags}>
          Wykryte tagi: {tags.map((object) => object.name + "; ")}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tags: {
    fontSize: 13,
    color: colors.dark,
  },
});

export default AppFormImagePicker;
