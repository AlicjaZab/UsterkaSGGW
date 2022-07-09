export const serverUrl = "http://10.0.2.2:8000"; //address taken from here https://stackoverflow.com/questions/38418998/react-native-fetch-network-request-failed

export const LATITUDE_DELTA = 0.001;

export const LONGITUDE_DELTA = 0.001;

export const MAX_IMAGE_COUNT = 4;

export const MAX_IMAGE_WIDTH_OR_HEIGHT = 500; // in pixels

//Should be one of: Google/Azure/None
// For "Google" / "Azure", categories will be chosen automatically
// For "None", category should be always specified by user
//
// set to "Google", to use Google Cloud Vision service to provide tags for photos
//    (make sure that googleApiKey has proper value)
// set to "Azure" to use Microsoft Azure Computer Vision service to provide tags for photos
//    (make sure that cognitiveServicesBaseUrl and key have proper values)
export const TAGGS_PROVIDER = "None";

export const CATEGORIES = {
  lighting: { label: "Oświetlenie", value: "Lighting" },
  plumbing: { label: "Hydraulika", value: "Plumbing" },
  electrical_equipment: {
    label: "Wyposażenie elektryczne",
    value: "Electrical_equipment",
  },
  furnishings: { label: "Wyposażenie meblowe", value: "Furnishings" },
  electrical_system: {
    label: "Instalacja elektryczna",
    value: "Electrical_system",
  },
  construction_repairs: {
    label: "Naprawy budownicze",
    value: "Construction_repairs",
  },
  untidiness: { label: "Nieporządek", value: "Untidiness" },
  doors_and_windows: { label: "Drzwi i okna", value: "Doors_and_windows" },
  supplies: { label: "Zaopatrzenie", value: "Supplies" },
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
  Supplies: "paperclip",
};

//Azure cognitive services constants
export const key = "paste your key here";
// this url also should be changed to math your project
export const cognitiveServicesBaseUrl =
  "https://image-recognition-project.cognitiveservices.azure.com/vision/v3.2";
export const endpointTagsEn = "/analyze?visualFeatures=Tags";

//Google Cloud Vision API constants
export const googleApiUrl =
  "https://vision.googleapis.com/v1/images:annotate?key=";
export const googleApiKey = "paste your key here";
