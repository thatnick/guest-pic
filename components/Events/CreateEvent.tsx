import React, { useState, useContext } from "react";
import { Text, FlatList, TouchableOpacity, View, TextInput, Button } from "react-native";
import { UserContext } from "../../contexts/UserContext";


export default function CreateEvent() {
    const [eventTitle, setEventTitle] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [banner, setBanner] = useState("");
    const { user } = useContext(UserContext);

    
    const handleRegisterPress = async () => {
        const newEvent = {
            title: eventTitle,
            description: description,
            location: location,
            itinerary: [],
            guests: [],
            photos: [],
            date: date,
            banner: banner,
            hosts: [user],
        }
    }
    
    return(
        <View>

        <Text>Event Title:</Text>
        <TextInput
        onChangeText={(newText) => setEventTitle(newText)}
        ></TextInput>

         <Text>Location:</Text>
        <TextInput
        onChangeText={(newText) => setLocation(newText)}
        ></TextInput>

        <Text>Description:</Text>
        <TextInput
        onChangeText={(newText) => setDescription(newText)}
        ></TextInput>

        <Text>Date:</Text>
        <TextInput
        placeholder="dd/mm/yyyy"
        onChangeText={(newText) => setDate(newText)}
        ></TextInput>

        <Text>Banner url:</Text>
        <TextInput
        onChangeText={(newText) => setBanner(newText)}
        ></TextInput>

        <Button title="Create" onPress={handleRegisterPress}></Button>
       
        </View>
    )
}