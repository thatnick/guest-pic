import React from "react";
import { Pressable } from "react-native"
import IonIcon from "react-native-vector-icons/Ionicons";
import { styles } from "../styles/guestList";


export const CloseModalButton = ({setModalVisible}) => {

    return (
        <Pressable style={styles.buttons}>
            <IonIcon 
                name={"close"}
                size={30}
                color={'black'}
                onPress={() => setModalVisible(false)}/>
        </Pressable>
    )
}