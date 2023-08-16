import { store } from "./app/store";
import AppNavigator from "./Navigator";
import { Provider } from "react-redux";

import { StripeProvider } from '@stripe/stripe-react-native';
const STRIPE_KEY = "pk_test_51NNG3sSD9H14jkBF3CAefgfVpfgHMkMJJF0yhApZECMYB0lenATEHSbsRXLTbwf1DVCKXxpHFMiA7WzXAb18m0ga000jKlHilr"
export default function App() {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPE_KEY}>

      <AppNavigator />
      </StripeProvider>
    </Provider>
  );
}
