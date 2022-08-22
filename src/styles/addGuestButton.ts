import { StyleSheet } from "react-native";
import { YELLOW } from "../utilities/colour-palette";

export const styles = StyleSheet.create({
  button: {
    position: "absolute",
    width: 150,
    height: 40,
    backgroundColor: YELLOW,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
});
