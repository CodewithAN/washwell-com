import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthOptions from "../screens/AuthOptions";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Verification from "../screens/Verification";
import Enable from "../screens/Enable";
import Choose from "../screens/Choose";
import Home from "../screens/Home";
import Menu from "../screens/Menu";
import Orders from "../screens/Orders";
import Notifications from "../screens/Notifications";
import Details from "../screens/Details";
import Address from "../screens/Address";
import Cart from "../screens/Cart";
import Confirmation from "../screens/Confirmation";
import PlaceOrder from "../screens/PlaceOrder";
import Reference from "../screens/Reference";
import Payment from "../screens/Payment";
import Card from "../screens/Card";



const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="payment"
  >
    <Stack.Screen name="auth-options" component={AuthOptions} />
    <Stack.Screen name="login" component={Login} />
    <Stack.Screen name="sign-up" component={SignUp} />
    <Stack.Screen name="verification" component={Verification} />
    <Stack.Screen name="enable" component={Enable} />
    <Stack.Screen name="choose" component={Choose} />
    <Stack.Screen name="home" component={Home} />
    <Stack.Screen name="menu" component={Menu} />
    <Stack.Screen name="order" component={Orders} />
    <Stack.Screen name="notification" component={Notifications} />
    <Stack.Screen name="detail" component={Details} />
    <Stack.Screen name="address" component={Address} />
    <Stack.Screen name="cart" component={Cart} />
    <Stack.Screen name="confirm" component={Confirmation} />
    <Stack.Screen name="place-order" component={PlaceOrder} />
    <Stack.Screen name="refer" component={Reference} />
    <Stack.Screen name="payment" component={Payment} />
    <Stack.Screen name="card" component={Card} />
    
  </Stack.Navigator>
);

export default AuthStack;
