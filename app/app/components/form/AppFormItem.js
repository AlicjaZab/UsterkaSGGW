import React from "react";
import { useFormikContext } from "formik";
import { View, StyleSheet } from "react-native";

import AppText from "../AppText";
import ErrorMessage from "./ErrorMessage";
import defaultStyles from "../../config/styles";
import colors from "../../config/colors";

function AppFormItem({
  label,
  name,
  description,
  required = false,
  children,
  style,
}) {
  const { errors, touched } = useFormikContext();

  return (
    <View style={[defaultStyles.formItemContainer, style]}>
      <AppText style={defaultStyles.headerText2}>
        {label}
        {required && " *"}
      </AppText>
      {description && (
        <AppText style={styles.description}>{description}</AppText>
      )}
      {children}
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    fontSize: 13,
    color: colors.primary,
  },
});

export default AppFormItem;
