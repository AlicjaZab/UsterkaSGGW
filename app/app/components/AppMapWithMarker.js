import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { LATITUDE_DELTA, LONGITUDE_DELTA } from "../config/constants";
import colors from "../config/colors";

function AppMapWithMarker({
  mapStyle = styles.map,
  containerStyle = styles.mapContainer,
  latitude,
  longitude,
}) {
  return (
    <View style={containerStyle}>
      <MapView
        style={mapStyle}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: 300,
    height: 250,
  },
  mapContainer: {
    marginVertical: 10,
    overflow: "hidden",
    width: 306,
    height: 256,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AppMapWithMarker;
