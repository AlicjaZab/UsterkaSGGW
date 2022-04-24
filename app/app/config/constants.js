export const serverUrl = "http://10.0.2.2:8000"; //address taken from here https://stackoverflow.com/questions/38418998/react-native-fetch-network-request-failed

export const LATITUDE_DELTA = 0.001;

export const LONGITUDE_DELTA = 0.001;

export const MAX_IMAGE_COUNT = 4;

export const CATEGORIES = {
  lighting: { label: "Oświetlenie", value: "ligting" },
  plumbing: { label: "Hydraulika", value: "plumbing" },
  electrical_equipment: { label: "Elektronika", value: "electrical_equipment" },
};

export const CATEGORY_TO_ICON = {
  Oświetlenie: "lightbulb-on",
  Hydraulika: "water-pump",
  Elektronika: "desktop-classic",
  kanalizacja: "water-pump",
};

//Azure cognitive services constants
export const key = "1306ad78a86a41c18ff997af89080f03";
const endpointTagsPl =
  "https://westeurope.api.cognitive.microsoft.com/vision/v3.2/analyze?visualFeatures=Tags&language=pl";
export const cognitiveServicesBaseUrl =
  "https://westeurope.api.cognitive.microsoft.com/vision/v3.2";
export const endpointTagsEn = "/analyze?visualFeatures=Tags";
