import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthOptions from "../screens/AuthOptions";

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="auth-options"
  >
    <Stack.Screen name="auth-options" component={AuthOptions} />
  </Stack.Navigator>
);

export default AuthStack;
