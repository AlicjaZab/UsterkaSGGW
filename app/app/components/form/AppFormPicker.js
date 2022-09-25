import React from "react";
import { useFormikContext } from "formik";

import AppPicker from "../AppPicker";

function AppFormPicker({ items, name, placeholder, width }) {
  const { setFieldValue, values } = useFormikContext();
  return (
    <AppPicker
      items={items}
      onSelectItem={(item) => setFieldValue(name, item)}
      placeholder={placeholder}
      selectedItem={values[name]}
      width={width}
    />
  );
}

export default AppFormPicker;
