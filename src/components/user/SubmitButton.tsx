import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useFormikContext } from "formik";
import { YELLOW } from "../../utilities/colour-palette";

const SubmitButton = ({ title }) => {
  const { handleSubmit } = useFormikContext();
  return (
    <TouchableOpacity onPress={handleSubmit} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: YELLOW,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
    margin: -3,

    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  text: {
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
