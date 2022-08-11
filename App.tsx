import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { UserContext } from "./contexts/UserContext";
import CameraScreen from "./components/CameraScreen";
import HomeScreen from "./components/HomeScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState({});


  return (
    <NavigationContainer>
      <UserContext.Provider value={{ user, setUser }}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
};

export default App;
