import { StyleSheet, View } from "react-native";
import logo from "../../assets/images/global/logo.png";
import Img from "../components/ui/Img";
import { vw } from "../utils/ScreenSize";
import colors, { externalStyles } from "../utils/Theme";
import { horizantGap, API_URL } from "../utils/Constant";
import RNText from "../components/ui/RNText";
import RNTextInput from "../components/ui/RNTextInput";
import Button from "../components/ui/Button";
import { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { ContextProvider } from "../global/Context";
import axios from "axios";

const Reset = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [globalError, setGlobalError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { phoneNumber, otp, setPhoneNumber, setOtp } =
    useContext(ContextProvider);

  const handleResetPassword = async () => {
    setPasswordError("");
    setConfirmError("");
    setGlobalError("");

    if (!password || !passwordConfirmation) {
      if (!password) setPasswordError("Password is required");
      if (!passwordConfirmation) setConfirmError("Confirmation is required");

      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in both password fields",
      });
      return;
    }

    if (password !== passwordConfirmation) {
      setConfirmError("Passwords do not match");
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Passwords do not match",
      });
      return;
    }

    if (!phoneNumber || !otp) {
      setGlobalError("Session expired. Please start over.");
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Session expired. Please start over.",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/reset-password`, {
        phone_number: phoneNumber,
        password,
        password_confirmation: passwordConfirmation,
        code: otp,
      });

      setPhoneNumber(null);
      setOtp(null);

      navigation.navigate("login");

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Password reset successfully",
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to reset password";
      setGlobalError(errorMessage);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Img source={logo} width={60 * vw} height={70} />

      <RNText
        color="primary"
        fontWeight="medium"
        style={[externalStyles.txtXl, { marginTop: 30 }]}
      >
        Reset Password
      </RNText>
      <RNText>Enter and confirm your new password to reset it.</RNText>

      <View style={styles.inputWrapper}>
        <RNTextInput
          placeholder="Enter new Password"
          secure
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError("");
            setGlobalError("");
          }}
          style={[styles.input, passwordError && styles.errorBorder]}
        />
        {passwordError && <RNText style={styles.error}>{passwordError}</RNText>}
      </View>

      <View style={styles.inputWrapper}>
        <RNTextInput
          placeholder="Confirm Password"
          secure
          value={passwordConfirmation}
          onChangeText={(text) => {
            setPasswordConfirmation(text);
            setConfirmError("");
            setGlobalError("");
          }}
          style={[styles.input, confirmError && styles.errorBorder]}
        />
        {confirmError && <RNText style={styles.error}>{confirmError}</RNText>}
      </View>

      {globalError ? <RNText style={styles.error}>{globalError}</RNText> : null}

      <Button
        title="Reset Password"
        variant="gradient"
        style={{ marginTop: 30 }}
        onPress={handleResetPassword}
        loading={loading}
      />
    </View>
  );
};

export default Reset;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    paddingHorizontal: horizantGap,
    gap: 15,
    paddingTop: "15%",
  },
  inputWrapper: {
    width: "100%",
    gap: 4,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 0,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginLeft: 4,
    alignSelf: "flex-start",
  },
  errorBorder: {
    borderColor: "red",
    borderWidth: 1,
  },
});
