import React, {useState, useContext} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {signIn} from '../../firebase/auth';
import {getUserByEmail} from '../../firebase/db';
import {UserContext} from '../../contexts/UserContext';

export default function Login({setIsLoggedIn}) {
  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {setUser} = useContext(UserContext);
  const handleShowPasswordPress = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    await signIn(email, password);
    const user = await getUserByEmail(email);
    setUser(user);

    setEmail('');

    setPassword('');
    setIsLoggedIn(true);
    console.log(`${email} is logged in`);
  };

  return (
    <View>
      <Text>Email:</Text>
      <TextInput
        placeholder="email"
        onChangeText={newText => setEmail(newText)}></TextInput>
      <Text>Password:</Text>
      <TextInput
        placeholder="password"
        secureTextEntry={showPassword}
        onChangeText={newText => setPassword(newText)}></TextInput>
      <Button title="show password" onPress={handleShowPasswordPress}></Button>
      <Button title="Login" onPress={handleLogin}></Button>
    </View>
  );
}
