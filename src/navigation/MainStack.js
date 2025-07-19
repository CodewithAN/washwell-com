import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
import Wallet from "../screens/Wallet";
import Location from "../screens/Location";
import ChangePassword from "../screens/ChangePassword";
import AddAddress from "../screens/AddAddress";

const Stack = createNativeStackNavigator();

const MainStack = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="card"
  >
    <Stack.Screen name="enable" component={Enable} />
    <Stack.Screen name="choose" component={Choose} />
    <Stack.Screen name="home" component={Home} />
    <Stack.Screen name="menu" component={Menu} />
    <Stack.Screen name="order" component={Orders} />
    <Stack.Screen name="notification" component={Notifications} />
    <Stack.Screen name="detail" component={Details} />
    <Stack.Screen name="address" component={Address} />
    <Stack.Screen name="add" component={AddAddress} />
    <Stack.Screen name="cart" component={Cart} />
    <Stack.Screen name="confirm" component={Confirmation} />
    <Stack.Screen name="place-order" component={PlaceOrder} />
    <Stack.Screen name="refer" component={Reference} />
    <Stack.Screen name="payment" component={Payment} />
    <Stack.Screen name="card" component={Card} />
    <Stack.Screen name="wallet" component={Wallet} />
    <Stack.Screen name="location" component={Location} />
    <Stack.Screen name="change" component={ChangePassword} />
  </Stack.Navigator>
);

export default MainStack;
