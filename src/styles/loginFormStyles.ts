import { StyleSheet } from "react-native";
import { YELLOW } from "../utilities/colour-palette";

const loginFormStyles = StyleSheet.create({
  button: {
    backgroundColor: YELLOW,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    width: "100%",
    marginVertical: 10,
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  text: {
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  formStyle: {
    alignItems: "center",
  },
  formikStyle: {
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  displayButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
  },
});

export default loginFormStyles;
