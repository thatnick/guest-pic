import { StyleSheet } from "react-native";
import { YELLOW } from "../utilities/colour-palette";

const SignUpFormStyles = StyleSheet.create({
  button: {
    backgroundColor: YELLOW,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
    margin: -3,

    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  textInputContainer: {
    borderRadius: 25,
    backgroundColor: "#f8f4f4",
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  registerForm: {
    margin: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttons: {
    backgroundColor: YELLOW,
    borderRadius: 50,
    height: 35,
    width: 35,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
});

export default SignUpFormStyles;
