import { StyleSheet } from "react-native";
import { BLUE, OFFWHITE, PURPLE, YELLOW } from "../utilities/colour-palette";

export const userHeaderStyle = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    marginBotoom: 20,
  },
  avatarAndText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  event: {
    fontWeight: "bold",
    fontSize: 15,
  },
  item: {
    fontSize: 15,
  },
  logOutButton: {
    width: 70,
    height: 30,
    backgroundColor: YELLOW,
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
