import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors, { externalStyles } from "../utils/Theme";
import logo from "../../assets/images/global/logo.png";
import Img from "../components/ui/Img";
import { vw } from "../utils/ScreenSize";
import { horizantGap, primaryHeight, API_URL } from "../utils/Constant";
import Button from "../components/ui/Button";
import email from "../../assets/icons/email.svg";
import apple from "../../assets/icons/apple.svg";
import google from "../../assets/icons/google.svg";
import uaeFlag from "../../assets/images/flags/uae-flag.svg";
import Divider from "../components/auth/Divider";
import RNTextInput from "../components/ui/RNTextInput";
import RNView from "../components/ui/RNView";
import RNText from "../components/ui/RNText";
import React, { useState, useContext, useRef } from "react";
import Toast from "react-native-toast-message";
import * as Yup from "yup";
import axios from "axios";
import { ContextProvider } from "../global/Context";

const registerSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
  phone_number: Yup.string().required("Phone number is required"),
  referred_by: Yup.string().trim().optional(),
  termsAccepted: Yup.boolean().oneOf(
    [true],
    "You must accept the Terms and Privacy Policy"
  ),
});

const SignUp = ({ navigation }) => {
  const { setPhoneNumber } = useContext(ContextProvider);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    referred_by: "",
    phone_number: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const scrollViewRef = useRef(null);
  const inputLayouts = useRef({});

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone_number" ? value : value.trim(),
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCheckboxToggle = () => {
    setFormData((prev) => ({
      ...prev,
      termsAccepted: !prev.termsAccepted,
    }));
    setErrors((prev) => ({ ...prev, termsAccepted: "" }));
  };

  const handleFocus = (field) => {
    setTimeout(() => {
      const layout = inputLayouts.current[field];
      if (layout && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: layout.y - 80, animated: true });
      }
    }, 100);
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      await registerSchema.validate(formData, { abortEarly: false });
      await axios.post(`${API_URL}/register`, formData);
      setPhoneNumber(formData.phone_number);

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Welcome! Please Verify OTP.",
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
        const backendErrors = error.response?.data?.errors || {};
        const newErrors = {};
        Object.entries(backendErrors).forEach(([key, messages]) => {
          newErrors[key] = messages.join(", ");
        });
        setErrors(newErrors);
        Toast.show({
          type: "error",
          text1: "Registration Failed",
          text2: error.response?.data?.message || "Something went wrong",
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
        style={styles.layoutContainer}
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
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
              {[
                { name: "name", placeholder: "Name" },
                {
                  name: "email",
                  placeholder: "Email",
                  keyboardType: "email-address",
                },
                { name: "referred_by", placeholder: "Referral Code" },
                { name: "password", placeholder: "Password", secure: true },
                {
                  name: "password_confirmation",
                  placeholder: "Confirm Password",
                  secure: true,
                },
              ].map(({ name, placeholder, keyboardType, secure }) => (
                <View
                  key={name}
                  onLayout={(e) => {
                    inputLayouts.current[name] = e.nativeEvent.layout;
                  }}
                >
                  <RNTextInput
                    placeholder={placeholder}
                    value={formData[name]}
                    onChangeText={(text) => handleChange(name, text)}
                    keyboardType={keyboardType}
                    secure={secure}
                    onFocus={() => handleFocus(name)}
                    style={[styles.input, errors[name] && styles.errorBorder]}
                  />
                  {errors[name] && (
                    <RNText style={styles.error}>{errors[name]}</RNText>
                  )}
                </View>
              ))}

              <View
                onLayout={(e) => {
                  inputLayouts.current["phone_number"] = e.nativeEvent.layout;
                }}
              >
                <View style={styles.mobileNumberContainer}>
                  <RNView style={styles.flagContainer}>
                    <Img source={uaeFlag} width={22} height={22} />
                    <RNText style={externalStyles.txtSm}>+971</RNText>
                  </RNView>
                  <RNTextInput
                    placeholder="Mobile Number"
                    keyboardType="phone-pad"
                    value={formData.phone_number}
                    onChangeText={(text) => handleChange("phone_number", text)}
                    maxLength={14}
                    onFocus={() => handleFocus("phone_number")}
                    style={[
                      styles.input,
                      errors.phone_number && styles.errorBorder,
                    ]}
                  />
                </View>
                {errors.phone_number && (
                  <RNText style={styles.error}>{errors.phone_number}</RNText>
                )}
              </View>
            </View>

            <TouchableOpacity
              style={styles.checkContainer}
              onPress={handleCheckboxToggle}
            >
              <MaterialIcons
                name={
                  formData.termsAccepted
                    ? "check-box"
                    : "check-box-outline-blank"
                }
                size={18}
                color={colors.primary}
              />
              <RNText>I agree to the Terms and Privacy Policy.</RNText>
            </TouchableOpacity>
            {errors.termsAccepted && (
              <RNText style={styles.error}>{errors.termsAccepted}</RNText>
            )}

            <Button
              onPress={handleRegister}
              title="Sign up"
              variant="gradient"
              loading={loading}
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
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  layoutContainer: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: horizantGap,
    gap: 15,
    paddingTop: 25,
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
    borderWidth: 0,
  },
  checkContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  haveAccount: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingBottom: 50,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  errorBorder: {
    borderColor: "red",
    borderWidth: 1,
  },
});
