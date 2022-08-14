import "react-native-gesture-handler";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import EventCamera from "./components/camera/EventCamera";
import ReverseCamera from "./components/camera/ReverseCamera";
import LoginForm from "./components/user/LoginForm";
import EventDetails from "./components/events/EventDetails";
import { UserContext, EventContext } from "./contexts";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CreateEventForm from "./components/events/CreateEventForm";
import PhotoPreview from "./components/camera/PhotoPreview";
import EventList from "./components/events/EventList";
const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(undefined);
  const [event, setEvent] = useState(undefined);

  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <UserContext.Provider value={{ user, setUser }}>
          <EventContext.Provider value={{ event, setEvent }}>
            <Stack.Navigator
              initialRouteName="LoginForm"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen
                name="EventList"
                component={EventList}
                options={{
                  cardStyleInterpolator: forFade,
                }}
              />
              <Stack.Screen
                name="EventCamera"
                component={EventCamera}
                options={{
                  cardStyleInterpolator: forFade,
                }}
              />
                            <Stack.Screen
                name="ReverseCamera"
                component={ReverseCamera}
                options={{
                  cardStyleInterpolator: forFade,
                }}
              />

              <Stack.Screen
                name="PhotoPreview"
                component={PhotoPreview}
                options={{
                  cardStyleInterpolator: forFade,
                }}
              />
              <Stack.Screen name="LoginForm" component={LoginForm} />
              <Stack.Screen
                name="EventDetails"
                component={EventDetails}
                options={{
                  cardStyleInterpolator:
                    CardStyleInterpolators.forModalPresentationIOS,
                }}
              />
              <Stack.Screen
                name="CreateEventForm"
                component={CreateEventForm}
                options={{
                  cardStyleInterpolator:
                    CardStyleInterpolators.forModalPresentationIOS,
                }}
              />
            </Stack.Navigator>
          </EventContext.Provider>
        </UserContext.Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
