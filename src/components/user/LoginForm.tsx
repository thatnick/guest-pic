import React, { useState, useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Alert,
} from "react-native";
import { signIn } from "../../firebase/auth";
import { getUserByEmail } from "../../firebase/db";
import { UserContext } from "../../contexts";
import * as Yup from "yup";

import { SafeAreaView } from "react-native-safe-area-context";
import { User } from "../../utilities/types";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import AppFormField from "../user/AppFormField";
import SubmitButton from "../user/SubmitButton";
import loginFormStyles from "../../styles/loginFormStyles";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export default function LoginForm() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorInvalidUser, setErrorInvalidUser] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const handleLogin = async ({ email, password }) => {
    await signIn(email, password).then(() => {
      setErrorInvalidUser(false);
    });
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

  return (

    <ImageBackground
      blurRadius={3}
      source={require("../../assets/images/event-login.jpg")}
      resizeMode="cover"
      style={loginFormStyles.image}
    >
      <StatusBar barStyle={"light-content"} />

      <SafeAreaView style={loginFormStyles.formStyle}>
        <View
          style={{
            height: "10%",
            width: "70%",
            backgroundColor: "white",
            marginTop: "40%",
          }}
        ></View>
        <View style={loginFormStyles.formikStyle}>
          <View style={{ margin: 20 }}>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(values) => {
                handleLogin(values).catch(() => setErrorInvalidUser(true));
              }}
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
                  <View style={loginFormStyles.displayButton}>
                    <SubmitButton title="submit" />
                    <TouchableOpacity
                      style={loginFormStyles.button}
                      onPress={() => navigation.navigate("SignUpForm")}
                    >
                      <Text style={loginFormStyles.text}>SIGN UP</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
            {errorInvalidUser && Alert.alert("Invalid User Credentials")}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
