import React from "react";
import Screen from "../components/Screen";
import { Image, Text } from "react-native";
import Moment from "moment";

import AppDetailsItem from "../components/AppDetailsItem";
import AppText from "../components/AppText";
import mediaObjectApi from "../api/mediaObject";

function ReportDetailsScreen({ route }) {
  const { data } = route.params;

  console.log(data.photos[0].contentUrl);

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
      {/* {data.description && (
        <AppDetailsItem title="Opis">{data.description}</AppDetailsItem>
      )} */}
      {/* <Image source={"http://127.0.0.1:8000" + data.photos[0].contentUrl} /> //TODO this is not working */}
    </Screen>
  );
}

export default ReportDetailsScreen;
