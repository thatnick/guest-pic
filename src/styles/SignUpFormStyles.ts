import { StyleSheet } from "react-native";
import { YELLOW } from "../utilities/colour-palette";

const SignUpFormStyles = StyleSheet.create({
  button: {
    backgroundColor: "#AA9EE4",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
    margin: -3,
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
  closeButton: {
    position: "relative",

    marginTop: 10,
    left: "50%",
    marginLeft: -50,
    width: 100,
    height: 40,
    backgroundColor: YELLOW,

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,

    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default SignUpFormStyles;
