import tw from "twrnc";
import { View, Text, TextInput, Button } from "react-native";
import React, { useState, useContext } from "react";
import { createUserAccount } from "../../firebase/auth";
import { UserContext } from "../../contexts/UserContext";
import { addUser } from "../../firebase/db";
import { User } from "../../dataTypes";

interface Props {
  setIsLoggedIn: (loggedIn: boolean) => void;
}

export default function SignUp({ setIsLoggedIn }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const [showPassword, setShowPassword] = useState(true);
  const { setUser } = useContext(UserContext);

  const handleRegisterPress = async () => {
    // TODO: Handle email / password validation

    const newUser = {
      email: email,
      avatar: avatar,
      name: name,
      events: [],
      reference: "",
      documentID: email,
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
    setAvatar("");
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
        onChangeText={(newText) => setEmail(newText)}
      ></TextInput>
      <Text>Password:</Text>
      <TextInput
        placeholder="password"
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
        onChangeText={(newText) => setAvatar(newText)}
      ></TextInput>
      <Button title="show password" onPress={handleShowPasswordPress}></Button>
      <Button title="Register" onPress={handleRegisterPress}></Button>
    </View>
  );
}
