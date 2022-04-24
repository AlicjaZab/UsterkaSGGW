import { CATEGORIES } from "../config/constants";

// TODO make it find the best tag that could be mapped to category
const getCategory = (tags) => {
  return tagToCategory[
    tags
      .map((tagObject) => tagObject.name)
      .find((tag) => {
        console.log(tag);
        console.log(tagToCategory[tag]);
        if (tagToCategory[tag] != undefined) {
          console.log("FOUND!");
          return true;
        }
      })
  ];
};

// TODO fill this list
const tagToCategory = {
  light: CATEGORIES.lighting,
  lamp: CATEGORIES.lighting,
};

export default getCategory;
