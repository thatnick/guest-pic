import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    
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
        flexWrap: "wrap",
        alignItems: "center",
        margin: 10,
    },
    
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "left",
      width: "75%",
    },
    modalSubtitle: {
      fontSize: 16,
      fontWeight: "bold",
    },
    modalTextbox: {
      padding: 5,
      borderRadius: 10,
      backgroundColor: "#EDEDED",
      minHeight: 50,
    },
    modalCloseButton: {
        width: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        backgroundColor: 'black',
    },
    modalSubmit: {
        width: 100,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        backgroundColor: 'black',
        margin: 5,
    },
    modalButtonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    }
  });

export {styles}