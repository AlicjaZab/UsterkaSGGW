export const serverUrl = "http://10.0.2.2:8000"; //address taken from here https://stackoverflow.com/questions/38418998/react-native-fetch-network-request-failed

export const LATITUDE_DELTA = 0.001;

export const LONGITUDE_DELTA = 0.001;

export const MAX_IMAGE_COUNT = 4;

export const MAX_IMAGE_WIDTH_OR_HEIGHT = 500; // in pixels

export const CATEGORIES = {
  lighting: { label: "Oświetlenie", value: "Lighting" },
  plumbing: { label: "Hydraulika", value: "Plumbing" },
  electrical_equipment: { label: "Elektronika", value: "Electricity" },
};

export const CATEGORY_TO_ICON = {
  Lighting: "lightbulb-on",
  Plumbing: "water-pump",
  Electricity: "desktop-classic",
  kanalizacja: "water-pump",
};

//Azure cognitive services constants
export const key = "*******";
const endpointTagsPl =
  "https://westeurope.api.cognitive.microsoft.com/vision/v3.2/analyze?visualFeatures=Tags&language=pl";
export const cognitiveServicesBaseUrl =
  "https://westeurope.api.cognitive.microsoft.com/vision/v3.2";
export const endpointTagsEn = "/analyze?visualFeatures=Tags";
