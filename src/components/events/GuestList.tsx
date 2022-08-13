import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Alert,
  Modal,
  Pressable,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AddGuestForm from "./AddGuestForm";

export default function GuestList({
  visible,
  setVisible,
  setEventCardModalVisible,
  event,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setVisible(!visible);
      }}
    >
      <View>
        <View>
          <Icon name={"user-plus"} size={50} color="blue" onPress={() => {}}>
            <Text style={{ fontFamily: "Arial", fontSize: 15 }}>
              Invite guest
            </Text>
          </Icon>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              setEventCardModalVisible(true);
              setVisible(!visible);
            }}
          >
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
          <AddGuestForm event={event} />
          <TouchableOpacity
          //  style={styles.content}
          ></TouchableOpacity>
        </View>
      </View>
    </Modal>
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
