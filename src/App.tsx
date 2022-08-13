import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { UserContext } from "./contexts/UserContext";
import CameraScreen from "./components/CameraScreen";
import HomeScreen from "./components/HomeScreen";
import PhotoGallery from "./components/Gallery /PhotoGallery";
import { SafeAreaView } from "react-native";

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState({});

  return (
    <SafeAreaView>
      <PhotoGallery />
    </SafeAreaView>
  );
};

export default App;
