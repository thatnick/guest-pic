import { StyleSheet } from "react-native";
import { RED, PURPLE, BLUE, YELLOW} from "../utilities/colour-palette";

const pageStyle = StyleSheet.create({
    content: {
        height: "100%",
        backgroundColor:'#F1F0FC'
    },
    
    banner: {
        height: 180
      },
      bannerImg: {
        width: "100%",
        height: 150,
      },
      bannerInfo: {
        position: "absolute",
        paddingLeft: 20,
        
        bottom: 0,
        backgroundColor: "white",
        width: "100%",
        height: 80,

        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      bannerTitle: {
        marginTop: 5,
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
backButton: {
  position: "absolute",
  zIndex: 100,
  top: 5,
  right: 5,

  height: 40,
  width: 40,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 50,

  backgroundColor: "black",
},
buttonText: {
  fontSize: 18,
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
  bottom: 60,
  left: "50%",
  marginLeft: -30,

  shadowOffset: { width: 2, height: 2, },
  shadowOpacity: 0.35,
  shadowRadius: 2,
},
guests: {
  position: "absolute",
  width: 100,
  height: 30,
  borderRadius: 50,
  backgroundColor: YELLOW,

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  zIndex: 100,
  bottom: 75,
  left: "80%",
  marginLeft: -50,

  shadowOffset: { width: 2, height: 2},
  shadowOpacity: 0.35,
  shadowRadius: 2,
},
guestsText: {
  fontSize: 18,
  fontWeight: "bold",
},
back: {
  position:'absolute',
  right: 10,
  top: 10,
  width:35,
  height:35,
  borderRadius:50,
  backgroundColor:YELLOW,

  display: "flex",
  justifyContent: "center",
  alignItems: "center",


  shadowOffset: { width: 2, height: 2},
  shadowOpacity: 0.35,
  shadowRadius: 2,
},
itinItems: {
  position: "absolute",
  width: 100,
  
  height: 30,
  borderRadius: 50,
  backgroundColor: YELLOW,

  zIndex: 100,
  bottom: 75,
  left: "20%",
  marginLeft: -50,

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  shadowOffset: { width: 2, height: 2},
  shadowOpacity: 0.35,
  shadowRadius: 2,
},
});

export {pageStyle, buttons}