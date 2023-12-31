import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import React from "react";
import { FlatList } from "react-native";
import CartListItem from "../components/CartListItem";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDeliveryPrice,
  selectSubtotal,
  selectTotal,
  selectNumberOfItems,
  cartSlice,
} from "../store/cartSlice";
import {
  useCreateOrderMutation,
  useCreatePaymentIntentMutation,
  useGetUserQuery,
} from "../store/apiSlice";
import { Alert } from "react-native";
import { ActivityIndicator } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import { selectUserRef } from "../store/userSlice";
import { useNavigation } from "@react-navigation/native";
import BgEllipse from "./Login/bgEllipse";

const { height,width } = Dimensions.get("window");

const ShoppingCartTotals = () => {
  const subtotal = useSelector(selectSubtotal);
  const deliveryFee = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);
  const numberOfItems = useSelector(selectNumberOfItems);
  return (
    <View style={styles.totalsContainer}>
      <View style={styles.row}>
        <Text style={styles.text}>Number of Items : </Text>
        <Text style={styles.text}>{numberOfItems}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Subtotal</Text>
        <Text style={styles.text}>{Math.round(subtotal * 100) / 100}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Delivery</Text>
        <Text style={styles.text}>$ {deliveryFee}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textBold}>Total</Text>
        <Text style={styles.textBold}>$ {Math.round(total * 100) / 100}</Text>
      </View>
    </View>
  );
};

const ShoppingCart = () => {
  const subtotal = useSelector(selectSubtotal);
  const deliveryFee = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);
  const cartItems = useSelector((state) => state.cart.items);
  const [createOrder, { data, error, isLoading }] = useCreateOrderMutation();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const dispatch = useDispatch();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const userRef = useSelector(selectUserRef);
  const id = userRef;
  const userData= useGetUserQuery(id);
  const user = userData.data;
  const navigation = useNavigation();
  const onCheckout = async () => {
    customer= user.data.customer
    // 1. Create a payment intent
    const response = await createPaymentIntent({
      amount: Math.floor(total * 100),
    });
    console.log(response);
    if (response.error) {
      Alert.alert("Something went wrong", response.error);
      return;
    }
    

    const API_URL = "https://shop-squad-api.onrender.com/"
    const fetchPaymentSheetParams = async () => {
      const response = await fetch(`${API_URL}/intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { paymentIntent, ephemeralKey, customer} = await response.json();
  
      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    };

    // 2. Initialize the Payment sheet
    
    
    const { error: paymentSheetError } = await initPaymentSheet({
      
      merchantDisplayName: "ShopSquad, Inc.",
      paymentIntentClientSecret: response.data.paymentIntent,
      defaultBillingDetails: {
        name: customer.name,
        email: customer.email,
      },
    });
    if (paymentSheetError) {
      Alert.alert("Something went wrong", paymentSheetError.message);
      return;
    }
    // 3. Present the Payment Sheet from Stripe
    const { error: paymentError } = await presentPaymentSheet();
    if (paymentError) {
      Alert.alert(`Error code: ${paymentError.code}`, paymentError.message);
      return;
    }
    // 4. If payment ok -> create the order
    onCreateOrder();
  };
  
  const onCreateOrder = async () => {
    customer= user.data.customer
    const result = await createOrder({
      order: cartItems,
      subtotal,
      deliveryFee,
      total,
      customer: {
        name: customer.name,
        address:customer.address,
        email: customer.email,
        uid: id,
      },
    });

    if (result.data?.status === "OK") {
      Alert.alert(
        "Order has been submitted",
        `Your order reference is: ${result.data.data.ref}`

      );
      
      console.log(
        "Order has been submitted",
        `Your order reference is: ${result.data.data.ref}`
      );
      dispatch(cartSlice.actions.clear());

    }
  };
  if (cartItems.length == 0) {
    return (
      <>
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <BgEllipse />
      <Text style={{ fontSize: 24,fontWeight:"600", color: "white", padding: 12 }}>
      Cart is Empty.
      </Text>
        </View>
      </>
    );
  }  
  else {
    // if(!cartItems){
    return (
      <>
          <BgEllipse />
        <FlatList
          data={cartItems}
          renderItem={({ item }) => <CartListItem cartItem={item} />}
          ListFooterComponent={ShoppingCartTotals}
        />
        <Pressable onPress={onCreateOrder} style={styles.button}>
          <Text style={styles.buttonText}>CheckOut</Text>
          {isLoading && <ActivityIndicator />}
        </Pressable>
      </>
    );
  }
};

const styles = StyleSheet.create({
  totalsContainer: {
    margin: 20,
    paddingTop: 20,
    borderColor: "gainsboro",
    borderTopWidth: 1,
    height: height*0.3,
    marginBottom:25,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  text: {
    fontSize: 18,
    color: "gray",
  },
  textBold: {
    fontSize: 18,
    fontWeight: "500",
  },
  button: {
    position: "relative",
    backgroundColor: "black",
    bottom: 30,
    width: width * 0.9,
    alignSelf: "center",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});
export default ShoppingCart;
