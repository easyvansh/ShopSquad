import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./app/navigation/AuthStack";
import AppStack from "./app/navigation/AppStack";
import 'react-native-gesture-handler';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AuthStack/>
      {/* <AppStack/> */}
    </NavigationContainer>
  );
};

export default AppNavigator;
