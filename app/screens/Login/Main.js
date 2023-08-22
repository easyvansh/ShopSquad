import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./config";
import { AppStack } from "../../navigation/AppStack";
import { Pressable } from "react-native";

function Main({ navigation }) {
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.replace("Login"); // Redirect to login screen if not logged in
      }
    });
    return () => unsubscribe();
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{
          fontSize: 24,
          color: "grey",
          fontWeight: "500",
          letterSpacing: 0.25,
          lineHeight: 28,
        }}
      >
        You Are Logged In
      </Text>
      <Pressable
        style={{
          backgroundColor: "rgba(111, 202, 186, 1)",
          height: 50,
          width: 200,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          elevation: 7,
          marginVertical: 5,
        }}
        onPress={() => navigation.navigate("Home")}
      >
        <Text
          style={{
            fontSize: 24,
            color: "white",
            fontWeight: "bold",
            letterSpacing: 0.25,
            lineHeight: 28,
          }}
        >
          Continue
        </Text>
      </Pressable>
      <Pressable
        style={{
          backgroundColor: "rgba(111, 202, 186, 1)",
          height: 50,
          width: 200,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          elevation: 7,
          marginVertical: 5,
        }}
        onPress={logout}
      >
        <Text
          style={{
            fontSize: 24,
            color: "white",
            fontWeight: "bold",
            letterSpacing: 0.25,
            lineHeight: 28,
          }}
        >
          Logout
        </Text>
      </Pressable>
    </View>
  );
}
export default Main;
