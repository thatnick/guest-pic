import { StyleSheet } from "react-native";

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
});

export default SignUpFormStyles;
