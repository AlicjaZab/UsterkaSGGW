import React, { useState, useEffect } from "react";
import AppForm from "../components/form/AppForm";
import * as Yup from "yup";
import AppFormTextInput from "../components/form/AppFormTextInput";
import { Alert, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import AppFormPicker from "../components/form/AppFormPicker";
import SubmitButton from "../components/form/SubmitButton";
import AppFormImagePicker from "../components/form/AppFormImagePicker";
import AppFormItem from "../components/form/AppFormItem";
import reportsApi from "../api/reports";
import mediaObjectApi from "../api/mediaObject";
import { View, ActivityIndicator } from "react-native";

import {
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  MAX_IMAGE_COUNT,
} from "../config/constants";
import AppFormGeolocationInput from "../components/AppGeolocationInput";
import { CATEGORIES } from "../config/constants";
import AppText from "../components/AppText";

const validationSchema = Yup.object().shape({
  photos: Yup.array()
    .required()
    .min(1, "Należy dodać przynajmniej jedno zdjęcie")
    .max(MAX_IMAGE_COUNT),
  category: Yup.object().nullable().required("Należy wybrać kategorię usterki"),
  description: Yup.string()
    .label("Opis")
    .max(200, "Opis nie powinien przekraczać 200 znaków"),
  coordinates: Yup.object().nullable(),
  locationDescription: Yup.string()
    .max(200, "Opis lokalizacji nie powinien przekraczać 200 znaków")
    .when("coordinates", {
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
  const [loading, setLoading] = useState(false);

  /**
   * Asks user if he wants to cancel adding report, and navigates to reports list
   */
  const handleCancel = () => {
    Alert.alert(
      "Anuluj",
      "Na pewno chcesz przerwać dodawanie raportu? Wprowadzone zmiany zostaną niezapisane.",
      [
        {
          text: "Tak",
          onPress: () => navigation.navigate("ReportsListScreen"),
        },
        { text: "Nie" },
      ]
    );
  };
  /**
   *
   * Firstly sends photos and receives it's ids
   * then creates report data out of values from form, together with photos ids,
   * and sends report data to server
   */
  const sendPhotosAndCreateReport = async (values) => {
    setLoading(true);
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
      createDate: new Date().toLocaleString("en-US", {
        timeZone: "Europe/Warsaw",
      }),
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

  /**
   *
   * Asks user if he wants to send report for sure, if yes proceeds
   */
  const handleSubmit = (values) => {
    Alert.alert(
      "Wyślij zgłoszenie",
      "Wysłać zgłoszenie? Zatwierdzenie spowoduje wysłanie e-maila ze zgłoszeniem do odpowiednich osób.",
      [
        {
          text: "Tak",
          onPress: () => {
            sendPhotosAndCreateReport(values);
          },
        },
        {
          text: "Nie",
        },
      ]
    );
  };

  /**
   *
   * Sends created report to server, on success response navigates to report details screen
   */
  const sendReport = async (report) => {
    const response = await reportsApi.postReport(report);
    setLoading(false);
    if (response.status != 201) {
      console.log(response);
      navigation.navigate("ErrorReportNotCreatedScreen", { data: response });
    } else {
      navigation.navigate("ReportDetailsScreen", { data: response.data });
    }
  };

  return (
    <Screen>
      {loading == false && (
        <View>
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
            <View style={{ marginBottom: 40 }}>
              <SubmitButton label="Wyślij zgłoszenie"></SubmitButton>
              <AppButton
                label="Anuluj"
                onPress={handleCancel}
                color={colors.mediumGrey}
              ></AppButton>
            </View>
          </AppForm>
        </View>
      )}
      {loading == true && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            animating={true}
            size="large"
            color={colors.secondary}
          ></ActivityIndicator>
          <AppText style={{ color: colors.secondary }}>
            Wysyłanie zgłoszenia...
          </AppText>
        </View>
      )}
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
  loadingContainer: {
    //flex: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-around",
    padding: 50,
    //backgroundColor: colors.black,
    height: 300,
  },
  loadingText: {},
});

export default AddReportScreen;
