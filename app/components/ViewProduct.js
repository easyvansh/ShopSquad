import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  FlatList,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { cartSlice } from "../store/cartSlice";
import { useGetProductQuery } from "../store/apiSlice";
import { ActivityIndicator } from "react-native";

const { width } = Dimensions.get("window");
function ViewProduct({ route }) {
  // const id = route.order[0].id;
  // console.log(data)
  // // products.push(product);
  // if (isLoading) {
  //   return <ActivityIndicator />;
  // }

  // if (error) {
  //   return <Text>{error.error}</Text>;
  // }
  // const { data, error, isLoading } = useGetProductQuery(id);
  // const product = useSelector((state) => state.products.selectedProduct);

  return (
    <>
      {/* Image Carousel */}
      <FlatList
        data={route.order}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 20 }}>
            <Image
              source={{ uri: item.product.image }}
              style={{ width, aspectRatio: 1, resizeMode: "cover" }}
            />
            {/* Title */}
            <Text style={styles.title}>{item.product.name}</Text>
            {/* Price */}
            <Text style={styles.price}>$ {item.product.price}</Text>
          </View>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "500",
    marginVertical: 10,
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
});
export default ViewProduct;
