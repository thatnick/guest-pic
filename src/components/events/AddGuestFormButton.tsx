import React from "react";
import { Pressable, Text } from "react-native"
import IonIcon from "react-native-vector-icons/Ionicons";
import { styles } from '../../styles/addGuestButton';


export const AddGuestFormButton = ({setModalVisible}) => {

    return (
        <Pressable style={styles.button}>
            <IonIcon name={"person-add-outline"} size={30} color="black">
            <Text
              style={{ fontFamily: "Rockwell", fontSize: 15 }}
              onPress={() => {
                setModalVisible(true);
              }}
              >
              invite guest
            </Text>
          </IonIcon>
        </Pressable>
    )
}