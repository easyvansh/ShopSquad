// AppStack.js
import React from "react";
import { Pressable, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectNumberOfItems } from "../store/cartSlice";
import ProductDetails from "../screens/ProductDetails";
import Login from "../screens/Login/Login";
import Signup from "../screens/Login/Signup";
import Main from "../screens/Login/Main";
import ForgotPassword from "../screens/Login/ForgotPassword";
import ShoppingCart from "../screens/ShoppingCart";
import AccountDetails from "../screens/AccountDetails";
import TrackOrder from "../screens/TrackOrder";
import AppDrawer from "./AppDrawer";
import { selectUserRef } from "../store/userSlice";

const Stack = createStackNavigator();

const AppStack = ({ navigation }) => {
  const numberOfItems = useSelector(selectNumberOfItems);
  const userRef = useSelector(selectUserRef)
    console.log(userRef)
    
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signup}options={{ headerShown: false }}  />
      <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
      <Stack.Screen
        name="Home"
        component={AppDrawer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Product Details"
        component={ProductDetails}
        options={({ navigation }) => ({
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Cart")}
              style={{ flexDirection: "row", padding: 20 }}
            >
              <FontAwesome5 name="shopping-cart" size={18} color="gray" />
              <Text style={{ marginLeft: 5, fontWeight: "500" }}>
                {numberOfItems}
              </Text>
            </Pressable>
          ),
        })}
      />
      <Stack.Screen name="Account Info" component={AccountDetails} />
      <Stack.Screen name="Cart" component={ShoppingCart} />
      <Stack.Screen name="Track Order" component={TrackOrder} />
    </Stack.Navigator>
  );
};

export default AppStack;
