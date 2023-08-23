import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config";
import { useDispatch, useSelector } from "react-redux";
import { userSlice, selectUserRef } from "../../store/userSlice";

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log("User successfully signed in!");
      console.log(email);
      console.log(password);
      console.log(user.uid);

      navigation.replace("Home");
    } catch (error) {
      console.error("Sign-in error:", error.code, error.message);
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/wrong-password"
      ) {
        setError("Your email or password was incorrect");
      } else if (error.code === "auth/email-already-in-use") {
        setError("An account with this email already exists");
      } else if (error.code === "auth/user-not-found") {
        setError("User not found");
      } else {
        setError("There was a problem with your request");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>LOGIN</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCompleteType="email"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        placeholderTextColor="#aaa"
        style={styles.input}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.signInButton}
        onPress={loginUser}
        disabled={!email || !password}
      >
        <Text style={styles.signInText}>Log In</Text>
      </TouchableOpacity>

      <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.link}>FORGOT PASSWORD?</Text>
      </Pressable>

      <Text style={styles.orText}>or</Text>

      <View style={styles.socialButtonsContainer}>
        <Image
          source={require("./facebook_logo.png")}
          style={styles.socialLogo}
        />
        <Image
          source={require("./google_logo.png")}
          style={styles.socialLogo}
        />
      </View>

      <Text>Don't have an account?</Text>
      <Pressable
        style={styles.signUpButton}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.signUpText}>Sign Up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor:'white',
  },
  heading: {
    fontWeight: "500",
    color: "rgba(0, 0, 0, 0.75)",
    marginBottom: 20,
    fontSize: 24,
    letterSpacing: 2,
    lineHeight: 28,
    marginVertical: 10,
  },
  input: {
    width: "95%",
    height: 50,
    borderColor: "rgba(0, 0, 0, 0)",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 15,
    marginVertical: 10,
    elevation: 5,
    backgroundColor: "white",
  },
  signInButton: {
    backgroundColor: "rgba(111, 202, 186, 1)",
    height: 50,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    elevation: 7,
    marginVertical: 15,
  },
  signUpButton: {
    backgroundColor: "rgba(111, 202, 186, 1)",
    height: 40,
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    elevation: 5,
    marginVertical: 15,
  },
  signInText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    letterSpacing: 0.25,
    lineHeight: 28,
  },
  signUpText: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 2,
    lineHeight: 28,
    color: "white",
  },
  orText: {
    color: "black",
    marginBottom: 10,
    fontWeight: "bold",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  socialLogo: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 28,
  },
  link: {
    color: "blue",
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 28,
  },
});

export default Login;
