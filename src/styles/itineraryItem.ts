import { StyleSheet } from "react-native";


const itinStyle = StyleSheet.create({
    container: {
        width: "100%",
        marginTop: 15,
    },
    header: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        marginBottom: 10,
    },
    info:{
        marginLeft: 10,
    },
    time: {
        borderRadius: 50,
        width: 45,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        
    },
    title: {
        fontSize: 14,
        fontWeight: "bold",
    },
    gallery: {
        paddingLeft: 55,
    },
})

export {itinStyle};