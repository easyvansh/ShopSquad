import { StyleSheet, Pressable, Text, View, Image } from "react-native";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useGetBannersQuery, useGetProductsQuery } from "../store/apiSlice";
import { ActivityIndicator } from "react-native";
import BannerHeader from "../components/BannerHeader";
import SquadCard from "../components/SquadCard";
import { ScrollView } from "react-native-gesture-handler";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./Login/config";
import { userSlice } from "../store/userSlice";
import SearchBar from "../components/SearchBar";
import { Dimensions } from "react-native";
import { useCreateCartMutation } from "../store/apiSlice";

const { height, width } = Dimensions.get("window");
export default function HomePage() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // Query To Get All the Product in the Database
  const { data, error, isLoading } = useGetProductsQuery();
  if (isLoading) {
    return (
      <View style={{ justifyContent: "center", flex: 1, padding: 10 }}>
        <ActivityIndicator
          color="rgba(111, 202, 186, 1)"
          size="large"
          style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
        />
      </View>
    );
  }
  if (error) {
    return <Text>{error.error}</Text>;
  }

  // Get the Current User if logged in
  const user = auth.currentUser;

    
  if (user) {
    // redux logic to save user id
    dispatch(
      userSlice.actions.addUserItem({
        userRef: user.uid,
      })
    );
    console.log("Cart created")
    
  }

  // retrieving products from the query request
  const products = data.data;

  return (
    <ScrollView style={styles.container}>
      <SearchBar />
      <BannerHeader />
      <Text style={{ marginLeft: 15, fontSize: 20, fontWeight: "600" }}>
        Active Squad
      </Text>
      <View style={styles.flatListContainer}>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                navigation.navigate("Product Details", { id: item.id });
              }}
              style={styles.itemContainer}
            >
              <SquadCard item={item} />
            </Pressable>
          )}
          keyExtractor={(item, index) => item.id + "-" + index}
          numColumns={2}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(255,255,255)",
    paddingTop: width * 0.12,
  },
  flatListContainer: {
    paddingBottom: width * 0.15,
  },
  image: {
    aspectRatio: 1,
  },
  itemContainer: {
    width: "50%",
    padding: 3,
  },
});
