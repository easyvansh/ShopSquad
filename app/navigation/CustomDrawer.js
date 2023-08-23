import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { selectUserRef } from "../store/userSlice";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../store/apiSlice";
import { ActivityIndicator } from "react-native";

const { height, width } = Dimensions.get("window");
const CustomDrawer = (props) => {
  const id = useSelector(selectUserRef);
  const { data, error, isLoading } = useGetUserQuery(id);
  var user = "User Name";
  if (id) {
    if (isLoading) {
      return <ActivityIndicator />;
    }

    if (error) {
      return <Text>{error.error}</Text>;
    }
    user = data.data.customer.name;
  }
  var userName;
  if (user.length > 10) {
    userName = user.substring(0, 10);
    userName += ".";
  } else {
    userName = user;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/bg.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={styles.drawerContainer}
        >
          <View
            style={{ flexDirection: "row", marginTop: -200, marginBottom: 20 }}
          >
            <Image
              source={require("./assets/user.png")}
              style={styles.userImage}
            />
            <Text style={styles.userName}>{userName}</Text>
          </View>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </ImageBackground>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    marginTop: -50,
    justifyContent: "flex-start",
    height: "120%",
  },
  drawerContainer: {
    backgroundColor: "rgba(255,255,255,1)",
    height: "85%",
    marginTop: 80,
    justifyContent: "center",
    position: "relative",
    width: "90%",
    borderBottomRightRadius: 24,
    borderTopRightRadius: 24,
  },
  userImage: {
    height: width * 0.18,
    width: width * 0.18,
    position: "relative",
    marginLeft: 20,
    borderRadius: 24,
  },
  userName: {
    justifyContent: "center",
    alignSelf: "center",
    marginLeft: 20,
    color: "rgba(56, 199, 130, 1)",
    fontSize: 20,
    fontWeight: "bold",
  },
});
