import React, { useState, useContext } from "react";
import { StyleSheet } from "react-native";
import { signIn } from "../../firebase/auth";
import { getUserByEmail } from "../../firebase/db";
import { UserContext } from "../../contexts";
import * as Yup from "yup";
import {
  deleteAllDocsInDb,
  seedDb,
  seedUserAccounts,
} from "../../firebase/testdata";
import { SafeAreaView } from "react-native-safe-area-context";
import { User } from "../../utilities/types";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import AppFormField from "./AppFormField";
import SubmitButton from "./SubmitButton";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export default function LoginForm() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(UserContext);

  const handleShowPasswordPress = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    await signIn(email, password);
    const user: User = await getUserByEmail(email);
    setUser(user);

    setEmail("");

    setPassword("");
    navigation.navigate("EventList");
  };

  const handleLoginAs = async (email: string, password: string) => {
    await signIn(email, password);
    const user = await getUserByEmail(email);
    setUser(user);

    setEmail("");

    setPassword("");
    navigation.navigate("EventList");
  };

  return (
    <SafeAreaView style={styles.form}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleLogin}
        validationSchema={validationSchema}
      >
        {() => (
          <>
            <AppFormField
              placeholder="email"
              name="email"
              icon="mail"
              autoCapitalize="none"
              autoCorrect={false}
              keyBoardType="email-address"
              textContentType="emailAddress"
            />
            <AppFormField
              placeholder="password"
              name="password"
              icon="lock-closed"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              textContentType="password"
            />
            <SubmitButton title="submit" />
          </>
        )}
      </Formik>

      {/* <Text>Email:</Text>
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
      ></Button> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  form: {
    margin: 10,
  },
});
