import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { signIn } from "../../firebase/auth";
import { deleteAllDocsInCollection, getUserByEmail } from "../../firebase/db";
import { UserContext } from "../../contexts";
import { LoggedInContext } from "../../contexts";
import {
  deleteAllDocsInDb,
  seedDb,
  seedUserAccounts,
} from "../../firebase/testdata";

// interface Props {
//   setIsLoggedIn: (loggedIn: boolean) => void;
// }

export default function LoginForm({ navigation }) {
  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(UserContext);
  const { setLogin } = useContext(LoggedInContext);

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
    navigation.navigate("Home");
    console.log(`${email} is logged in`);
  };

  const handleLoginAs = async (email: string, password: string) => {
    await signIn(email, password);
    const user = await getUserByEmail(email);
    setUser(user);

    setEmail("");

    setPassword("");
    setLogin(true);
    navigation.navigate("Home");
    console.log(`${email} is logged in`);
  };

  return (
    <View>
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
        textContentType="password"
        secureTextEntry={showPassword}
        onChangeText={(newText) => setPassword(newText)}
      ></TextInput>
      <Button title="show password" onPress={handleShowPasswordPress}></Button>
      <Button title="Login" onPress={handleLogin}></Button>

      <Button
        title="Login as Homer"
        onPress={() => handleLoginAs("homer@s.com", "test123")}
      ></Button>
      <Button
        title="Login as Marge"
        onPress={() => handleLoginAs("marge@s.com", "test123")}
      ></Button>
      <Button
        title="Login as Lisa"
        onPress={() => handleLoginAs("lisa@s.com", "test123")}
      ></Button>
      <Button
        title="Login as Bart"
        onPress={() => handleLoginAs("bart@s.com", "test123")}
      ></Button>
      <Button
        title="Seed user accounts"
        onPress={() => seedUserAccounts()}
      ></Button>
      <Button title="Seed the database" onPress={() => seedDb()}></Button>
      <Button
        color="red"
        title="Delete all docs in the database"
        onPress={() => deleteAllDocsInDb()}
      ></Button>
    </View>
  );
}