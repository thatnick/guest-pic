import { StyleSheet } from "react-native";
import { RED, PURPLE, BLUE, YELLOW} from "../utilities/colour-palette";

const pageStyle = StyleSheet.create({
    content: {
        height: "100%",
    },
    
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
        position: "absolute",
        zIndex: 100,
        bottom: 0,
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

const buttons = StyleSheet.create({
    button: {
        position: "absolute",
        zIndex: 100,
        top: 5,
        left: 5,
        
        width: "auto",
        height: 30,
        backgroundColor: YELLOW,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        paddingHorizontal: 10,

        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 1,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "bold",
    },
    camera: {
        position: "absolute",
        width: 60,
        height:60,
        borderRadius: 50,
        backgroundColor: YELLOW,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        zIndex: 100,
        bottom: 80,
        left: "50%",
        marginLeft: -30,

        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.35,
        shadowRadius: 2,
    },
    guests: {
        position: "absolute",
        width: 60,
        height: 30,
        borderRadius: 50,
        backgroundColor: YELLOW,

        zIndex: 100,
        bottom: 80,
        left: "80%",
        marginLeft: -30,
    },
});

export {pageStyle, buttons}