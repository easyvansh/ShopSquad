import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image as ReactImage,
  Pressable,
  StyleSheet,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config";
import { useDispatch, useSelector } from "react-redux";
import { userSlice, selectUserRef } from "../../store/userSlice";
import BgEllipse from "./bgEllipse";
import Svg, {
  Defs,
  Pattern,
  Path as SvgPath,
  Text as SvgText,
  Image as SvgImage,
} from "react-native-svg";
import { Dimensions } from "react-native";
import { useCreateCartMutation } from "../../store/apiSlice";

const { height, width } = Dimensions.get("window");

function Login({ navigation }) {
  const [email, setEmail] = useState("cd@email.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState(null);
  const [createCart] = useCreateCartMutation();
  const onCreateCart = async () =>{

    const result = await createCart({
      customer: {
        uid: user.uid,
      },
    });
    if (result.data?.status === "OK") {
      Alert.alert(
        "Cart has been submitted",
        `Your order reference is: ${result.data.data.ref}`
        );
        
        console.log(
          "Order has been submitted",
          `Your order reference is: ${result.data.data.ref}`
          );
  //   dispatch(cartSlice.actions.clear());
  }
}
  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log("User successfully signed in!");
      console.log(email);
      console.log(password);
      console.log(user.uid);
      onCreateCart();

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
      <BgEllipse />
      <View style={styles.iconContainer}>
        <Svg
          style={styles.iconMaterialPerson}
          preserveAspectRatio="none"
          viewBox="6 6 50 50"
          fill="rgba(255, 255, 255, 1)"
        >
          <SvgPath d="M 31 31 C 37.90625 31 43.5 25.40625 43.5 18.5 C 43.5 11.59374809265137 37.90625 6 31 6 C 24.09374809265137 6 18.5 11.59374809265137 18.5 18.5 C 18.5 25.40625 24.09374809265137 31 31 31 Z M 31 37.25 C 22.65624809265137 37.25 6 41.4375 6 49.74999618530273 L 6 55.99999618530273 L 55.99999618530273 55.99999618530273 L 55.99999618530273 49.74999618530273 C 55.99999618530273 41.4375 39.34375 37.25 31 37.25 Z" />
        </Svg>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Email"
          autoCapitalize="none"
          style={styles.emailAddress}
          placeholderTextColor="rgba(255, 255, 255, 1)"
          underlineColorAndroid="transparent"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          autoCapitalize="none"
          placeholderTextColor="rgba(255, 255, 255, 1)"
          underlineColorAndroid="transparent"
          secureTextEntry={true}
          style={styles.password}
        />
      </View>
      <View style={[styles.buttonContainer,{width: width * 0.6,
    height: height * 0.09,}]}>
        <TouchableOpacity
          style={[styles.rectangleButton,{width: width * 0.6,
            height: height * 0.09,}]}
          onPress={loginUser}
          disabled={!email || !password}
        >
          <Text style={styles.signUp}>Log In</Text>
        </TouchableOpacity>
      {error && <Text style={styles.error}>{error}</Text>}
      <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.link}>Forgot Password?</Text>
      </Pressable> 
      </View>
      <View style={styles.signUpWithContainer}>
        <Text style={styles.signUpWith}>Sign In With</Text>
        <View style={styles.logoContainer}>
          <TouchableOpacity
            onPress={() => handleLogoPress("https://www.google.com")}
          >
            <ReactImage
              source={require("./googlelogo.png")}
              style={styles.googlelogo}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleLogoPress("https://www.facebook.com")}
          >
            <ReactImage
              source={require("./facebooklogo.png")}
              style={styles.facebooklogo}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.orSignUpWithContainer}>
        <Text style={styles.orSignUp}>Don't have an account?</Text>
        </View> 
          <Pressable
            onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.link}>Sign Up</Text>
          </Pressable>


      </View>
      <View style={styles.shopSquadLogoContainer}>
        <ReactImage
          style={styles.shopSquadLogo}
          source={require("./shopsquadlogo.png")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  iconContainer: {
    position: "relative",
    top: width * 0.1,
    marginTop: width * 0.1,
    marginBottom: 0,
  },
  iconMaterialPerson: {
    opacity: 1,
    width: width * 0.2,
    height: width * 0.2,
    shadowColor: "black",
    shadowOpacity: 0.6,
    elevation: 2,
  },
  inputContainer: {
    position: "relative",
    height: 300,
    width: 250,
    top: 0,
    marginTop: 0,
    paddingHorizontal: 18,
    justifyContent: "center",
    alignContent: "center",
  },
  emailAddress: {
    color: "rgba(255, 255, 255, 1)",
    width: "100%",
    height: height * 0.05,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginBottom: 10,
    opacity: 1,
    position: "relative",
    fontSize: 13,
    fontWeight: "500",
    fontStyle: "normal",
    textAlign: "left",
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  password: {
    color: "rgba(255, 255, 255, 1)",
    width: "100%",
    height: height * 0.05,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginBottom: 10,
    opacity: 1,
    position: "relative",
    fontSize: 13,
    fontWeight: "500",
    fontStyle: "normal",
    textAlign: "left",
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },

  buttonContainer: {
    position: "relative",
    top: -60,
    marginTop: 0,
    justifyContent: "center",
    alignItems: "center",
  },
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
  error: {
    marginBottom: 20,
    color: "red",
    marginVertical: 0,
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 28,
  },
  signUpWithContainer: {
    top:-20,
    position: "relative",
    width: width * 0.3,
    height: height * 0.12,
    marginTop: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpWith: {
    opacity: 1,
    position: "absolute",
    color: "rgba(255, 255, 255, 1)",
    fontSize: 12,
    fontWeight: "500",
    fontStyle: "normal",
    textAlign: "left",
    top: 0,
    marginTop: 0,
  },
  orSignUp: {
    opacity: 1,
    position: "absolute",
    color: "rgba(255, 255, 255, 1)",
    fontSize: 12,
    fontWeight: "500",
    fontStyle: "normal",
    textAlign: "left",
    top: 50,
    marginTop: 0,
  },
  orSignUpWithContainer: {
    position: "relative",
    width: width * 0.3,
    height: height * 0.12,
    top:10,
    marginTop: 20,
    flexDirection:"column",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    top:80,
    flexDirection: "row",
    width: width * 0.4,
    height: width * 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  googlelogo: {
    opacity: 1,
    position: "relative",
    width: width * 0.07,
    height: width * 0.07,
    marginRight: 8,
  },
  facebooklogo: {
    opacity: 1,
    position: "relative",
    width: width * 0.07,
    height: width * 0.07,
    marginLeft: 8,
  },
  shopSquadLogoContainer: {
    position: "absolute",
    height: width * 0.4,
    width: width,
    left: 0,
    bottom: 20,
  },
  shopSquadLogo: {
    height: width * 0.35,
    width: width * 0.35,
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
  link: {
    color: "white",
    marginVertical: 0,
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 28,
  },
});

export default Login;
