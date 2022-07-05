import {
  CATEGORIES,
  CATEGORY_TO_TAGS,
  CATEGORY_TO_TAGS_TO_CHECK_LAST,
} from "../config/constants";
import _ from "lodash";

// TODO make it find the best tag that could be mapped to category
const getCategory = (tags) => {
  let highestTagsAmount = 0;
  let bestCategory = "";
  for (var category of Object.keys(CATEGORY_TO_TAGS)) {
    var categoryScore = 0;
    for (let tag of tags) {
      if (CATEGORY_TO_TAGS[category].includes(tag.name)) {
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

  console.log("Best category: ");
  console.log(bestCategory);
  return CATEGORIES[bestCategory];
};

const getCategoryByLastToCheckTags = (tags) => {
  console.log("Trying to find category with tags last to check");
  let highestTagsAmount = 0;
  let bestCategory = "";
  for (var category of Object.keys(CATEGORY_TO_TAGS_TO_CHECK_LAST)) {
    var categoryScore = 0;
    for (let tag of tags) {
      if (CATEGORY_TO_TAGS_TO_CHECK_LAST[category].includes(tag.name)) {
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
