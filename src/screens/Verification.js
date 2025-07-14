import { StyleSheet, TouchableOpacity, View } from "react-native";
import colors, { externalStyles } from "../utils/Theme";
import { horizantGap } from "../utils/Constant";
import Header from "../components/global/Header";
import Img from "../components/ui/Img";
import logo from "../../assets/images/global/logo.svg";
import { vw } from "../utils/ScreenSize";
import RNText from "../components/ui/RNText";
import RNTextInput from "../components/ui/RNTextInput";
import Button from "../components/ui/Button";
import React, { useState, useContext } from "react";
import Toast from "react-native-toast-message";
import * as Yup from "yup";
import axios from "axios";
import { API_URL } from "../utils/Constant";
import { ContextProvider } from "../global/Context";

const otpSchema = Yup.object().shape({
  code: Yup.string()
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
    .required("OTP is required"),
});

const Verification = ({ navigation }) => {
  const { phoneNumber } = useContext(ContextProvider); 
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  
  

  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError("");
      
     
    }
  };

  const getOtpCode = () => otp.join("");

  const handleVerify = async () => {
    const code = getOtpCode();
    try {
      await otpSchema.validate({ code }, { abortEarly: false });
      if (!phoneNumber) {
        throw new Error("Phone number is missing");
      }
      await axios.post(`${API_URL}/verify-otp`, {
        phone_number: phoneNumber,
        code,
      });

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "OTP verified successfully!",
      });

      navigation.navigate("enable");
    } catch (error) {
      if (error.name === "ValidationError") {
        setError(error.errors[0]);
        Toast.show({
          type: "error",
          text1: "Validation Error",
          text2: error.errors[0],
        });
      } else {
        const message = error.message || error.response?.data?.message || "Something went wrong";
        setError(message);
        Toast.show({
          type: "error",
          text1: "Verification Failed",
          text2: message,
        });
      }
    }
  };

  const handleResendOtp = async () => {
    try {
      if (!phoneNumber) {
        throw new Error("Phone number is missing");
      }
      await axios.post(`${API_URL}/send-otp`, { phone_number: phoneNumber });

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "OTP sent successfully!",
      });
    } catch (error) {
      const message = error.message || error.response?.data?.message || "Failed to send OTP";
      Toast.show({
        type: "error",
        text1: "Send OTP Failed",
        text2: message,
      });
    }
  };

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
        <View style={styles.plainText}>
          <RNText>Please enter OTP sent to</RNText>
           <RNText>{phoneNumber || "+91 8800850641"}</RNText>
        </View>

        <View style={styles.inputContainer}>
          {otp.map((digit, index) => (
            <RNTextInput
              key={index}
              value={digit}
              onChangeText={(value) => handleOtpChange(index, value)}
              keyboardType="numeric"
              maxLength={1}
              style={{ textAlign: "center" }}
            />
          ))}
        </View>
        {error && <RNText style={styles.error}>{error}</RNText>}

        <Button
          onPress={handleVerify}
          title="Confirm"
          variant="gradient"
        />

        <View style={styles.recieveOTP}>
          <RNText>Did not receive OTP? </RNText>
          <TouchableOpacity onPress={handleResendOtp} activeOpacity={0.7}>
            <RNText fontWeight="medium" color="primary">
              Resend OTP
            </RNText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.haveAccount}>
        <RNText>Have an account?</RNText>
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
    textAlign: "center",
  },
  plainText: {
     flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap:5,
   
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
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },
});