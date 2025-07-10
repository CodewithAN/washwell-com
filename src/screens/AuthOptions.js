import { StyleSheet, TouchableOpacity, View } from "react-native";
import { externalStyles } from "../utils/Theme";
import { horizantGap, primaryHeight } from "../utils/Constant";
import Img from "../components/ui/Img";
import logo from "../../assets/images/global/logo.svg";
import { vw } from "../utils/ScreenSize";
import email from "../../assets/icons/email.svg";
import apple from "../../assets/icons/apple.svg";
import google from "../../assets/icons/google.svg";
import search from "../../assets/icons/search.svg";
import uaeFlag from "../../assets/images/flags/uae-flag.svg";
import RNTextInput from "../components/ui/RNTextInput";
import Button from "../components/ui/Button";
import RNView from "../components/ui/RNView";
import RNText from "../components/ui/RNText";
import Divider from "../components/auth/Divider";
import AuthLayout from "../Layouts/AuthLayout";

const AuthOptions = ({ navigation }) => {
  return (
    <AuthLayout>
      <View style={styles.mainContainer}>
        <Img source={logo} width={60 * vw} height={70} />
        <View style={styles.container}>
          <View style={styles.mobileNumberContainer}>
            <RNView style={styles.flagContainer}>
              <Img source={uaeFlag} height={22} width={22} />
              <RNText style={externalStyles.txtSm}>+971</RNText>
            </RNView>
            <View style={styles.input}>
              <RNTextInput placeholder={"Mobile Number"} />
            </View>
          </View>
          <Button
            onPress={() => navigation.navigate("verification")}
            title={"Log in"}
          />
          <Divider />
          <View style={styles.buttonContainer}>
            <Button
              variant="white"
              source={google}
              title={"Log in with Google"}
            />
            <Button
              onPress={() => navigation.navigate("login")}
              variant="white"
              source={email}
              title={"Log in with Email"}
            />
            <Button
              variant="white"
              source={apple}
              title={"Log in with Apple"}
            />
          </View>
          <Divider />
          <TouchableOpacity activeOpacity={0.7} style={styles.findAccount}>
            <Img source={search} height={15} width={15} />
            <RNText fontWeight="medium">Find my account</RNText>
          </TouchableOpacity>
        </View>
        <View style={styles.donotHaveAccount}>
          <RNText>Don't have an account?</RNText>
          <TouchableOpacity
            onPress={() => navigation.navigate("sign-up")}
            activeOpacity={0.7}
          >
            <RNText fontWeight="medium" color="primary">
              Sign Up
            </RNText>
          </TouchableOpacity>
        </View>
      </View>
    </AuthLayout>
  );
};

export default AuthOptions;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: horizantGap,
    gap: 15,
    marginTop: -20,
  },
  container: {
    gap: 20,
    width: "100%",
    marginTop: 15,
  },
  mobileNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  flagContainer: {
    height: primaryHeight,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  input: {
    flex: 1,
  },
  buttonContainer: {
    gap: 10,
  },
  findAccount: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  donotHaveAccount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 7,
  },
});
