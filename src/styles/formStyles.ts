import { StyleSheet } from "react-native";
import { YELLOW } from "../utilities/colour-palette";

const formStyles = StyleSheet.create({
  modalView: {
    textAlign: "center",
    height: "50%",
    width: "90%",
    margin: 20,
    marginTop: 50,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    width: "80%",
  },
  modalSection: {
    marginVertical: 10,
    fontSize: 18,
    fontWeight: "700",
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
  },
  modalTextbox: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#EDEDED",
    minHeight: 20,
  },
  modalSubmit: {
    width: 110,
    height: 30,
    margin: 10,
    borderRadius: 50,
    backgroundColor: YELLOW,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 2,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  back: {
    position: "absolute",
    right: -10,
    top: 0,
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: YELLOW,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 2,
  },
});

export { formStyles as styles };
