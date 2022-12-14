import React, { useState, useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Image,
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
import ErrorMsg from "./ErrorMsg";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export default function LoginForm() {
  const navigation = useNavigation();
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

  return (
    <ImageBackground
      blurRadius={1}
      source={require("../../assets/images/event-login.jpg")}
      resizeMode="cover"
      style={loginFormStyles.image}
    >
      <StatusBar barStyle={"light-content"} />

      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 50,
          top: 100,
        }}
      >
        <Image
          source={require("../../assets/images/gp_logo_white.png")}
          style={{ resizeMode: "contain", width: "100%", height: "100%" }}
        />
      </View>

      <View
        style={{
          height: "10%",
          width: "70%",
          backgroundColor: "#F1F0FC",
          marginTop: "40%",
          position: "absolute",
        }}
      ></View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={loginFormStyles.formStyle}
      >
        <SafeAreaView style={loginFormStyles.formikStyle}>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(values, { resetForm }) => {
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
                  <SubmitButton title="Sign In" />
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
          {errorInvalidUser && (
            <View style={{ alignItems: "center" }}>
              <ErrorMsg
                error="Invalid User Credentials"
                visible={errorInvalidUser}
              />
            </View>
          )}
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
