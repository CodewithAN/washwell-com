import { StyleSheet, TouchableOpacity, View } from "react-native";
import { externalStyles } from "../utils/Theme";
import { API_URL, horizantGap, primaryHeight } from "../utils/Constant";
import Img from "../components/ui/Img";
import logo from "../../assets/images/global/logo.svg";
import { vw } from "../utils/ScreenSize";
import email from "../../assets/icons/email.svg";
import apple from "../../assets/icons/apple.svg";
import google from "../../assets/icons/google.svg";
import search from "../../assets/icons/search.svg";
import uaeFlag from "../../assets/images/flags/uae-flag.svg";
import RNTextInput from "../components/ui/RNTextInput";
import Button from "../components/ui/Button";
import RNView from "../components/ui/RNView";
import RNText from "../components/ui/RNText";
import Divider from "../components/auth/Divider";
import AuthLayout from "../Layouts/AuthLayout";
import React, { useState, useContext } from "react";
import Toast from "react-native-toast-message";
import * as Yup from "yup";
import axios from "axios";
import { ContextProvider } from "../global/Context";

const phoneSchema = Yup.object().shape({
  phone_number: Yup.string()
    .matches(/^\+\d{4,14}$/, "Phone number must start with + and have 4-14 digits")
    .required("Phone number is required"),
});

const AuthOptions = ({ navigation }) => {
  const { setPhoneNumber } = useContext(ContextProvider);
  const [formData, setFormData] = useState({ phone_number: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    const cleanedValue = String(value).replace(/[^\+\d]/g, "").slice(0, 14);
    setFormData({ ...formData, [name]: cleanedValue });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async () => {
    try {
      await phoneSchema.validate(formData, { abortEarly: false });
      const payload = { phone_number: formData.phone_number };
      await axios.post(`${API_URL}/login-with-phone`, payload);

      setPhoneNumber(formData.phone_number);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "OTP sent to your phone.",
      });

      navigation.navigate("verification");
    } catch (error) {
      if (error.name === "ValidationError") {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
        Toast.show({
          type: "error",
          text1: "Validation Error",
          text2: error.inner.map((err) => err.message).join(", "),
        });
      } else {
        const newErrors = {};
        const backendErrors = error.response?.data?.errors || {};
        Object.entries(backendErrors).forEach(([key, messages]) => {
          newErrors[key] = messages.join(", ");
        });
        setErrors(newErrors);
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: error.response?.data?.message || "Something went wrong",
        });
        if (error.response?.data?.message === "User not found with this phone number") {
          setPhoneNumber(formData.phone_number);
          navigation.navigate("verification");
        }
      }
    }
  };

  return (
    <AuthLayout>
      <View style={styles.mainContainer}>
        <Img source={logo} width={60 * vw} height={70} />
        <View style={styles.container}>
          <View style={styles.mobileNumberContainer}>
            <RNView style={styles.flagContainer}>
              <Img source={uaeFlag} width={22} height={22} />
              <RNText style={externalStyles.txtSm}>+971</RNText>
            </RNView>
            <View style={styles.input}>
              <RNTextInput
                placeholder="Mobile Number "
                keyboardType="phone-pad"
                value={formData.phone_number}
                onChangeText={(text) => handleChange("phone_number", text)}
                maxLength={14}
              />
              {errors.phone_number && <RNText style={styles.error}>{errors.phone_number}</RNText>}
            </View>
          </View>
          <Button onPress={handleSubmit} title="Log in" />

          <Divider />
          <View style={styles.buttonContainer}>
            <Button
              variant="white"
              source={google}
              title="Log in with Google"
            />
            <Button
              onPress={() => navigation.navigate("login")}
              variant="white"
              source={email}
              title="Log in with Email"
            />
            <Button variant="white" source={apple} title="Log in with Apple" />
          </View>
          <Divider />
          <TouchableOpacity activeOpacity={0.7} style={styles.findAccount}>
            <Img source={search} height={15} width={15} />
            <RNText fontWeight="medium">Find my account</RNText>
          </TouchableOpacity>
        </View>
        <View style={styles.donotHaveAccount}>
          <RNText>Don't have an account?</RNText>
          <TouchableOpacity
            onPress={() => navigation.navigate("sign-up")}
            activeOpacity={0.7}
          >
            <RNText fontWeight="medium" color="primary">
              Sign Up
            </RNText>
          </TouchableOpacity>
        </View>
      </View>
    </AuthLayout>
  );
};

export default AuthOptions;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: horizantGap,
    gap: 15,
    marginTop: -20,
  },
  container: {
    gap: 20,
    width: "100%",
    marginTop: 15,
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
    gap: 5,
  },
  input: {
    flex: 1,
  },
  buttonContainer: {
    gap: 10,
  },
  findAccount: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  donotHaveAccount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 7,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});