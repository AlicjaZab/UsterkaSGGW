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
