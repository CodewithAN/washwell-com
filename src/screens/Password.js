import { StyleSheet, View, TouchableOpacity } from "react-native";
import colors, { externalStyles } from "../utils/Theme";
import { horizantGap, API_URL } from "../utils/Constant";
import logo from "../../assets/images/global/logo.svg";
import Img from "../components/ui/Img";
import { vw } from "../utils/ScreenSize";
import RNText from "../components/ui/RNText";
import Button from "../components/ui/Button";
import RNTextInput from "../components/ui/RNTextInput";
import { useState, useContext } from "react";
import Toast from "react-native-toast-message";
import * as Yup from "yup";
import axios from "axios";
import { ContextProvider } from "../global/Context";

const forgotPasswordSchema = Yup.object().shape({
  phone_number: Yup.string()
    .trim()
    .matches(/^\+?\d{10,15}$/, "Invalid phone number")
    .required("Phone number is required"),
});

const Password = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setPhoneNumber: setContextPhoneNumber } = useContext(ContextProvider);

  const handleResetPassword = async () => {
    try {
      setLoading(true);

      await forgotPasswordSchema.validate(
        { phone_number: phoneNumber },
        { abortEarly: false }
      );

      await axios.post(`${API_URL}/forgot-password`, {
        phone_number: phoneNumber,
      });

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Password reset instructions sent to your phone.",
      });

      setContextPhoneNumber(phoneNumber);
      setPhoneNumber("");
      setTimeout(() => navigation.navigate("otp"), 0);
    } catch (error) {
      if (error.name === "ValidationError") {
        setError(error.inner[0].message);
        Toast.show({
          type: "error",
          text1: "Validation Error",
          text2: error.inner[0].message,
        });
      } else {
        const errorMessage =
          error.response?.data?.message || "Something went wrong";
        setError(errorMessage);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: errorMessage,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Img source={logo} width={60 * vw} height={70} />

      <RNText color="primary" fontWeight="medium" style={externalStyles.txtXl}>
        Forgot Password?
      </RNText>

      <RNText>No worries, we'll send you reset instructions</RNText>

      <View style={styles.inputWrapper}>
        <RNTextInput
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={(text) => {
            setPhoneNumber(text.trim());
            setError("");
          }}
          keyboardType="phone-pad"
          style={[styles.input, error && styles.errorBorder]}
        />
        {error && <RNText style={styles.error}>{error}</RNText>}
      </View>

      <Button
        title="Reset Password"
        variant="gradient"
        onPress={handleResetPassword}
        loading={loading}
      />

      <TouchableOpacity onPress={() => navigation.navigate("login")}>
        <RNText
          color="primary"
          fontWeight="medium"
          style={[styles.link, externalStyles.txtBase]}
        >
          Back To Login
        </RNText>
      </TouchableOpacity>
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
    justifyContent: "center",
  },
  inputWrapper: {
    width: "100%",
  },
  input: {
    borderWidth: 0,
    height: 50,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  errorBorder: {
    borderColor: "red",
    borderWidth: 1,
  },
  link: {
    marginTop: 10,
    textDecorationLine: "underline",
  },
});
