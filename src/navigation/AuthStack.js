import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthOptions from "../screens/AuthOptions";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Verification from "../screens/Verification";
import Password from "../screens/Password";
import Otp from "../screens/Otp";
import Reset from "../screens/Reset";


const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="login"
  >
    <Stack.Screen name="auth-options" component={AuthOptions} />
    <Stack.Screen name="login" component={Login} />
    <Stack.Screen name="sign-up" component={SignUp} />
    <Stack.Screen name="verification" component={Verification} />
    <Stack.Screen name="password" component={Password} />
    <Stack.Screen name="otp" component={Otp} />
    <Stack.Screen name="reset" component={Reset} />
    
  </Stack.Navigator>
);

export default AuthStack;
