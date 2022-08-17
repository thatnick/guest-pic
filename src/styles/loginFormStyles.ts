import { StyleSheet } from "react-native";

const loginFormStyles = StyleSheet.create({
  button: {
    backgroundColor: "#AA9EE4",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    width: "100%",
    marginVertical: 10,
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
