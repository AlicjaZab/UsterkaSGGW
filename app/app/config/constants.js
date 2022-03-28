export const serverUrl = "http://10.0.2.2:8000"; //address taken from here https://stackoverflow.com/questions/38418998/react-native-fetch-network-request-failed

export const LATITUDE_DELTA = 0.001;

export const LONGITUDE_DELTA = 0.001;

export const CATEGORIES = [
  { label: "Oświetlenie", value: "ligting" },
  { label: "Hydraulika", value: "plumbing" },
  { label: "Elektronika", value: "electrical_equipment" },
  { label: "Zanieczyszczenia", value: "electrical_equipment" },
  { label: "Sprzęt_elektryczny", value: "electrical_equipment" },
];

export const CATEGORY_TO_ICON = {
  Oświetlenie: "lightbulb-on",
  Hydraulika: "water-pump",
  Elektronika: "desktop-classic",
  kanalizacja: "water-pump",
};
