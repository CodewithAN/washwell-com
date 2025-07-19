import { StyleSheet, View } from "react-native";
import logo from "../../assets/images/global/logo.svg";
import Img from "../components/ui/Img";
import { vw } from "../utils/ScreenSize";
import colors, { externalStyles } from "../utils/Theme";
import { horizantGap } from "../utils/Constant";
import RNTextInput from "../components/ui/RNTextInput";
import Button from "../components/ui/Button";
import RNText from "../components/ui/RNText";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { axiosInstance } from "../utils/Api";
import Header from "../components/global/Header";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [oldPasswordError, setOldPasswordError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordMismatchError, setPasswordMismatchError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    setOldPasswordError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setPasswordMismatchError("");

    let hasError = false;

    if (!oldPassword) {
      setOldPasswordError("Old password is required");
      hasError = true;
    }

    if (!password) {
      setPasswordError("New password is required");
      hasError = true;
    }

    if (!passwordConfirmation) {
      setConfirmPasswordError("Please confirm your new password");
      hasError = true;
    }

    if (password && passwordConfirmation && password !== passwordConfirmation) {
      setPasswordMismatchError("Passwords do not match");
      hasError = true;
    }

    if (hasError) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please correct the errors below",
      });
      return;
    }

    setLoading(true);
    try {
      const instance = await axiosInstance();
      await instance.post("/change-password", {
        old_password: oldPassword,
        password,
        password_confirmation: passwordConfirmation,
      });

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Password changed successfully",
      });

      setOldPassword("");
      setPassword("");
      setPasswordConfirmation("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to change password";

      if (
        errorMessage.toLowerCase().includes("old password is incorrect") ||
        errorMessage.toLowerCase().includes("old password incorrect")
      ) {
        setOldPasswordError("Old password is incorrect");
      } else {
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
    <View style={styles.container}>
     
    
        <Header space title="Change Password" />
   

      <View style={styles.inputContainer}>
        <View>
          <RNTextInput
            placeholder="Old Password"
            secure
            value={oldPassword}
            onChangeText={(text) => {
              setOldPassword(text);
              setOldPasswordError("");
            }}
            style={[styles.input, oldPasswordError && styles.errorBorder]}
          />
          {oldPasswordError && (
            <RNText style={styles.error}>{oldPasswordError}</RNText>
          )}
        </View>

        <View>
          <RNTextInput
            placeholder="New Password"
            secure
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError("");
              setPasswordMismatchError("");
            }}
            style={[styles.input, passwordError && styles.errorBorder]}
          />
          {passwordError && (
            <RNText style={styles.error}>{passwordError}</RNText>
          )}
        </View>

        <View>
          <RNTextInput
            placeholder="Confirm Password"
            secure
            value={passwordConfirmation}
            onChangeText={(text) => {
              setPasswordConfirmation(text);
              setConfirmPasswordError("");
              setPasswordMismatchError("");
            }}
            style={[
              styles.input,
              (confirmPasswordError || passwordMismatchError) &&
                styles.errorBorder,
            ]}
          />
          {confirmPasswordError && (
            <RNText style={styles.error}>{confirmPasswordError}</RNText>
          )}
          {passwordMismatchError && (
            <RNText style={styles.error}>{passwordMismatchError}</RNText>
          )}
        </View>
      </View>

      <Button
        title="Change Password"
        variant="gradient"
        onPress={handleChangePassword}
        loading={loading}
      />
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: horizantGap,
    gap: 25,
  },
  inputContainer: {
    width: "100%",
    gap: 10,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 0,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
    alignSelf: "flex-start",
  },
  errorBorder: {
    borderColor: "red",
    borderWidth: 1,
  },
});