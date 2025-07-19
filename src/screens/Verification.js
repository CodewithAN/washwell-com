import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import colors, { externalStyles } from "../utils/Theme";
import {
  horizantGap,
  primarBorderRadius,
  API_URL,
} from "../utils/Constant";
import Header from "../components/global/Header";
import Img from "../components/ui/Img";
import logo from "../../assets/images/global/logo.svg";
import { vw } from "../utils/ScreenSize";
import RNText from "../components/ui/RNText";
import Button from "../components/ui/Button";
import { useState, useContext, useRef, useEffect } from "react";
import Toast from "react-native-toast-message";
import * as Yup from "yup";
import axios from "axios";
import { ContextProvider } from "../global/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const otpSchema = Yup.object().shape({
  code: Yup.string()
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
    .required("OTP is required"),
});

const Verification = ({ navigation }) => {
  const { phoneNumber, setUser, setToken } = useContext(ContextProvider);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError("");

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === "Backspace") {
      const newOtp = [...otp];
      if (newOtp[index] !== "") {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const getOtpCode = () => otp.join("");

  useEffect(() => {
    const code = getOtpCode();
    if (code.length === 6 && /^\d{6}$/.test(code)) {
      handleVerify();
    }
  }, [otp]);

  const handleVerify = async () => {
    const code = getOtpCode();
    try {
      setLoading(true);
      await otpSchema.validate({ code }, { abortEarly: false });

      if (!phoneNumber) throw new Error("Phone number is missing");

      const response = await axios.post(`${API_URL}/verify-otp`, {
        phone_number: phoneNumber,
        code,
      });

      const data = response?.data?.data;
      const user = data?.user;
      const token = data?.token;

      setUser(user);
      setToken(token);

      await AsyncStorage.setItem("washwell-token", JSON.stringify(token));
      await AsyncStorage.setItem("washwell-user", JSON.stringify(user));

      Toast.show({
        type: "success",
        text1: "Logged In Successfully",
      });
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";

      if (error.name === "ValidationError") {
        setError(error.errors[0]);
        Toast.show({
          type: "error",
          text1: "Validation Error",
          text2: error.errors[0],
        });
      } else {
        setError(message);
        Toast.show({
          type: "error",
          text1: "Verification Failed",
          text2: message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      if (!phoneNumber) throw new Error("Phone number is missing");

      await axios.post(`${API_URL}/send-otp`, { phone_number: phoneNumber });

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "OTP sent successfully!",
      });
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to send OTP";

      Toast.show({
        type: "error",
        text1: "Send OTP Failed",
        text2: message,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
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
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(index, value)}
                  onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
                  keyboardType="number-pad"
                  maxLength={1}
                  style={[styles.input, error && styles.errorBorder]}
                  returnKeyType={index < 5 ? "next" : "done"}
                  autoFocus={index === 0}
                />
              ))}
            </View>

            {error ? <RNText style={styles.error}>{error}</RNText> : null}

            <Button
              onPress={handleVerify}
              title="Confirm"
              variant="gradient"
              loading={loading}
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
      </ScrollView>
    </KeyboardAvoidingView>
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
    paddingBottom: 50, // Ensure content is not cut off
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
    gap: 5,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    alignSelf: "center",
  },
  recieveOTP: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
  },
  haveAccount: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingBottom: 20,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },
  errorBorder: {
    borderColor: "red",
    borderWidth: 1,
  },
  input: {
    backgroundColor: colors.white,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: primarBorderRadius,
    textAlign: "center",
    fontSize: 18,
    width: 45,
  },
});