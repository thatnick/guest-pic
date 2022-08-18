import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native"
import IonIcon from "react-native-vector-icons/Ionicons";
import { styles } from "../styles/guestList";


export const BackButton = () => {

    const navigation = useNavigation();

    return (
        <Pressable style={styles.buttons}>
            <IonIcon 
                name={"close"}
                size={30}
                color={'black'}
                onPress={() => navigation.goBack()}/>
        </Pressable>
    )
}