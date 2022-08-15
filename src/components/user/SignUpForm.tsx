import { View, Text, TextInput, Button } from "react-native";
import React, { useState, useContext } from "react";
import { createUserAccount } from "../../firebase/auth";
import { UserContext } from "../../contexts";
import { addUser } from "../../firebase/db";
import { User } from "../../utilities/types";
import { useNavigation } from "@react-navigation/native";

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
  };

  const handleShowPasswordPress = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View>
       <Button title="Close" onPress={() => navigation.goBack()}></Button>
      <Text>Email:</Text>
      <TextInput
        placeholder="email"
        textContentType="emailAddress"
        autoCapitalize="none"
        onChangeText={(newText) => setEmail(newText)}
      ></TextInput>
      <Text>Password:</Text>
      <TextInput
        placeholder="password"
        textContentType="newPassword"
        secureTextEntry={showPassword}
        onChangeText={(newText) => setPassword(newText)}
      ></TextInput>
      <Text>Name:</Text>
      <TextInput
        placeholder="name"
        onChangeText={(newText) => setName(newText)}
      ></TextInput>
      <Text>Avatar:</Text>
      <TextInput
        placeholder="image URL"
        onChangeText={(newText) => setAvatarUrl(newText)}
      ></TextInput>
      <Button title="show password" onPress={handleShowPasswordPress}></Button>
      <Button title="Register" onPress={handleRegisterPress}></Button>
    </View>
  );
}
