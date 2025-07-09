import { StyleSheet, View, TextInput } from "react-native";
import colors, { externalStyles } from "../utils/Theme";
import { horizantGap } from "../utils/Constant";
import logo from "../../assets/images/global/logo.svg";
import Img from "../components/ui/Img";
import { vw } from "../utils/ScreenSize";
import RNText from "../components/ui/RNText";
import { MaterialIcons } from "@expo/vector-icons";
import RNView from "../components/ui/RNView";
import Button from "../components/ui/Button";
import Header from "../components/global/Header";

const Password = () => {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Img source={logo} width={60 * vw} height={70} />
      </View>

      <RNText
        color="primary"
        fontWeight="bold"
        style={[externalStyles.txtXl, { marginTop: 30 }]}
      >
        Forgot Password?
      </RNText>

      <RNText>No worries,We'll send you reset instructions</RNText>

      <RNView style={styles.inputContainer}>
        <MaterialIcons
          name="email"
          size={20}
          color="#2e2e2e"
          style={styles.icon}
        />
        <TextInput placeholder={"Enter your Email"} style={{ flex: 1 }} />
      </RNView>

      <Button title={"Reset password"} variant="gradient" />

      <Header title="Back To Login" style={styles.link}/>
    </View>
  );
};

export default Password;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: horizantGap,
    gap: 20,
    alignItems: "center",
    paddingTop:"15%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
 
});
