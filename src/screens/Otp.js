import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import colors, { externalStyles } from "../utils/Theme";
import { horizantGap, API_URL, primarBorderRadius } from "../utils/Constant";
import Header from "../components/global/Header";
import Img from "../components/ui/Img";
import logo from "../../assets/images/global/logo.png";
import { vw } from "../utils/ScreenSize";
import RNText from "../components/ui/RNText";
import RNTextInput from "../components/ui/RNTextInput";
import Button from "../components/ui/Button";
import { useState, useRef, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { ContextProvider } from "../global/Context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Yup from "yup";

const otpSchema = Yup.object().shape({
  code: Yup.string()
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
    .required("OTP is required"),
});

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigation = useNavigation();
  const { phoneNumber, setUser, setToken } = useContext(ContextProvider);

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
                  onChangeText={(value) => handleOtpChange(index, value)}
                  onKeyPress={({ nativeEvent }) =>
                    handleKeyPress(index, nativeEvent.key)
                  }
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  style={[styles.otpInput, error && styles.errorBorder]}
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                  autoFocus={index === 0}
                />
              ))}
            </View>

            {error ? <RNText style={styles.error}>{error}</RNText> : null}

            <Button
              title="Verify"
              variant="gradient"
              onPress={handleVerify}
              loading={loading}
            />
          </View>
        </View>
        <Toast />
      </ScrollView>
    </KeyboardAvoidingView>
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
    paddingBottom: 50,
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    alignSelf: "center",
    width: "100%",
  },
  otpInput: {
    backgroundColor: colors.white,
    borderRadius: primarBorderRadius,
    paddingHorizontal: 18,
    paddingVertical: 10,
    textAlign: "center",
    fontSize: 18,
    width: 45,
    borderWidth: 0,
  },
  errorBorder: {
    borderColor: "red",
    borderWidth: 1,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },
});
