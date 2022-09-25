import React, { useEffect } from "react";
import { useFormikContext } from "formik";
import { View, StyleSheet } from "react-native";
import isNil from "lodash/isNil";

import AppText from "../AppText";
import AppImageInputList from "../AppImageInputList";

import colors from "../../config/colors";
import getCategory from "../../utils/getCategory";
import createFormData from "../../utils/createFormData";
import tagsClient from "../../api/tags";

var tagsProvider = "None";

function AppFormImagePicker({ name, name2, ...otherProps }) {
  const { setFieldValue, values } = useFormikContext();
  const photos = values[name];
  const tags = values[name2];

  useEffect(() => {
    if (photos.length == 0) {
      setFieldValue(name2, []);
    }
  }, []);

  /**
   * Maps image passed by user to mediaObjectImage and saves it is photos[],
   * Retrieves tags for the image, and calls method updating list of all tags,
   * And from the tags retrieves proper category
   *
   */
  const handleAdd = async (image) => {
    const mediaObjectImage = createFormData(image);
    setFieldValue(name, [...photos, mediaObjectImage]);
    var tagsResponse = await tagsClient.getTags(mediaObjectImage);
    console.log(tagsResponse);

    tagsProvider = tagsResponse.data.taggsProvider;
    if (tagsProvider == "None") return;
    if (tagsProvider != "Azure" && tagsProvider != "Google") {
      console.log("Unsupported tags provider specified.");
      return;
    }
    var newTags = [];
    if (tagsProvider == "Google") {
      newTags = tagsResponse.data.response.responses[0].labelAnnotations;
      newTags.forEach((element) => {
        element.name = element.description;
        element.confidence = element.score;
        delete element.description;
        delete element.score;
      });
    } else if (tagsProvider == "Azure") {
      newTags = tagsResponse.data.response.tags;
    }
    newTags.forEach(
      (object) => (object.imageUri = mediaObjectImage._parts[0][1].uri)
    );
    addTags(newTags);
    updateCategory(tags);
  };

  const updateCategory = (updatedTags) => {
    var category = getCategory(updatedTags, tagsProvider);
    setFieldValue("category", category);
  };

  /**
   * Removes image and calls tags removing method
   *
   */
  const handleRemove = async (imageToDelete) => {
    let updatedTags = removeTags(imageToDelete._parts[0][1].uri);
    setFieldValue(
      name,
      photos.filter((image) => image != imageToDelete)
    );
    updateCategory(updatedTags);
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
    let filteredTags = tags.filter(
      (tagObject) => tagObject.connectedPhotos.length != 0
    );
    setFieldValue(name2, filteredTags);
    return filteredTags;
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
          topicality: newTagObject.topicality,
        });
        delete newTagObject.imageUri;
        tags.push(newTagObject);
      } else {
        oldTagObject.connectedPhotos.push({
          imageUri: newTagObject.imageUri,
          confidence: newTagObject.confidence,
          topicality: newTagObject.topicality,
        });
        oldTagObject.confidence = Math.max.apply(
          null,
          oldTagObject.connectedPhotos.map(
            (connectedPhotoObject) => connectedPhotoObject.confidence
          )
        );
        if (!isNil(newTagObject.topicality)) {
          oldTagObject.topicality = Math.max.apply(
            null,
            oldTagObject.connectedPhotos.map(
              (connectedPhotoObject) => connectedPhotoObject.topicality
            )
          );
        }
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
