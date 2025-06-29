import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthOptions from "../screens/AuthOptions";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="sign-up"
  >
    <Stack.Screen name="auth-options" component={AuthOptions} />
    <Stack.Screen name="login" component={Login} />
    <Stack.Screen name="sign-up" component={SignUp} />
  </Stack.Navigator>
);

export default AuthStack;
