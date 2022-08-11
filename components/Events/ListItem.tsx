import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import React from "react";
import EventCard from './EventCard'

// import colors from "../config/colors";
// import Swipeable from "react-native-gesture-handler/Swipeable";

// TODO: add the rest of the props here satisfy eslint rule


interface Props {
  title: string;
}

export default function ListItem({
  title,
  subTitle,
  image,
  onPress,
  renderRightActions,
  ImageComponent,
  data,
})


{
  const setEvent = ()=>{
    console.log(data)
  }

  return (
    // <Swipeable renderRightActions={renderRightActions}>
    <TouchableHighlight underlayColor="red" onPress={setEvent}>
      <View style={[styles.container, styles.shadowProp]}>
        {/* {ImageComponent} */}
        <ImageBackground
          style={styles.image}
          source={{
            uri: image,
          }}
        />
        <View style={styles.details}>
          <Text style={styles.title}> {title}</Text>
          {/* {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>} */}
        </View>
      </View>
    </TouchableHighlight>
    // </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
  },
  title: {
    fontWeight: "500",
    backgroundColor: 'pink',
    overflow: 'hidden',
    borderRadius: 8,
    width: '50%',
    textAlign: 'center'   
    
  },
  subTitle: {
    color: "red",
    margin: 10,
  },
  details: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  shadowProp: {
    shadowOffset: { width: 10, height: 10 },
  shadowColor: 'grey',
  shadowOpacity: 1,
  elevation: 3,
  backgroundColor : "#0000"
  },
});
