import { CATEGORIES } from "../config/constants";
import _ from "lodash";

import {
  CATEGORY_TO_TAGS,
  CATEGORY_TO_TAGS_TO_CHECK_LAST,
  CATEGORY_TO_TAGS_FULL,
} from "./categoryMappings";

// --- START of code that can be removed this after analysis ----
// this piece of code was written to check which of implemented strategies is the best for given data sets

// only one thould be uncommented, to test proper data
import { photos } from "./photosWithTagsGoogle";
//import { photos } from "./photosWithTagsAzure";

export const printCategoriesForPhotosWithTags = () => {
  let photosWithTags = [];
  for (let i = 0; i < photos.length; i++) {
    photosWithTags[i] = {};
    photosWithTags[i].title = photos[i].title;
    photosWithTags[i].tags = photos[i].tags;
  }
  photosWithTags.forEach((object) => {
    let tags = object.tags.replace('""', "");
    tags = tags.replace(/(\r\n|\n|\r)/gm, "");
    tags = tags.replace(/,/g, "");
    tags = tags.replace(/\)/g, "");
    tags = tags.replace(/Score: /g, "");
    tags = tags.replace(/Topicality: /g, "");
    tags = tags.split(";");
    let x = tags.map((tag) => {
      let elements = tag.split("(");
      let y = {};
      y.name = elements[0].trim();
      y.confidence = elements[1].split(" ")[0];
      return y;
    });
    object.tags = x;
  });
  photosWithTags.forEach((object) => {
    getCategory(object.tags);
  });
};
// --- END of code that can be removed this after analysis ----

const getCategory = (tags, tagsProvider) => {
  console.log(tagsProvider);
  if (tagsProvider != "Azure" && tagsProvider != "Google") {
    return;
  }

  if (tagsProvider == "Azure") {
    // strategy "choose category with greatest amount of tags, use two tables"
    let highestTagsAmount = 0;
    let bestCategory = "";
    for (var category of Object.keys(CATEGORY_TO_TAGS)) {
      var categoryScore = 0;
      for (let tag of tags) {
        if (CATEGORY_TO_TAGS[category].includes(tag.name.toLowerCase())) {
          categoryScore++;
        }
      }
      if (categoryScore > highestTagsAmount) {
        bestCategory = category;
        highestTagsAmount = categoryScore;
      }
    }

    if (bestCategory === "") {
      bestCategory = getCategoryByLastToCheckTags(tags);
    }

    console.log(bestCategory);
    if (bestCategory == "") console.log("NONE");
    return CATEGORIES[bestCategory];
    //
    //__________________________________________________________________________
  } else if (tagsProvider == "Google") {
    // strategy "contains tag with greates confidence, use one table"
    var categoriesWithConfidences = {};
    for (var category of Object.keys(CATEGORY_TO_TAGS_FULL)) {
      categoriesWithConfidences[category] = 0;
    }

    for (var category of Object.keys(CATEGORY_TO_TAGS_FULL)) {
      for (let tag of tags) {
        if (
          CATEGORY_TO_TAGS_FULL[category].includes(tag.name.toLowerCase()) &&
          tag.confidence > categoriesWithConfidences[category]
        ) {
          categoriesWithConfidences[category] = tag.confidence;
        }
      }
    }

    let bestCategory = "";
    let bestConfidence = 0;

    for (var category of Object.keys(CATEGORY_TO_TAGS_FULL)) {
      if (categoriesWithConfidences[category] > bestConfidence) {
        bestConfidence = categoriesWithConfidences[category];
        bestCategory = category;
      }
    }
    console.log(bestCategory);
    if (bestCategory == "") console.log("NONE");
    return CATEGORIES[bestCategory];
  }
};

const getCategoryByLastToCheckTags = (tags) => {
  let highestTagsAmount = 0;
  let bestCategory = "";
  for (var category of Object.keys(CATEGORY_TO_TAGS_TO_CHECK_LAST)) {
    var categoryScore = 0;
    for (let tag of tags) {
      if (
        CATEGORY_TO_TAGS_TO_CHECK_LAST[category].includes(
          tag.name.toLowerCase()
        )
      ) {
        categoryScore++;
      }
    }
    if (categoryScore > highestTagsAmount) {
      bestCategory = category;
      highestTagsAmount = categoryScore;
    }
  }
  return bestCategory;
};

export const getLabelByValue = (value) => {
  return Object.values(CATEGORIES).find((category) => category.value == value)
    .label;
};

export default getCategory;
