import { StyleSheet, View, TextInput } from "react-native";
import colors, { externalStyles } from "../utils/Theme";
import { horizantGap, API_URL, primarBorderRadius } from "../utils/Constant";
import Header from "../components/global/Header";
import Img from "../components/ui/Img";
import logo from "../../assets/images/global/logo.svg";
import { vw } from "../utils/ScreenSize";
import RNText from "../components/ui/RNText";
import RNTextInput from "../components/ui/RNTextInput";
import Button from "../components/ui/Button";
import { useState, useRef, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { ContextProvider } from "../global/Context";
import axios from "axios";

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigation = useNavigation();
  const { phoneNumber, setOtp: setContextOtp } = useContext(ContextProvider);

 
  console.log("Phone Number from Context:", phoneNumber);

  const handleInputChange = (text, index) => {
    if (text.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    
    if (text && index < 5) {
      inputRefs.current[index + 1].focus();
    }

   
    if (index === 5 && text && newOtp.every((digit) => digit !== "")) {
      verifyOtp(newOtp.join(""));
    }
  };

  const handleKeyPress = (e, index) => {
   
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const verifyOtp = async (otpCode) => {
    if (!phoneNumber) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Phone number not found",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/verify-otp`, {
        phone_number: phoneNumber,
        code: otpCode,
      });

      setContextOtp(otpCode);

    
      navigation.navigate("reset");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response?.data?.message || "Failed to verify OTP",
      });
    } finally {
      setLoading(false);
    }
  };

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
            Enter the OTP sent to your phone number
          </RNText>

          <View style={styles.inputContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                value={digit}
                onChangeText={(text) => handleInputChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={styles.otpInput}
                keyboardType="numeric"
                maxLength={1}
                textAlign="center"
              />
            ))}
          </View>

          <Button
            title="Verify"
            variant="gradient"
            onPress={() => {
              if (otp.every((digit) => digit !== "")) {
                verifyOtp(otp.join(""));
              } else {
                Toast.show({
                  type: "error",
                  text1: "Error",
                  text2: "Please enter all 6 digits",
                });
              }
            }}
            loading={loading}
          />
        </View>
      </View>
      <Toast />
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
  otpInput: {
    backgroundColor: colors.white,
    borderRadius: primarBorderRadius,
    paddingHorizontal: 18,
  },
});