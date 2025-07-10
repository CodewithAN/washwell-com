import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import colors from "./src/utils/Theme";
import Context from "./src/global/Context";
import MainNavigator from "./src/navigation/MainNavigator";
import { I18nextProvider } from "react-i18next";
import i18n from "./src/utils/i18n";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={"dark-content"}
        translucent={false}
      />
      <Context>
        <I18nextProvider i18n={i18n}>
          <MainNavigator />
        </I18nextProvider>
      </Context>
    </SafeAreaView>
  );
}
