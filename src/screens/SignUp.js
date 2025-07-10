import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import colors, { externalStyles } from "../utils/Theme";
import logo from "../../assets/images/global/logo.svg";
import Img from "../components/ui/Img";
import { vw } from "../utils/ScreenSize";
import { horizantGap, primaryHeight } from "../utils/Constant";
import Button from "../components/ui/Button";
import email from "../../assets/icons/email.svg";
import apple from "../../assets/icons/apple.svg";
import google from "../../assets/icons/google.svg";
import check from "../../assets/icons/Check.svg";
import uaeFlag from "../../assets/images/flags/uae-flag.svg";
import Divider from "../components/auth/Divider";
import RNTextInput from "../components/ui/RNTextInput";
import RNView from "../components/ui/RNView";
import RNText from "../components/ui/RNText";

const SignUp = ({ navigation }) => {
  return (
    <ScrollView style={styles.layoutContainer}>
      <View style={styles.mainContainer}>
        <View>
          <Img source={logo} width={60 * vw} height={70} />
        </View>

        <View style={styles.container}>
          {/* Social Buttons */}
          <View style={styles.buttonContainer}>
            <Button
              source={google}
              variant="white"
              title={"Sign up with Google"}
            />
            <Button
              source={email}
              variant="white"
              onPress={() => navigation.navigate("login")}
              title={"Log in with Email"}
            />
            <Button
              source={apple}
              variant="white"
              title={"Log in with Apple"}
            />
          </View>

          <Divider />

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <RNTextInput placeholder={"Name"} />
            <RNTextInput placeholder={"Email"} />
            <RNTextInput placeholder={"Referal Code"} />
            <RNTextInput placeholder={"Password"} />
            <RNTextInput placeholder={"Confirm Password"} />

            <View style={styles.mobileNumberContainer}>
              <RNView style={styles.flagContainer}>
                <Img source={uaeFlag} width={22} height={22} />
                <RNText style={externalStyles.txtSm}>+971</RNText>
              </RNView>
              <View style={styles.input}>
                <RNTextInput placeholder={"Mobile Number"} />
              </View>
            </View>
          </View>

          {/* Terms and Conditions */}
          <View style={styles.checkContainer}>
            <Img source={check} width={18} height={18} />
            <RNText>I agree to the Terms and Privacy Policy.</RNText>
          </View>

          {/* Sign up */}
          <Button
            onPress={() => navigation.navigate("enable")}
            title={"Sign up"}
            variant="gradient"
          />

          {/* have account */}
          <View style={styles.haveAccount}>
            <RNText>have an account?</RNText>
            <TouchableOpacity
              onPress={() => navigation.navigate("login")}
              activeOpacity={0.7}
            >
              <RNText fontWeight="medium" color="primary">
                Log in
              </RNText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  layoutContainer: { flex: 1 },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: horizantGap,
    gap: 15,
  },
  container: {
    gap: 20,
    width: "100%",
    marginTop: 15,
  },
  buttonContainer: {
    gap: 10,
  },
  inputContainer: {
    gap: 10,
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
    gap: "5",
  },
  input: {
    flex: 1,
  },
  checkContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  haveAccount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    margin: "auto",
    paddingBottom: 50,
  },
});
