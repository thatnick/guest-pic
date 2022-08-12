import tw from "twrnc";
import { View, Text, TextInput, Button } from "react-native";
import React, { useState, useContext } from "react";
import { createUserAccount } from "../../firebase/auth";
import { UserContext } from "../../contexts/UserContext";
import { addUser } from "../../firebase/db";
import { User } from "../../types";

interface Props {
  setIsLoggedIn: (loggedIn: boolean) => void;
}

export default function SignUp({ setIsLoggedIn }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const [showPassword, setShowPassword] = useState(true);
  const { setUser } = useContext(UserContext);

  const handleRegisterPress = async () => {
    // TODO: Handle email / password validation

    const newUser: User = {
      id: email,
      avatarUrl: avatarUrl,
      name: name,
    };

    // TODO check if email is in auth db, if not ask to create password
    // and then createUserAccount
    await createUserAccount(email, password);

    await addUser(newUser);

    setUser(newUser);

    setEmail("");
    setPassword("");
    setShowPassword(true);
    setName("");
    setAvatarUrl("");
    setIsLoggedIn(true);
  };

  const handleShowPasswordPress = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View style={tw`pt-6 bg-green-100`}>
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
