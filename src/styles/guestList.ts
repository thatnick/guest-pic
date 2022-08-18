import { StyleSheet } from "react-native";
import { BLUE, PURPLE, RED, YELLOW } from '../utilities/colour-palette';


export const styles = StyleSheet.create({
    image: {
      width: 40,
      height: 40,
      borderRadius: 50,
   marginHorizontal:10,
   marginVertical: 2
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
      shadowOffset: { width: 5, height: 5 },
      shadowColor: "darkslategray",
      shadowOpacity: 1,
      elevation: 2,
    //   backgroundColor: "#0000",
    },
    switch: {
      backgroundColor:PURPLE,
      borderRadius:15,
      margin: 2
    },
    textFont: {
      fontFamily:'Rockwell',
      fontSize:20,
      color:'black',
    },
    // content: {
    //     flex: 1,
    //     flexDirection: "column",
    //     alignItems: "center",
    //     backgroundColor: '#5B57F4',
    //     margin:5
    //   },
    
      buttons: {
        backgroundColor:YELLOW,
        borderRadius:50,
        borderWidth:2,
        height:35,
        width:35,
      },
    //   topBar: {
    //       display:'flex',
    //       flexDirection:'row',
    //       height:60,
    //       justifyContent:"flex-end",
    //       alignItems:'flex-end'
    //   },

//---------------------------------------------//

      container:{
          flex:1,
          flexDirection:'column',
          backgroundColor:'#5B57F4',
      },
      alignRight:{
          flexDirection:'row',
          justifyContent:'space-between',
          margin:10,
      },
      flatlist: {
          flex:7,
          backgroundColor:'#F1F0FC',
          padding:5
      },
      modal: {
          flex:1,
          alignItems:'center',
          justifyContent:'center',
      },
      headerText: {
          alignSelf:'center',
          fontFamily:'Rockwell',
          color:'white',
          fontSize:30,
          padding:5,
    },


  });