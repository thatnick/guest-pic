import React from "react";
import { SafeAreaView, View } from "react-native";
import { useState } from "react";
import tw from "twrnc";
import { UserContext } from "./contexts/UserContext";

import Login from "./components/Login/Login";
import SignUp from "./components/Login/SignUp";
import UserCard from "./components/User/UserCard";
import CreateEvent from "./components/Events/CreateEvent";
import IteninaryForm from "./components/Itininary/IteninaryForm";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  return <IteninaryForm />;
};

export default App;
