import { CATEGORIES, CATEGORY_TO_TAGS } from "../config/constants";

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
  console.log("Best category: ");
  console.log(bestCategory);
  return CATEGORIES[bestCategory];
};

export const getLabelByValue = (value) => {
  return Object.values(CATEGORIES).find((category) => category.value == value)
    .label;
};

export default getCategory;
