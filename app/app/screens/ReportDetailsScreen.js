import React from "react";
import { View, Image } from "react-native";
import format from "date-fns/format";

import Screen from "../components/Screen";
import AppDetailsItem from "../components/AppDetailsItem";
import AppText from "../components/AppText";
import AppImageGallery from "../components/AppImageGallery";
import AppMapWithMarker from "../components/AppMapWithMarker";

import { getLabelByValue } from "../utils/getCategory";
import { REACT_APP_API_URL } from "@env";

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
    imageUrls.push(REACT_APP_API_URL + i.contentUrl);
  }
  //Image.prefetch(imageUrls[0]);
  try {
    loadImages(imageUrls, 0);
  } catch (error) {
    console.log(error);
  }

  console.log(imageUrls);
  console.log("data");
  console.log(data);

  return (
    <Screen style={{ marginVertical: 20 }}>
      <AppDetailsItem title="Kategoria">
        <AppText>{getLabelByValue(data.category.name)}</AppText>
      </AppDetailsItem>
      <AppDetailsItem title="Data utworzenia">
        <AppText>
          {format(new Date(data.createDate), "dd/LL/yyyy hh:mm")}
        </AppText>
      </AppDetailsItem>
      {data.description !== "" && (
        <AppDetailsItem title="Opis">
          <AppText>{data.description}</AppText>
        </AppDetailsItem>
      )}
      <AppDetailsItem title="Lokalizacja">
        <AppText>
          {data.location.description !== "" && data.location.description}
          {data.location.latitude && (
            <View>
              <AppMapWithMarker
                latitude={data.location.latitude}
                longitude={data.location.longitude}
              />
            </View>
          )}
        </AppText>
      </AppDetailsItem>

      <AppDetailsItem title="Zdjęcia">
        <AppImageGallery style={{ marginVertical: 10 }} imageUrls={imageUrls} />
      </AppDetailsItem>
      <AppDetailsItem title="Powiadomione osoby">
        {data.notifiedPeople.map((person) => (
          <AppText key={person.surname}>
            {person.name} {person.surname}
          </AppText>
        ))}
      </AppDetailsItem>
    </Screen>
  );
}

export default ReportDetailsScreen;
