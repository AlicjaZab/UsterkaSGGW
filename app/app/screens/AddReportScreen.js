import React from "react";
import AppForm from "../components/form/AppForm";
import * as Yup from "yup";
import AppFormTextInput from "../components/form/AppFormTextInput";
import { StyleSheet } from "react-native";

import Screen from "../components/Screen";
import colors from "../config/colors";
import AppFormPicker from "../components/form/AppFormPicker";
import SubmitButton from "../components/form/SubmitButton";
import AppFormImagePicker from "../components/form/AppFormImagePicker";
import AppFormItem from "../components/form/AppFormItem";
import reportsApi from "../api/reports";
import mediaObjectApi from "../api/mediaObject";

import {
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  MAX_IMAGE_COUNT,
} from "../config/constants";
import AppFormGeolocationInput from "../components/AppGeolocationInput";
import { CATEGORIES } from "../config/constants";

const validationSchema = Yup.object().shape({
  photos: Yup.array()
    .required()
    .min(1, "Należy dodać przynajmniej jedno zdjęcie")
    .max(MAX_IMAGE_COUNT),
  category: Yup.object().nullable().required("Należy wybrać kategorię usterki"),
  description: Yup.string().label("Opis"),
  coordinates: Yup.object().nullable(),
  locationDescription: Yup.string().when("coordinates", {
    is: null,
    then: Yup.string().required("Należy podać lokalizację usterki"),
    otherwise: Yup.string(),
  }),
});

const initialValues = {
  photos: [],
  category: null,
  description: "",
  locationDescription: "",
  coordinates: null,
  tags: [],
};

function AddReportScreen({ navigation }) {
  /**
   *
   * Firstly sends photos and receives it's ids
   * then creates report data out of values from form, together with photos ids,
   * and sends report data to server
   */
  const handleSubmit = async (values) => {
    const photoIds = [];
    for (let photo of values.photos) {
      const response = await mediaObjectApi.postMediaObject(photo);
      if (response.status === 201) {
        photoIds.push("/api/media_objects/" + response.data.id);
      } else {
        console.log(response);
      }
    }
    const report = {
      category: values.category.value,
      description: values.description,
      status: "new",
      createDate: new Date(),
      closeDate: null,
      location: {
        description: values.locationDescription,
        latitude: values.coordinates ? values.coordinates.latitude : null,
        longitude: values.coordinates ? values.coordinates.longitude : null,
      },
      photos: photoIds,
    };
    sendReport(report);
  };

  const sendReport = async (report) => {
    const response = await reportsApi.postReport(report);
    if (response.status != 201) console.log(response);
    navigation.navigate("ReportDetailsScreen", { data: response.data });
  };

  return (
    <Screen>
      <AppForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        <AppFormItem
          label="Zdjęcia"
          name="photos"
          required={true}
          style={{ marginTop: 20 }}
        >
          <AppFormImagePicker
            label="Zdjęcia"
            name="photos"
            name2="tags"
            required={true}
          />
        </AppFormItem>

        <AppFormItem
          label="Kategoria"
          name="category"
          required={true}
          description="Kategoria zostanie wybrana automatycznie na podstwie dodanych zdjęć, jednak możesz ją zmienić."
        >
          <AppFormPicker items={CATEGORIES} name="category" />
        </AppFormItem>

        <AppFormItem
          label="Lokalizacja"
          name="locationDescription"
          required={true}
          description="Dodaj opis miejsca, jeśli nie możesz podać geolokalizacji, lub możesz ją doprecyzować."
        >
          <AppFormGeolocationInput
            name="coordinates"
            buttonLabel="Udostępnij geolokalizację"
          ></AppFormGeolocationInput>

          <AppFormTextInput
            name="locationDescription"
            placeholder="np. Budynek ..., sala ..."
          />
        </AppFormItem>

        <AppFormItem label="Opis" name="description">
          <AppFormTextInput
            name="description"
            placeholder="Jeśli należy doprecyzować problem..."
          />
        </AppFormItem>

        <SubmitButton
          label="Wyślij zgłoszenie"
          style={{ marginBottom: 40 }}
        ></SubmitButton>
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  map: {
    width: 300,
    height: 250,
  },
  mapContainer: {
    marginVertical: 20,
    overflow: "hidden",
    width: 306,
    height: 256,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddReportScreen;
