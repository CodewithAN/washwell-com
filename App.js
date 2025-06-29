import "react-native-gesture-handler";
import Context from "./src/global/Context";
import MainNavigator from "./src/navigation/MainNavigator";
import i18n from "./src/utils/i18n";
import { I18nextProvider } from "react-i18next";
export default function App() {
  return (
    <Context>
      <I18nextProvider i18n={i18n}>
        <MainNavigator />
      </I18nextProvider>
    </Context>
  );
}
