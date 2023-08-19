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
  cartSlice
} from "../store/cartSlice";
import { useCreateOrderMutation,useCreatePaymentIntentMutation } from "../store/apiSlice";
import { Alert } from "react-native";
import { ActivityIndicator } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";

const { width } = Dimensions.get("window");

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
        <Text style={styles.text}>{Math.round(subtotal*100)/100}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Delivery</Text>
        <Text style={styles.text}>$ {deliveryFee}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textBold}>Total</Text>
        <Text style={styles.textBold}>$ {Math.round(total*100)/100}</Text>
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
  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const onCheckout = async () => {
    // 1. Create a payment intent
    const response = await createPaymentIntent({
		  amount: Math.floor(total * 100),
		});
		console.log(response);
		if (response.error) {
		  Alert.alert('Something went wrong', response.error);
		  return;
		}
   
    // 2. Initialize the Payment sheet
    const { error: paymentSheetError } = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
		  paymentIntentClientSecret: response.data.paymentIntent,
		  defaultBillingDetails: {
        name: 'Jane Doe',
		  },
		});
		if (paymentSheetError) {
      Alert.alert('Something went wrong', paymentSheetError.message);
		  return;
		}
    // 3. Present the Payment Sheet from Stripe
    console.log("here")
    const { error: paymentError } = await presentPaymentSheet();
    if (paymentError) {
      Alert.alert(`Error code: ${paymentError.code}`, paymentError.message);
      return;
    }
    // 4. If payment ok -> create the order
    onCreateOrder();
  };

  const onCreateOrder = async () => {
    const result = await createOrder({
      order: cartItems,
      subtotal,
      deliveryFee,
      total,
      customer: {
        name: "Vansh",
        address: "Home",
        email: "vansh@email.com",
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
  if (cartItems.length == 0){
    return(
      <>
      <View style = {{alignItems:"center",justifyContent: "center",flex:1}}>
        <Text style = {{fontSize :20,color:"grey"}}>
          Cart is Empty.
        </Text>
      </View>
      </>
    )
  }
  else{
  // if(!cartItems){
  return (
    <>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListFooterComponent={ShoppingCartTotals}
      />
      <Pressable onPress={onCheckout} style={styles.button}>
        <Text style={styles.buttonText}>CheckOut</Text>
        {isLoading && <ActivityIndicator/>}
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
    position: "absolute",
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
