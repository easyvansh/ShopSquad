import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./app/navigation/AuthStack";
import AppDrawer from "./app/navigation/AppDrawer";
import "react-native-gesture-handler";
import { auth } from "./app/screens/Login/config";

const AppNavigator = () => {
  const user = auth.currentUser;
  return (
    <NavigationContainer>
      {user ? <AppDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
