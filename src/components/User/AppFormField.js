import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useFormikContext } from "formik";
import ErrorMsg from "./ErrorMsg";
import Icon from "react-native-vector-icons/Ionicons";

const AppFormField = ({ icon, name, ...props }) => {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();
  return (
    <>
      <View style={styles.textInputContainer}>
        {icon && (
          <Icon
            style={{ marginRight: 10 }}
            name={icon}
            size={30}
            color="black"
          />
        )}
        <TextInput
          onChangeText={handleChange(name)}
          onBlur={() => setFieldTouched(name)}
          {...props}
        />
      </View>
      <ErrorMsg visible={touched[name]} error={errors[name]} />
    </>
  );
};

export default AppFormField;

const styles = StyleSheet.create({
  textInputContainer: {
    borderRadius: 25,
    backgroundColor: "#f8f4f4",
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
  },
});
