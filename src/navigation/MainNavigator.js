import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { ContextProvider } from "../global/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

import AuthStack from "./AuthStack";
import i18n from "../utils/i18n";
import colors from "../utils/Theme";
import useFonts from "../utils/useFonts";

const MainNavigator = () => {
  const { user, setToken, setUser, setSelectedLanguage } =
    useContext(ContextProvider);
  const [loading, setLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("washwell-token");
        const user = await AsyncStorage.getItem("washwell-user");
        const lang = await AsyncStorage.getItem("washwell-lang");
        const language = lang ? JSON.parse(lang) : "en";
        i18n.changeLanguage(language);
        setSelectedLanguage(language);
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

  if (loading || !fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <SafeAreaView style={{ flex: 1 }}>
        {user ? <MainStack /> : <AuthStack />}
      </SafeAreaView>
      <Toast style={{ width: "100%" }} />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default MainNavigator;
