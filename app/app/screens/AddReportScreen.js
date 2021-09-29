import React, { useState } from "react";
import AppForm from "../components/form/AppForm";
import * as Yup from "yup";
import AppFormTextInput from "../components/form/AppFormTextInput";
import { StyleSheet, View } from "react-native";

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

const validationSchema = Yup.object().shape({
  photos: Yup.array()
    .required()
    .min(1, "Należy dodać przynajmniej jedno zdjęcie")
    .max(5),
  category: Yup.object().nullable().required("Należy wybrać kategorię usterki"),
  description: Yup.string().label("Opis"),
  location: Yup.string().required("Należy podać lokalizację usterki"),
});

const initialValues = {
  photos: [],
  category: null,
  description: "",
  location: "",
};

const categories = [
  { label: "Oświetlenie", value: "ligting" },
  { label: "Hydraulika", value: "plumbing" },
  { label: "Sprzęt elektryczny", value: "electrical-equipment" },
];

function AddReportScreen(props) {
  // const [report, setReport] = useState([]);

  // sendReport(() => {
  //   loadReports();
  // }, []);

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
    return true;
  };

  return (
    <Screen title="Formularz zgłoszenia">
      <AppForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        <AppFormItem label="Zdjęcia" name="photos" required={true}>
          <AppFormImagePicker label="Zdjęcia" name="photos" required={true} />
        </AppFormItem>

        <AppFormItem
          label="Kategoria"
          name="category"
          required={true}
          description="Kategoria zostanie wybrana automtycznie na podstwie dodanych zdjęć, jednak możesz ją zmienić."
        >
          <AppFormPicker items={categories} name="category" />
        </AppFormItem>

        <AppFormItem
          label="Lokalizacja"
          name="location"
          required={true}
          description="Dodaj opis lokalizacji, jeśli nie możesz podać geolokalizacji, lub możesz ją doprecyzować."
        >
          <AppSmallButton label="+ Dodaj geolokalizację" />
          <AppFormTextInput
            name="location"
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

export default AddReportScreen;
//<AppFormPicker items={categories} name="category" />
