import { CATEGORIES } from "../config/constants";

// TODO make it find the best tag that could be mapped to category
const getCategory = (tags) => {
  return tagToCategory[
    tags
      .map((tagObject) => tagObject.name)
      .find((tag) => {
        if (tagToCategory[tag] != undefined) {
          return true;
        }
      })
  ];
};

export const getLabelByValue = (value) => {
  return Object.values(CATEGORIES).find((category) => category.value == value)
    .label;
};

// TODO fill this list
const tagToCategory = {
  light: CATEGORIES.lighting,
  lamp: CATEGORIES.lighting,
  bathroom: CATEGORIES.plumbing,
};

export default getCategory;
