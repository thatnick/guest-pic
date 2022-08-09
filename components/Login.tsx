import tw from "twrnc";
import { View, Text, TextInput, Button } from "react-native";
import { useState, useContext } from "react";
import { createUserAccount } from "../firebase/auth";
import { UserContext } from "../contexts/UserContext";
import { addUser } from "../firebase/db";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const { user, setUser } = useContext(UserContext);

  const handleRegisterPress = async () => {
    // TODO: Handle email / password validation
    console.log(email, password);

    await createUserAccount(email, password);
    const newUser = await addUser({});
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
      <Button title="show password" onPress={handleShowPasswordPress}></Button>
      <Button title="Register" onPress={handleRegisterPress}></Button>
    </View>
  );
}
