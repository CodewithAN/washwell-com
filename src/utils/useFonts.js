import * as Font from "expo-font";

export default useFonts = async () =>
  await Font.loadAsync({
    "Outfit-Bold": require("../../assets/fonts/Outfit-Bold.ttf"),
    "Outfit-Medium": require("../../assets/fonts/Outfit-Medium.ttf"),
    "Outfit-Regular": require("../../assets/fonts/Outfit-Regular.ttf"),
    "Outfit-SemiBold": require("../../assets/fonts/Outfit-SemiBold.ttf"),
    "Outfit-ExtraBold": require("../../assets/fonts/Outfit-ExtraBold.ttf"),
  });
