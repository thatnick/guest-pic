import { StyleSheet } from "react-native";
import { RED, PURPLE, BLUE, YELLOW} from "../utilities/colour-palette";

const pageStyle = StyleSheet.create({
    banner: {
        height: 150
      },
      bannerImg: {
        width: "100%",
        height: 100,
      },
      bannerInfo: {
        position: "absolute",
        paddingLeft: 20,
        paddingBottom: 5,
        bottom: 0,
        backgroundColor: "white",
        width: "100%",
      },
      bannerTitle: {
        fontSize: 25,
        fontWeight: "bold",
      },


      camera: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: 10,
      },
      shadowProp: {
        shadowOffset: { width: 10, height: 10 },
        shadowColor: "grey",
        shadowOpacity: 1,
        elevation: 3,
        backgroundColor: "#0000",
      },
      top: {
        flex: 0.3,
        flexDirection: "row",
        justifyContent: "space-around",
      },
      buttons: {
        flex: 0.4,
        flexDirection: "row",
        justifyContent: "center",
        padding: 10,
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
      },
      textFont: {
        fontFamily: "Rockwell",
        fontSize: 20,
        color: "royalblue",
      },
   
})

export {pageStyle}