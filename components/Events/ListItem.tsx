import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import EventCard from "./EventCard";
import UserCard from "../User/UserCard";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

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
}) {
  const setEvent = () => {
    console.log(data);
    setModalVisible(true);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  return (
    // <Swipeable renderRightActions={renderRightActions}>
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View>
          <View>
            <EventCard data={data} />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
            <TouchableOpacity
            //  style={styles.content}
            >
              <Icon
                name={"camera"}
                size={50}
                color="blue"
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate("Camera");
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    </View>
    // </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 15,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
  },
  title: {
    fontWeight: "500",
    backgroundColor: "pink",
    overflow: "hidden",
    borderRadius: 8,
    width: "50%",
    textAlign: "center",
  },
  subTitle: {
    color: "red",
    margin: 10,
  },
  details: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  shadowProp: {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "grey",
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: "#0000",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
