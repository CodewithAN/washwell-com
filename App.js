import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import colors from "./src/utils/Theme";
import Context from "./src/global/Context";
import MainNavigator from "./src/navigation/MainNavigator";
import { I18nextProvider } from "react-i18next";
import i18n from "./src/utils/i18n";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
        staleTime: 1000 * 60,
        cacheTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={"dark-content"}
        translucent={false}
      />
      <Context>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n}>
            <MainNavigator />
          </I18nextProvider>
        </QueryClientProvider>
      </Context>
      <Toast />
    </SafeAreaView>
  );
}
