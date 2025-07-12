import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import colors, { externalStyles } from "../utils/Theme";
import logo from "../../assets/images/global/logo.svg";
import Img from "../components/ui/Img";
import { vw } from "../utils/ScreenSize";
import { horizantGap, primaryHeight } from "../utils/Constant";
import Button from "../components/ui/Button";
import email from "../../assets/icons/email.svg";
import apple from "../../assets/icons/apple.svg";
import google from "../../assets/icons/google.svg";
import check from "../../assets/icons/Check.svg";
import uaeFlag from "../../assets/images/flags/uae-flag.svg";
import Divider from "../components/auth/Divider";
import RNTextInput from "../components/ui/RNTextInput";
import RNView from "../components/ui/RNView";
import RNText from "../components/ui/RNText";
import React, { useState, useRef } from "react";
import Toast from "react-native-toast-message";
import * as Yup from "yup";
import axios from "axios";

const registerSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
  email: Yup.string().trim().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
  phone_number: Yup.string()
    .matches(/^(05\d{7})$/, "Phone number must start with 05 and be 9 digits")
    .required("Phone number is required"),
  referred_by: Yup.string().trim().optional(),
});

const SignUp = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    referred_by: "",
    phone_number: "",
  });
  const phoneInputRef = useRef(formData.phone_number);

  const handleChange = (name, value) => {
    const cleanedValue = name === "phone_number" ? value.replace(/[^\x30-\x39]/g, "").slice(0, 9) : value.trim();
    setFormData((prev) => {
      const newFormData = { ...prev, [name]: cleanedValue };
      if (name === "phone_number") {
        phoneInputRef.current = cleanedValue;
      }
      console.log("Field:", name, "Value:", cleanedValue);
      console.log("Updated formData:", newFormData);
      return newFormData;
    });
  };

  const handleRegister = async () => {
    try {
      console.log("Submitting formData:", formData);
      console.log("Phone Input (ref):", phoneInputRef.current);
      await registerSchema.validate(formData, { abortEarly: false });

      const payload = {
        ...formData,
        phone_number: `+971${formData.phone_number}`,
      };
      console.log("Register Payload:", payload);

      const response = await axios.post(
        "https://stagging.washwell.ae/api/register",
        payload
      );

      Toast.show({
        type: "success",
        text1: "Registration Successful",
        text2: "Welcome to Washwell!",
      });

      navigation.navigate("enable");
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
          text1: "Registration Failed",
          text2: errorMessages,
        });
      }
    }
  };

  return (
    <ScrollView style={styles.layoutContainer}>
      <View style={styles.mainContainer}>
        <Img source={logo} width={60 * vw} height={70} />
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <Button
              source={google}
              variant="white"
              title="Sign up with Google"
            />
            <Button
              source={email}
              variant="white"
              onPress={() => navigation.navigate("login")}
              title="Log in with Email"
            />
            <Button
              source={apple}
              variant="white"
              title="Log in with Apple"
            />
          </View>
          <Divider />
          <View style={styles.inputContainer}>
            <RNTextInput
              placeholder="Name"
              value={formData.name}
              onChangeText={(text) => handleChange("name", text)}
            />
            <RNTextInput
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => handleChange("email", text)}
              keyboardType="email-address"
            />
            <RNTextInput
              placeholder="Referral Code"
              value={formData.referred_by}
              onChangeText={(text) => handleChange("referred_by", text)}
            />
            <RNTextInput
              placeholder="Password"
              secureTextEntry
              value={formData.password}
              onChangeText={(text) => handleChange("password", text)}
            />
            <RNTextInput
              placeholder="Confirm Password"
              secureTextEntry
              value={formData.password_confirmation}
              onChangeText={(text) => handleChange("password_confirmation", text)}
            />
            <View style={styles.mobileNumberContainer}>
              <RNView style={styles.flagContainer}>
                <Img source={uaeFlag} width={22} height={22} />
                <RNText style={externalStyles.txtSm}>+971</RNText>
              </RNView>
              <View style={styles.input}>
                <RNTextInput
                  placeholder="Mobile Number"
                  keyboardType="numeric"
                  value={formData.phone_number}
                  onChangeText={(text) => handleChange("phone_number", text)}
                  maxLength={9}
                />
              </View>
            </View>
          </View>
          <View style={styles.checkContainer}>
            <Img source={check} width={18} height={18} />
            <RNText>I agree to the Terms and Privacy Policy.</RNText>
          </View>
          <Button
            onPress={handleRegister}
            title="Sign up"
            variant="gradient"
          />
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
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  layoutContainer: { flex: 1 },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: horizantGap,
    gap: 15,
  },
  container: {
    gap: 20,
    width: "100%",
    marginTop: 15,
  },
  buttonContainer: {
    gap: 10,
  },
  inputContainer: {
    gap: 10,
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
  checkContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  haveAccount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingBottom: 50,
  },
});