import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import React from "react";
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
}) {
  return (
    // <Swipeable renderRightActions={renderRightActions}>
    <TouchableHighlight underlayColor="red" onPress={onPress}>
      <View style={styles.container}>
        {/* {ImageComponent} */}
        <Image
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
  },
  image: {
    width: "100%",
    height: 100,
    marginRight: 10,
  },
  title: {
    fontWeight: "500",
  },
  subTitle: {
    color: "red",
    margin: 10,
  },
  details: {
    marginLeft: 10,
    justifyContent: "center",
  },
});
