import { StyleSheet } from "react-native";
import { BLUE, PURPLE, RED, YELLOW } from '../utilities/colour-palette';


export const styles = StyleSheet.create({
container:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#F1F0FC',
    // backgroundColor:'#5B57F4',
    padding:20,
    paddingTop:40
},
alignRight:{
    flexDirection:'row',
    justifyContent:'space-between',
    margin:10,
},
flatlist: {
    flex:1,
    backgroundColor:'#F1F0FC',
    padding:5,
    borderRadius:15
},
modal: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
},
headerText: {
    alignSelf:'center',
    fontFamily:'Rockwell',
    color:'black',
    // color:'white',
    fontSize:30,
    padding:5,
},
button: {
    position:'absolute',
    width:35,
    height:35,
    backgroundColor:YELLOW,
},

buttons: {
    position:'absolute',
        width:130,
        height:40,
        backgroundColor:YELLOW,
        display:'flex',
        justifyContent: "center",
        alignItems:'center',
        borderRadius:50,
        // borderWidth:2,

        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.3,
        shadowRadius: 1,
},
addGuest: {
    flexDirection:'row',
    justifyContent:'center',
    margin:10
},
textInput:{
    backgroundColor:YELLOW,
    borderRadius:50,
    margin:5,
    padding:10,

    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.3,
    shadowRadius: 1,
},

text: {fontFamily:'Rockwell'}

});
