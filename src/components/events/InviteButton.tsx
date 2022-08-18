import React from "react";
import {  Alert, Text, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from '../../styles/addGuestButton';


export const InviteButton = () => {

    return (
<TouchableOpacity style={styles.button}>
        <Icon 
        name={'email-send-outline'}
        size={30}>           
         <Text
            style={{ fontFamily: "Rockwell", fontSize: 15 }}
            onPress={() => {Alert.alert("Invitations Sent")
                ;
              }}
              >
              send invites
            </Text>
          </Icon>
        </TouchableOpacity>
    )
}