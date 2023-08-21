// AppStack.js
import React from "react";
import { Pressable, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectNumberOfItems } from "../store/cartSlice";
import ProductDetails from "../screens/ProductDetails";
import HomePage from "../screens/HomePage";
import ShoppingCart from "../screens/ShoppingCart";
import AccountDetails from "../screens/AccountDetails";
import TrackOrder from "../screens/TrackOrder";

const Stack = createStackNavigator();

const AppStack = ({ navigation }) => {
  const numberOfItems = useSelector(selectNumberOfItems);

  return (
    <Stack.Navigator
      initialRouteName="HomePage"
      screenOptions={{ headerShown: false }}
    >
        
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen
        name="Product Details"
        component={ProductDetails}
        options={{
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
        }}
      />
      <Stack.Screen name="Account Info" component={AccountDetails} />
      <Stack.Screen name="Cart" component={ShoppingCart} />
      <Stack.Screen name="Track Order" component={TrackOrder} /> 
    </Stack.Navigator>
  );
};

export default AppStack;
