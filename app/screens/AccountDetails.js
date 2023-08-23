import { StyleSheet, View, Dimensions, Text, Pressable, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { selectUserRef, userSlice } from "../store/userSlice";
import { useGetUserQuery } from "../store/apiSlice";
import { ActivityIndicator } from "react-native";
import { auth } from "./Login/config";

const { width } = Dimensions.get("window");

const AccountDetails = () => {

  const userRef = useSelector(selectUserRef);
  console.log(userRef);
  const id = userRef;
  const { data, error, isLoading } = useGetUserQuery(id);

  const navigation = useNavigation();

  if (id) {
    if (isLoading) {
      return <ActivityIndicator />;
    }

    if (error) {
      return <Text>{error.error}</Text>;
    }

    const user = data.data;
    console.log(user)
    const userName = user.user.split('@')[0];
    return (
      <View>
        <View style={{ padding: 20,flexDirection:"row",backgroundColor:"rgba(56, 199, 130, 1)" }}>
          {/* Title */}
          <Image
              source={require("../navigation/assets/user.png")}
              style={styles.userImage}
            />
          <Text style={styles.title}>{userName}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <View style={{ padding: 20 }}>
          {/* Title */}
          <Text style={styles.title}>User Not Logged In</Text>
          <Pressable
            style={styles.signInButton}
            onPress={()=> navigation.replace("Login")}
          >
            <Text style={styles.signInText}>Click To Log In</Text>
          </Pressable>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "800",
    marginVertical: 10,
    color: "white",
  },
  price: {
    fontWeight: "500",
    fontSize: 18,
    letterSpacing: 2,
  },
  description: {
    marginVertical: 10,
    fontSize: 18,
    lineHeight: 30,
    fontWeight: "300",
    paddingBottom: 80,
  },
  button: {
    position: "absolute",
    backgroundColor: "black",
    bottom: 30,
    width: width * 0.9,
    alignSelf: "center",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
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
  signInText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    letterSpacing: 0.25,
    lineHeight: 28,
  },
  userImage: {
    height: width * 0.18,
    width: width * 0.18,
    position: "relative",
    marginLeft: 20,
    borderRadius: 24,
    marginHorizontal:50,
  },
});

export default AccountDetails;
