import React from "react";
import Screen from "../components/Screen";
import { Image, Text } from "react-native";
import Moment from "moment";

import AppDetailsItem from "../components/AppDetailsItem";
import AppText from "../components/AppText";
import mediaObjectApi from "../api/mediaObject";
import { serverUrl } from "../config/constants";
import AppImageGallery from "../components/AppImageGallery";

let loadImages = async (imageUrls, try_nr) => {
  try {
    for (let i of imageUrls) {
      console.log(i);
      await Image.prefetch(i);
    }
  } catch (error) {
    if (try_nr < 10) {
      loadImages(imageUrls, try_nr + 1);
    } else {
      console.log(error);
    }
  }
  return true;
};

function ReportDetailsScreen({ route }) {
  const { data } = route.params;

  const imageUrls = [];
  for (let i of data.photos) {
    imageUrls.push(serverUrl + i.contentUrl);
  }
  //Image.prefetch(imageUrls[0]);
  try {
    loadImages(imageUrls, 0);
  } catch (error) {
    console.log(error);
  }

  console.log(imageUrls);

  return (
    <Screen>
      <AppDetailsItem title="Kategoria">{data.category}</AppDetailsItem>
      <AppDetailsItem title="Status">{data.status}</AppDetailsItem>
      <AppDetailsItem title="Data utworzenia">
        {Moment(data.createDate).format("DD/MM/YYYY hh:mm")}
      </AppDetailsItem>
      <AppDetailsItem title="Lokalizacja">
        {data.location.description}
      </AppDetailsItem>
      {data.description !== "" && (
        <AppDetailsItem title="Opis">{data.description}</AppDetailsItem>
      )}
      <AppImageGallery style={{ marginTop: 20 }} imageUrls={imageUrls} />
    </Screen>
  );
}

export default ReportDetailsScreen;
