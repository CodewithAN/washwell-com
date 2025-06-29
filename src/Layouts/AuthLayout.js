import { ScrollView, StyleSheet } from "react-native";
import colors from "../utils/Theme";

const AuthLayout = ({ children }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>{children}</ScrollView>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flexGrow: 1,
    background: "blue",
  },
});
