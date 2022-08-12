import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { signIn } from "../../firebase/auth";
import { getUserByEmail } from "../../firebase/db";
import { UserContext } from "../../contexts/UserContext";
import {LoginContext} from '../../contexts/LoginContext'

// interface Props {
//   setIsLoggedIn: (loggedIn: boolean) => void;
// }

export default function Login({ navigation }) {
  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(UserContext);
  const { setLogin } = useContext(LoginContext);

  const handleShowPasswordPress = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    await signIn(email, password);
    const user = await getUserByEmail(email);
    setUser(user);

    setEmail("");

    setPassword("");
    setLogin(true);
    navigation.navigate("Home")
    console.log(`${email} is logged in`);
  };

  return (
    <View>
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
      <Button title="show password" onPress={handleShowPasswordPress}></Button>
      <Button title="Login" onPress={handleLogin}></Button>
    </View>
  );
}
