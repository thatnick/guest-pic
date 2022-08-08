import tw from "twrnc";
import { StatusBar } from "expo-status-bar";
import { View, Text, SafeAreaView } from "react-native";

export default function App() {
  return (
    <SafeAreaView>
      <View style={tw`pt-6 bg-green-100`}>
        <Text>Open up App.tsx to start working on your app!</Text>

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}
