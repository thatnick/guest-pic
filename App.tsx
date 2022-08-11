import { SafeAreaView, View, Button } from "react-native";
import tw from "twrnc";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { UserContext } from "./contexts/UserContext";
import CameraScreen from "./components/CameraScreen";
import HomeScreen from "./components/HomeScreen";


const Stack = createNativeStackNavigator();

import Login from "./components/Login/Login";
import SignUp from "./components/Login/SignUp";
import UserCard from "./components/User/UserCard";
import CreateEvent from "./components/Events/CreateEvent";
import EventList from "./components/Events/EventList";

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [addEventForm, setAddEventForm] = useState(false);
//   const [user, setUser] = useState({});

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {/* <CameraFunc /> */}
//       <SafeAreaView>
//         <View style={tw`pt-6 bg-green-100`}>
//           {isLoggedIn ? (
//             <View>
//               <UserCard />
//               {addEventForm ? (
//                 <CreateEvent setAddEventForm={setAddEventForm} />
//               ) : (
//                 <View>
//                 <EventList />
//                 <Button
//                   title="CreateEvent"
//                   onPress={() => setAddEventForm(true)}
//                 ></Button>
//                 </View>
//               )}
//             </View>
//           ) : (
//             <View>
//               <Login setIsLoggedIn={setIsLoggedIn} />
//               <SignUp setIsLoggedIn={setIsLoggedIn} />
//             </View>
//           )}
//         </View>
//       </SafeAreaView>
//     </UserContext.Provider>


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
