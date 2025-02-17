import React from "react";
import { View } from "react-native";
import * as Location from "expo-location";
import { useFormikContext } from "formik";

import AppSmallButton from "../components/AppSmallButton";
import AppMapWithMarker from "./AppMapWithMarker";

function AppFormGeolocationInput({
  name,
  buttonLabel,
  mapStyle,
  containerStyle,
}) {
  const { setFieldValue, values } = useFormikContext();
  const coordinates = values[name];

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }

    let { coords } = await Location.getCurrentPositionAsync({});
    console.log(coords);

    setFieldValue(name, {
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  return (
    <View>
      <AppSmallButton label={buttonLabel} onPress={getLocation} />
      {coordinates && (
        <AppMapWithMarker
          mapStyle={mapStyle}
          containerStyle={containerStyle}
          latitude={coordinates.latitude}
          longitude={coordinates.longitude}
        />
      )}
    </View>
  );
}

export default AppFormGeolocationInput;
