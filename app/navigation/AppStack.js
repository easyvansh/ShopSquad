import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Pressable, Text } from "react-native";
import { FontAwesome5,MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectNumberOfItems } from "../store/cartSlice";
import HomePage from "../screens/HomePage";
import ProductDetails from "../screens/ProductDetails";
import ShoppingCart from "../screens/ShoppingCart";
import TrackOrder from "../screens/TrackOrder";
import AccountDetails from "../screens/AccountDetails";

const Drawer = createDrawerNavigator();
const AppStack = () => {
  const numberOfItems = useSelector(selectNumberOfItems);
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        drawerActiveBackgroundColor: 'green',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: 10,
          fontSize: 18,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={HomePage}
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
          <Drawer.Screen name="Profile" component={AccountDetails} />
      <Drawer.Screen
        name="Product Details"
        component={ProductDetails}
        screenOptions={{ }}
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
      <Drawer.Screen name="Cart" component={ShoppingCart} />
      <Drawer.Screen name="Orders" component={TrackOrder} />
    </Drawer.Navigator>
  );
};

export default AppStack;
