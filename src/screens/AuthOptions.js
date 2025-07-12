import { StyleSheet, TouchableOpacity, View, TextInput } from "react-native";
import { externalStyles } from "../utils/Theme";
import { horizantGap, primaryHeight } from "../utils/Constant";
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
import React, { useState, useRef, useEffect } from "react";
import Toast from "react-native-toast-message";
import * as Yup from "yup";
import axios from "axios";

const phoneSchema = Yup.object().shape({
  phone_number: Yup.string()
    .matches(/^(05\d{7})$/, "Phone number must start with 05 and be 9 digits")
    .required("Phone number is required"),
});

const AuthOptions = ({ navigation }) => {
  const [formData, setFormData] = useState({
    phone_number: "",
  });
  const [useNativeInput, setUseNativeInput] = useState(false);
  const phoneInputRef = useRef(formData.phone_number);

  useEffect(() => {
    console.log("formData updated:", formData);
  }, [formData]);

  const handleChange = (name, value) => {
    console.log("Raw onChangeText Event:", value);
    console.log("Raw Event Type:", typeof value);
    console.log("Raw Event Characters:", JSON.stringify(value));
    console.log("Raw Event Bytes:", new TextEncoder().encode(value));
    const cleanedValue = String(value)
      .replace(/[^\x30-\x39]/g, "")
      .slice(0, 9);
    const newFormData = { ...formData, [name]: cleanedValue };
    setFormData(newFormData);
    phoneInputRef.current = cleanedValue;
    console.log("Cleaned Input:", cleanedValue);
    console.log("Updated formData:", newFormData);
    console.log("Phone Input (ref):", phoneInputRef.current);
    console.log("Input Type:", typeof cleanedValue);
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting formData:", formData);
      console.log("Phone Input (ref):", phoneInputRef.current);
      console.log("Validation Input:", formData.phone_number);
      console.log("Validation Input Type:", typeof formData.phone_number);
      console.log("Validation Input Length:", formData.phone_number.length);
      console.log("Validation Input Characters:", JSON.stringify(formData.phone_number));
      console.log("Validation Input Bytes:", new TextEncoder().encode(formData.phone_number));
      const isValid = /^(05\d{7})$/.test(formData.phone_number);
      console.log("Pre-validation Regex Test:", isValid);
      await phoneSchema.validate(formData, { abortEarly: false });

      const payload = { phone_number: `+971${formData.phone_number}` };
      console.log("API Payload:", payload);

      const response = await axios.post(
        "https://stagging.washwell.ae/api/login-with-phone",
        payload
      );
      console.log("API Success:", response.data);

      Toast.show({
        type: "success",
        text1: "OTP Sent",
        text2: "Please check your phone for the OTP.",
      });

      // Pass phone number to verification screen
      navigation.navigate("verification", { phone_number: `+971${formData.phone_number}` });
      console.log("API Response:", response.data);
    } catch (error) {
      console.log("Error:", error);
      console.log("Error Details:", error.message, error.errors);
      console.log("API Error Response:", error?.response?.data);
      if (error.name === "ValidationError") {
        Toast.show({
          type: "error",
          text1: "Validation Error",
          text2: error.errors.join(", "),
        });
      } else {
        const errorMessages = error.response?.data?.errors
          ? Object.entries(error.response.data.errors)
              .map(([key, messages]) => `${key}: ${messages.join(", ")}`)
              .join("; ")
          : error.response?.data?.message || "Something went wrong";
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: errorMessages,
        });
        // If "User not found", still navigate to verification to request OTP
        if (error.response?.data?.message === "User not found with this phone number") {
          navigation.navigate("verification", { phone_number: `+971${formData.phone_number}` });
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
              <Img source={uaeFlag} height={22} width={22} />
              <RNText style={externalStyles.txtSm}>+971</RNText>
            </RNView>
            <View style={styles.input}>
              {useNativeInput ? (
                <TextInput
                  value={formData.phone_number}
                  onChangeText={(text) => handleChange("phone_number", text)}
                  placeholder="Mobile Number"
                  keyboardType="numeric"
                  maxLength={9}
                  style={styles.nativeInput}
                />
              ) : (
                <RNTextInput
                  value={formData.phone_number}
                  onChangeText={(text) => handleChange("phone_number", text)}
                  placeholder="Mobile Number"
                  keyboardType="numeric"
                  maxLength={9}
                />
              )}
            </View>
          </View>
          <Button onPress={handleSubmit} title="Log in" />
          <TouchableOpacity onPress={() => setUseNativeInput(!useNativeInput)}>
            <RNText>Toggle Input: {useNativeInput ? "Native" : "RNTextInput"}</RNText>
          </TouchableOpacity>
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
            <Button
              variant="white"
              source={apple}
              title="Log in with Apple"
            />
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
  nativeInput: {
    height: primaryHeight,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});