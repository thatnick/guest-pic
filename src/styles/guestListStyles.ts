import { StyleSheet } from "react-native";
import { YELLOW } from "../utilities/colour-palette";

export const guestListStyles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginHorizontal: 10,
    marginVertical: 2,
  },
  alignLeft: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "96%",
    backgroundColor: YELLOW,
    borderRadius: 50,
    margin: 5,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  switch: {
    backgroundColor: "#b38d1d",
    borderRadius: 15,
    margin: 2,
  },
  textFont: {
    fontSize: 20,
    color: "black",
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
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#F1F0FC",
  },
  alignRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  flatlist: {
    flex: 7,
    backgroundColor: "#F1F0FC",
    padding: 5,
  },
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    alignSelf: "center",
    color: "black",
    fontSize: 30,
    padding: 5,
  },
});
