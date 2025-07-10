import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import colors, { externalStyles } from "../utils/Theme";
import { horizantGap } from "../utils/Constant";
import Header from "../components/global/Header";
import Img from "../components/ui/Img";
import logo from "../../assets/images/global/logo.svg";
import { vw } from "../utils/ScreenSize";
import RNText from "../components/ui/RNText";
import RNTextInput from "../components/ui/RNTextInput";
import Button from "../components/ui/Button";

const Verification = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <Header />
      <View>
        <Img source={logo} width={60 * vw} height={70} />
      </View>
      <View style={styles.container}>
        <RNText
          color="primary"
          fontWeight="medium"
          style={[externalStyles.txtLg, styles.otpText]}
        >
          Enter OTP
        </RNText>
        <RNText style={styles.plainText}>
          Please enter OTP sent to +91 8800850641
        </RNText>

        <View style={styles.inputContainer}>
          <RNTextInput />
          <RNTextInput />
          <RNTextInput />
          <RNTextInput />
        </View>

        <Button
          onPress={() => navigation.navigate("enable")}
          title={"Confirm"}
          variant="gradient"
        />

        <View style={styles.recieveOTP}>
          <RNText>Did not receive OTP? </RNText>
          <TouchableOpacity activeOpacity={0.7}>
            <RNText fontWeight="medium" color="primary">
              Resend OTP
            </RNText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Move haveAccount to the bottom */}
      <View style={styles.haveAccount}>
        <RNText>Have an account?</RNText>
        <TouchableOpacity activeOpacity={0.7}>
          <RNText fontWeight="medium" color="primary">
            {" "}
            Log in
          </RNText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Verification;

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
    // margin: "auto",
    textAlign: "center",
  },
  plainText: {
    //margin: "auto",
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
  recieveOTP: {
    flexDirection: "row",
    alignItems: "center",
    margin: "auto",
    gap: 1,
  },
  haveAccount: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: "20%",
    width: "100%",
    justifyContent: "center",
    gap: 5,
  },
});
