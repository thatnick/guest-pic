import { StyleSheet } from "react-native";


const itinStyle = StyleSheet.create({
section: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "77%",
    marginTop: 10,
},
sectionTitle : {
    fontSize: 20,
},
container: {
    width: 380,
    marginTop: 15,
    marginLeft: 10,
},
header: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 10,
},
info:{
    
},
time: {
    borderRadius: 50,
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginRight: 10,
    
},
title: {
    fontSize: 14,
    fontWeight: "bold",
},
gallery: {
   marginLeft: 50,
},
})

export {itinStyle};