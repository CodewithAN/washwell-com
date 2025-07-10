import * as Font from "expo-font";

export default useFonts = async () =>
  await Font.loadAsync({
    "Roboto-Bold": require("../../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-SemiBold": require("../../assets/fonts/Roboto-SemiBold.ttf"),
    "Roboto-ExtraBold": require("../../assets/fonts/Roboto-ExtraBold.ttf"),
  });
