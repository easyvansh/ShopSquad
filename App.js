import { store } from "./app/store";
import AppNavigator from "./Navigator";
import { Provider } from "react-redux";
import STRIPE_JSON from "./assets/stripe.json"
import { StripeProvider } from '@stripe/stripe-react-native';
export default function App() {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPE_JSON.STRIPE_KEY}>
      <AppNavigator />
      </StripeProvider>
    </Provider>
  );
}
