export const serverUrl = "http://10.0.2.2:8000"; //address taken from here https://stackoverflow.com/questions/38418998/react-native-fetch-network-request-failed

export const LATITUDE_DELTA = 0.001;

export const LONGITUDE_DELTA = 0.001;

export const MAX_IMAGE_COUNT = 4;

export const MAX_IMAGE_WIDTH_OR_HEIGHT = 500; // in pixels

export const CATEGORIES = {
  lighting: { label: "Oświetlenie", value: "Lighting" },
  plumbing: { label: "Hydraulika", value: "Plumbing" },
  electrical_equipment: {
    label: "Wyposażenie elektryczne",
    value: "Electrical_equipment",
  },
  furnishings: { lable: "Wyposażenie meblowe", value: "Furnishings" },
  electrical_system: {
    label: "Instalacja elektryczna",
    value: "Electrical_system",
  },
  construction_repairs: {
    lable: "Naprawy budownicze",
    value: "Construction_repairs",
  },
  untidiness: { label: "Nieporządek", value: "Untidiness" },
  doors_and_windows: { label: "Drzwi i okna", value: "Doors_and_windows" },
};

export const CATEGORY_TO_ICON = {
  Lighting: "lightbulb-on",
  Plumbing: "water-pump",
  Electrical_equipment: "desktop-classic",
  Furnishings: "table-chair",
  Electrical_system: "lightning-bolt",
  Construction_repairs: "hammer-screwdriver",
  Untidiness: "broom",
  Doors_and_windows: "door",
};

//Azure cognitive services constants
export const key = "1306ad78a86a41c18ff997af89080f03";
const endpointTagsPl =
  "https://westeurope.api.cognitive.microsoft.com/vision/v3.2/analyze?visualFeatures=Tags&language=pl";
export const cognitiveServicesBaseUrl =
  "https://westeurope.api.cognitive.microsoft.com/vision/v3.2";
export const endpointTagsEn = "/analyze?visualFeatures=Tags";
