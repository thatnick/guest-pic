import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Pressable,
} from "react-native";
import React, { useState, useContext } from "react";
import { createUserAccount } from "../../firebase/auth";
import { UserContext } from "../../contexts";
import { addUser } from "../../firebase/db";
import { User } from "../../utilities/types";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import signUpFormStyles from "../../styles/signUpFormStyles";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const { setUser } = useContext(UserContext);
  const navigation = useNavigation();

  const handleRegisterPress = async () => {
    const newUser: User = {
      email: email,
      avatarUrl: avatarUrl,
      name: name,
    };

    await createUserAccount(email, password);
    await addUser(newUser);

    setUser(newUser);

    setEmail("");
    setPassword("");
    setShowPassword(true);
    setName("");
    setAvatarUrl("");
    Alert.alert("Registration Done");
    navigation.goBack();
  };

  const handleShowPasswordPress = () => {
    setShowPassword(!showPassword);
  };
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ margin: 10, flexDirection: "row-reverse" }}>
        <Pressable style={signUpFormStyles.buttons}>
          <Icon
            name={"close"}
            size={30}
            color={"black"}
            onPress={() => navigation.goBack()}
          />
        </Pressable>
      </View>
      <View style={signUpFormStyles.registerForm}>
        <Text>Email :</Text>
        <TextInput
          style={signUpFormStyles.textInputContainer}
          placeholder="email"
          textContentType="emailAddress"
          autoCapitalize="none"
          onChangeText={(newText) => setEmail(newText)}
        ></TextInput>
        <Text>Password:</Text>
        <TextInput
          style={signUpFormStyles.textInputContainer}
          placeholder="password"
          textContentType="newPassword"
          secureTextEntry={showPassword}
          onChangeText={(newText) => setPassword(newText)}
        ></TextInput>
        <Text>Name:</Text>
        <TextInput
          style={signUpFormStyles.textInputContainer}
          placeholder="name"
          onChangeText={(newText) => setName(newText)}
        />
        <Text>Avatar:</Text>
        <TextInput
          style={signUpFormStyles.textInputContainer}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="image URL"
          onChangeText={(newText) => setAvatarUrl(newText)}
        ></TextInput>
        <TouchableOpacity
          style={signUpFormStyles.button}
          onPress={handleShowPasswordPress}
        >
          <Text style={signUpFormStyles.text}>Show Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={signUpFormStyles.button}
          onPress={handleRegisterPress}
        >
          <Text style={signUpFormStyles.text}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
