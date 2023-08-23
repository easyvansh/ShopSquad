import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Pressable, Text } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectNumberOfItems } from "../store/cartSlice";
import HomePage from "../screens/HomePage";
import ShoppingCart from "../screens/ShoppingCart";
import TrackOrder from "../screens/TrackOrder";
import AccountDetails from "../screens/AccountDetails";
import AppStack from "./AppStack";
import Logout from "../screens/Login/Logout";
import CustomDrawer from "./CustomDrawer";

const Drawer = createDrawerNavigator();
const AppDrawer = ({ navigation }) => {
  const numberOfItems = useSelector(selectNumberOfItems);
  const navigateToHome = () => {
    navigation.navigate("AppStack", { screen: "HomePage" });
    navigation.closeDrawer();
  };
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawer {...props}/>}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "green",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: {
          marginLeft: 10,
          fontSize: 18,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={AppStack}
        
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
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          onPress: navigateToHome,
        })}
      />
      <Drawer.Screen
        name="My Profile"
        component={AccountDetails}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="My Squad"
        component={TrackOrder}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="truck" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Cart"
        component={ShoppingCart}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="shopping-cart" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="sign-out-alt" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
