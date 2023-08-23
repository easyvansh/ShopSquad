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
import SquadCard from "./SquadCard";

const { width } = Dimensions.get("window");
function ViewProduct({ route }) {
  const navigation = useNavigation();
  console.log(route.order.id)
  return (
    <>
      {/* Image Carousel */}
      <FlatList
        data={route.order}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 2,alignItems:'flex-start' }}>
            <Text style = {styles.title}>Hosting</Text>
            <Text style = {styles.title}>Participating</Text>
            <Text style = {styles.title}>Completed</Text>
            <Pressable
              onPress={() => {
                // dispatch(productsSlice.actions.setSelectedProduct(item.id));
                navigation.navigate("Product Details", { id: item.id });
              }}
              style={styles.itemContainer}
            >

             <SquadCard item={item.product} />
            </Pressable>
            <Text style={styles.price}>{item.product.name}</Text>
            {/* Price */}
            <Text style={styles.price}>Cost of Product $ {item.product.price}</Text>
            <Text style={styles.description}>Quantity - {item.quantity} </Text>
            <Text style = {[ styles.description  ,{paddingBottom: 50,marginVertical: 10,}]}>Status - Order On It's Way</Text>
          </View>
        )}
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
    fontSize: 18,
    lineHeight: 30,
    fontWeight: "300",
 
  },
});
export default ViewProduct;
