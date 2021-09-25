import { useFonts } from "@use-expo/font";
import colors from "./colors";

export function loadFonts() {
  const [isLoaded] = useFonts({
    "Ubuntu-Bold": require("../assets/fonts/Ubuntu/Ubuntu-Bold.ttf"),
    "Ubuntu-BoldItalic": require("../assets/fonts/Ubuntu/Ubuntu-BoldItalic.ttf"),
    "Ubuntu-Italic": require("../assets/fonts/Ubuntu/Ubuntu-Italic.ttf"),
    "Ubuntu-Light": require("../assets/fonts/Ubuntu/Ubuntu-Light.ttf"),
    "Ubuntu-LightItalic": require("../assets/fonts/Ubuntu/Ubuntu-LightItalic.ttf"),
    "Ubuntu-Medium": require("../assets/fonts/Ubuntu/Ubuntu-Medium.ttf"),
    "Ubuntu-MediumItalic": require("../assets/fonts/Ubuntu/Ubuntu-MediumItalic.ttf"),
    "Ubuntu-Regular": require("../assets/fonts/Ubuntu/Ubuntu-Regular.ttf"),
    Droid: require("../assets/fonts/DroidSerif-Bold.ttf"),
  });
  return isLoaded;
}

export default {
  text: {
    fontFamily: "Ubuntu-Medium",
    fontSize: 20,
    color: colors.dark,
  },
  headerText1: {
    color: colors.primary,
    fontFamily: "Ubuntu-Medium",
    fontSize: 30,
  },
  headerText2: {
    color: colors.primary,
    fontFamily: "Ubuntu-Medium",
    fontSize: 20,
  },
  regularText: {
    color: colors.primary,
    fontFamily: "Ubuntu-Medium",
    fontSize: 18,
  },
  inputField: {
    backgroundColor: colors.inputField,
    borderRadius: 15,
    flexDirection: "row",
    padding: 10,
    marginVertical: 5,
  },
  formItemContainer: {
    marginBottom: 20,
  },
};
