import React, { useState, useContext } from "react";
import {
  Text,
  TextInput,
  Button,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
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
import AppFormField from "../user/AppFormField";
import SubmitButton from "../user/SubmitButton";
import ErrorMsg from "./ErrorMsg";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export default function LoginForm() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorInvalidUser, setErrorInvalidUser] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const handleShowPasswordPress = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async ({ email, password }) => {
    await signIn(email, password);
    const user: User = await getUserByEmail(email);
    setUser(user);
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
  const values = { email: "", password: "" };
  return (
    <SafeAreaView style={styles.form}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values, { resetForm }) => {
          console.log(values, "<<<<<ON SUBMIT");

          handleLogin(values).catch((err) => setErrorInvalidUser(true));
          resetForm({ values: { email: "", password: "" } });
        }}
        validationSchema={validationSchema}
      >
        {({ resetForm }) => (
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
      {errorInvalidUser && (
        <View style={{ alignItems: "center" }}>
          <ErrorMsg
            error="Invalid User Credentials"
            visible={errorInvalidUser}
          />
        </View>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SignUpForm")}
      >
        <Text style={styles.text}>SIGN UP</Text>
      </TouchableOpacity>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  form: {
    margin: 10,
  },
  button: {
    backgroundColor: "#AA9EE4",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
