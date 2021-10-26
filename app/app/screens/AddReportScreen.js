import React, { useState } from "react";
import AppForm from "../components/form/AppForm";
import * as Yup from "yup";
import AppFormTextInput from "../components/form/AppFormTextInput";
import { StyleSheet, View } from "react-native";
// import * as Permissions from 'expo-permissions';
import * as Location from "expo-location";

import Screen from "../components/Screen";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import AppPicker from "../components/AppPicker";
import AppFormPicker from "../components/form/AppFormPicker";
import SubmitButton from "../components/form/SubmitButton";
import AppImageInput from "../components/AppImageInput";
import AppFormImagePicker from "../components/form/AppFormImagePicker";
import AppFormItem from "../components/form/AppFormItem";
import reportsApi from "../api/reports";
import mediaObjectApi from "../api/mediaObject";
import createFormData from "../utils/createFormData";
import { useFormikContext } from "formik";
import AppSmallButton from "../components/AppSmallButton";
import MapView, { Marker } from "react-native-maps";
import { LATITUDE_DELTA, LONGITUDE_DELTA } from "../config/constants";
import AppFormGeolocationInput from "../components/AppGeolocationInput";

const validationSchema = Yup.object().shape({
  photos: Yup.array()
    .required()
    .min(1, "Należy dodać przynajmniej jedno zdjęcie")
    .max(5),
  category: Yup.object().nullable().required("Należy wybrać kategorię usterki"),
  description: Yup.string().label("Opis"),
  coordinates: Yup.object().nullable(),
  locationDescription: Yup.string().when("coordinates", {
    is: null,
    then: Yup.string().required("Należy podać lokalizację usterki"),
    otherwise: Yup.string(),
  }), //TODO here required when coordinates is required and apply coordinates values to be used
});

const initialValues = {
  photos: [],
  category: null,
  description: "",
  locationDescription: "",
  coordinates: null,
};

const categories = [
  { label: "Oświetlenie", value: "ligting" },
  { label: "Hydraulika", value: "plumbing" },
  { label: "Sprzęt elektryczny", value: "electrical-equipment" },
];

function AddReportScreen({ navigation }) {
  // const [report, setReport] = useState([]);

  // sendReport(() => {
  //   loadReports();
  // }, []);

  const [region, setRegion] = useState();

  const handleSubmit = (values) => {
    const photoIds = [];
    for (let i of values.photos) {
      photoIds.push("/api/media_objects/" + i.id);
    }
    console.log(values);
    const report = {
      category: values.category.label,
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
    console.log(report);
    sendReport(report);
  };

  const sendReport = async (report) => {
    const response = await reportsApi.postReport(report);
    //const response = await reportsApi.getReportsList();
    console.log(response);
    //setReports(response.data);
    //or redirect to appropriate screen, display appropriate error message
    //return true;
    navigation.navigate("ReportDetailsScreen", { data: response.data });
  };

  // const getLocation = async () => {
  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== "granted") {
  //     alert("Permission to access location was denied");
  //     return;
  //   }

  //   let { coords } = await Location.getCurrentPositionAsync({});
  //   console.log(coords);
  //   setRegion({
  //     latitude: coords.latitude,
  //     longitude: coords.longitude,
  //     latitudeDelta: LATITUDE_DELTA,
  //     longitudeDelta: LONGITUDE_DELTA,
  //   });
  // };

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
          <AppFormImagePicker label="Zdjęcia" name="photos" required={true} />
        </AppFormItem>

        <AppFormItem
          label="Kategoria"
          name="category"
          required={true}
          description="Kategoria zostanie wybrana automatycznie na podstwie dodanych zdjęć, jednak możesz ją zmienić."
        >
          <AppFormPicker items={categories} name="category" />
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
//<AppFormPicker items={categories} name="category" />
