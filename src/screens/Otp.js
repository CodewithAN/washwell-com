import { StyleSheet, Text, View } from "react-native";
import colors, { externalStyles } from "../utils/Theme";
import { horizantGap } from "../utils/Constant";
import Header from "../components/global/Header";
import Img from "../components/ui/Img";
import logo from "../../assets/images/global/logo.svg";
import { vw } from "../utils/ScreenSize";
import RNText from "../components/ui/RNText";
import RNTextInput from "../components/ui/RNTextInput";
import Button from "../components/ui/Button";

const Otp = () => {
  return (
    <>
      <Header space />
      <View style={styles.mainContainer}>
        <View>
          <Img source={logo} width={60 * vw} height={70} />
        </View>
        <View style={styles.container}>
          <RNText
            color="primary"
            fontWeight="medium"
            style={[externalStyles.txtLg, styles.otpText]}
          >
            Verify OTP
          </RNText>
          <RNText style={styles.plainText}>
            Enter the OTP sent to your email to verify your account
          </RNText>

          <View style={styles.inputContainer}>
            <RNTextInput />
            <RNTextInput />
            <RNTextInput />
            <RNTextInput />
          </View>

          <Button title={"Verify"} variant="gradient" />
        </View>
      </View>
    </>
  );
};

export default Otp;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    paddingHorizontal: horizantGap,
    gap: 15,
  },
  container: {
    gap: 20,
    width: "100%",
    marginTop: 15,
  },
  otpText: {
    textAlign: "center",
  },
  plainText: {
    textAlign: "center",
  },
  inputContainer: {
    width: "12.8%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    alignSelf: "center",
  },
});
