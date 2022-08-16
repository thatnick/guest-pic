import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import EventCamera from "./components/camera/EventCamera";
import LoginForm from "./components/user/LoginForm";
import EventDetails from "./components/events/EventDetails";
import {
  UserContext,
  SelectedEventContext,
  InProgressEventsContext,
} from "./contexts";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CreateEventForm from "./components/events/CreateEventForm";
import PhotoPreview from "./components/camera/PhotoPreview";
import EventList from "./components/events/EventList";
import SetTestDateTime from "./utilities/SetTestDateTime";
import { getInProgressEventsByGuest } from "./firebase/db";
import { Event, ItineraryItem, User } from "./utilities/types";
import SignUpForm from "./components/user/SignUpForm";
import GuestList from "./components/events/GuestList";


const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState<User>();
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [inProgressEvents, setInProgressEvents] = useState<Event[]>([]);
  const [inProgressItems, setInProgressItems] = useState<ItineraryItem[]>();
  const [dateTime, setDateTime] = useState(new Date("2022-08-19"));

  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <UserContext.Provider value={{ user, setUser }}>
          <SelectedEventContext.Provider
            value={{ selectedEvent, setSelectedEvent }}
          >
            <InProgressEventsContext.Provider
              value={{
                inProgressEvents: inProgressEvents,
                setInProgressEvents: setInProgressEvents,
                inProgressItems: inProgressItems,
                setInProgressItems: setInProgressItems,
                dateTime: dateTime,
                setDateTime: setDateTime,
              }}
            >
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
                    presentation: 'transparentModal',
                    cardStyleInterpolator:
                      CardStyleInterpolators.forModalPresentationIOS,
                  }}
                />
                <Stack.Screen
                  name="SetTestDateTime"
                  component={SetTestDateTime}
                  options={{
                    cardStyleInterpolator:
                      CardStyleInterpolators.forModalPresentationIOS,
                  }}
                />
                <Stack.Screen
                  name="SignUpForm"
                  component={SignUpForm}
                  options={{
                    cardStyleInterpolator:
                      CardStyleInterpolators.forModalPresentationIOS,
                  }}
                />
                <Stack.Screen
                  name="GuestList"
                  component={GuestList}
                  options={{
                    cardStyleInterpolator:
                      CardStyleInterpolators.forModalPresentationIOS,
                  }}
                />
              </Stack.Navigator>
            </InProgressEventsContext.Provider>
          </SelectedEventContext.Provider>
        </UserContext.Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
