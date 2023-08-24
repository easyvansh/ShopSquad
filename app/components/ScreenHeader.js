import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { Pressable } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import {FontAwesome5} from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

const ScreenHeader = (props) => {
  const {item} = props;
  const navigation = useNavigation();
  return (
    <View
      style={{
        paddingTop: width * 0.125,
        backgroundColor: "rgb(255,255,255)",
      }}
    >
      <View style={styles.container}>
      <Pressable  onPress={() => {
          navigation.toggleDrawer();
        }}>
        <FontAwesome5 name="chevron-left" color={"rgba(169, 169, 169, 1)"} size={28} />
    </Pressable>
    <View style = {{justifyContent:"center"}}>

      <Text style={styles.screenHeading}>
      {item}
      </Text>
    </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: width,
    height: height * 0.08,
    paddingHorizontal: width*0.1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  screenHeading:{
    backgroundColor: "rgba(255, 255, 255,0)",
    color: "rgba(169, 169, 169, 1)",
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft:-12,
    padding: 0,
    width:width*0.8,
  },
  
});
export default ScreenHeader;
