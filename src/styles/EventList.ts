import { StyleSheet } from "react-native";
import { YELLOW } from "../utilities/colour-palette";

const pageStyle = StyleSheet.create({
  container: {
    backgroundColor: "#F1F0FC",
  },
  events: {
    height: "100%",
    marginTop: 15,
  },

  button: {
    position: "absolute",
    zIndex: 100,
    bottom: 140,
    left: "50%",
    marginLeft: -50,
    width: 100,
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
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

const cardStyle = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingHorizontal: 25,
    paddingVertical: 5,
    borderRadius: 10,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginTop: 5,
    height: 180,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
  },
  infoContainer: {
    position: "absolute",
    bottom: 25,
    left: 25,
    backgroundColor: "white",
    width: "100%",
    borderBottomEndRadius: 8,
    borderBottomLeftRadius: 8,
    paddingLeft: 5,
    paddingTop: 9,
    height: "40%",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    marginLeft: 7,
  },
});

export { pageStyle, cardStyle };
