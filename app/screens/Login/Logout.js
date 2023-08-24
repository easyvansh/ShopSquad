import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./config";
import { AppStack } from "../../navigation/AppStack";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import BgEllipse from "./bgEllipse";

const { height, width } = Dimensions.get("window");
function Logout({ navigation }) {
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
      <BgEllipse />
      <Text style={{ fontSize: 24,fontWeight:"600", color: "white", padding: 12 }}>
        Are You Sure You Want to Logout?
      </Text>
     <Pressable
      style={[styles.rectangleButton,{width: width * 0.6,
        height: height * 0.09,}]}
      onPress={logout}
    >
      <Text style={styles.signUp}>Log Out</Text>
    </Pressable>
        
    </View>
  );
}


const styles = StyleSheet.create({
  rectangleButton: {
    padding: 0.5,
    opacity: 1,
    backgroundColor: "rgba(255, 255, 255, 1)",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: width / 2,
    borderTopRightRadius: width / 2,
    borderBottomLeftRadius: width / 2,
    borderBottomRightRadius: width / 2,
    shadowColor: "black",
    shadowOpacity: 0.9,
    shadowRadius: 0,
    elevation: 2,
  },
  signUp: {
    opacity: 1,
    color: "rgba(56, 199, 130, 1)",
    position: "relative",
    fontSize: 20,
    fontWeight: "900",
    fontStyle: "normal",
  },
})
export default Logout;
