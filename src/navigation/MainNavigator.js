import { StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { ContextProvider } from "../global/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
// import { OneSignal, LogLevel } from "react-native-onesignal";
import AuthStack from "./AuthStack";
import i18n from "../utils/i18n";
import useFonts from "../utils/useFonts";
import MainStack from "./MainStack";

const MainNavigator = () => {
  const { user, setToken, setUser, address, setSelectedLanguage, setAddress } =
    useContext(ContextProvider);
  const [loading, setLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("washwell-token");
        const user = await AsyncStorage.getItem("washwell-user");
        const lang = await AsyncStorage.getItem("washwell-lang");
        const address = await AsyncStorage.getItem("washwell-address");
        const language = lang ? JSON.parse(lang) : "en";
        i18n.changeLanguage(language);
        setSelectedLanguage(language);
        setAddress(JSON.parse(address));
        setToken(token);
        setUser(JSON.parse(user));
      } catch (error) {
        console.error("Failed to fetch token:", error);
      } finally {
        setLoading(false);
        SplashScreen.hideAsync();
      }
      await useFonts();
      setFontsLoaded(true);
    })();
  }, []);

  // useEffect(() => {
  //   OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  //   OneSignal.initialize("174f9cc6-c406-477c-ae9a-2316e60b9634");
  //   OneSignal.Notifications.requestPermission(false);
  // }, []);

  if (loading || !fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
      <Toast style={{ width: "100%" }} />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default MainNavigator;
