import { StyleSheet } from "react-native";
import { RED, PURPLE, BLUE, YELLOW} from "../utilities/colour-palette";


const pageStyle = StyleSheet.create({
    container: {
        backgroundColor: RED,
    }
})

const cardStyle = StyleSheet.create({
    container: {
        flexDirection: "column",
        padding: 15,
        borderRadius: 10,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.3,
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
        bottom: 5,
        left: 15,
        backgroundColor: "white",
        width: "100%",
        borderBottomEndRadius: 8,
        borderBottomLeftRadius: 8,
        paddingLeft: 5,
        paddingTop: 9,
        height: "50%",
      },
      title: {
        fontSize: 25,
        fontWeight: "bold",
      },
      description: {
        marginTop: 3,
        fontSize: 16,
        marginLeft: 7,
      },
})



export {pageStyle, cardStyle};