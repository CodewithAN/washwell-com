import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors, { externalStyles } from "../utils/Theme";
import logo from "../../assets/images/global/logo.svg";
import Img from "../components/ui/Img";
import { vw } from "../utils/ScreenSize";
import RNTextInput from "../components/ui/RNTextInput";
import { horizantGap } from "../utils/Constant";
import RNText from "../components/ui/RNText";
import Button from "../components/ui/Button";

const Login = () => {
  return (
    <View style={styles.conainer}>
      <View>
        <Img source={logo} width={60 * vw} height={70} />
      </View>
      <View style={styles.inputContainer}>
        <RNTextInput placeholder={"Email"} />
        <RNTextInput placeholder={"Password"} />
        <TouchableOpacity style={styles.forgetButton} activeOpacity={0.7}>
          <RNText color={"primary"}>Forget Password?</RNText>
        </TouchableOpacity>
        <Button style={styles.btn} title={"Login"} variant="gradient" />
      </View>
      <View style={styles.donotHaveAccount}>
        <RNText>Don't have an account?</RNText>
        <TouchableOpacity activeOpacity={0.7}>
          <RNText fontWeight="semiBold" color="primary">
            Sign Up
          </RNText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  conainer: {
    backgroundColor: colors.background,
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: horizantGap,
    gap: 25,
  },
  inputContainer: {
    width: "100%",
    gap: 10,
  },
  forgetButton: {
    marginLeft: "auto",
  },
  btn: {
    marginTop: 5,
  },
  donotHaveAccount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 7,
  },
});
