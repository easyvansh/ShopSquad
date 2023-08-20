import {
  StyleSheet,
  Pressable,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import { FlatList } from "react-native";
import { productsSlice } from "../store/productsSlice";
import { useGetBannersQuery, useGetProductsQuery } from "../store/apiSlice";
import { ActivityIndicator } from "react-native";
import { useState } from "react";
import { useRef } from "react";

const { height, width } = Dimensions.get("window");

export default function BannerHeader() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { data, error, isLoading } = useGetBannersQuery();
  const slidesRef = useRef(null);
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>{error.error}</Text>;
  }
  const banners = data.data;
  return (
    <View styles={styles.container}>
      <FlatList
        data={banners.images}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator ={false}
        bounces={false}
        // onScroll={Animated.event(
        //   [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        //   {
        //     useNativeDriver: false,
        //   }
        // )}
        // scrollEventThrottle={32}
        // ref={slidesRef}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  image: {
    width: width,
    aspectRatio: 2.25,
    resizeMode: "cover",
    width: width,
    height: height * 0.15,
    padding: 5,
    marginVertical:height * 0.025,
  },
});
