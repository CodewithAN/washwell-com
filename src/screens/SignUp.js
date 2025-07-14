
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
import React, { useState, useContext } from "react";
import Toast from "react-native-toast-message";
import * as Yup from "yup";
import axios from "axios";
import { API_URL } from "../utils/Constant";
import { ContextProvider } from "../global/Context";

const registerSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
  email: Yup.string().trim().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
  phone_number: Yup.string()
    .matches(/^\+\d{4,14}$/, "Phone number must start with + and have 4-14 digits")
    .required("Phone number is required"),
  referred_by: Yup.string().trim().optional(),
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
  });
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: name === "phone_number" ? value : value.trim() }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleRegister = async () => {
    try {
      await registerSchema.validate(formData, { abortEarly: false });
      await axios.post(`${API_URL}/register`, formData);

      setPhoneNumber(formData.phone_number);

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Welcome! Registration completed.",
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
          text1: "Registration Failed",
          text2: error.response?.data?.message || "Something went wrong",
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
            <View>
              <RNTextInput
                placeholder="Name"
                value={formData.name}
                onChangeText={(text) => handleChange("name", text)}
              />
              {errors.name && <RNText style={styles.error}>{errors.name}</RNText>}
            </View>
            <View>
              <RNTextInput
                placeholder="Email"
                value={formData.email}
                onChangeText={(text) => handleChange("email", text)}
                keyboardType="email-address"
              />
              {errors.email && <RNText style={styles.error}>{errors.email}</RNText>}
            </View>
            <View>
              <RNTextInput
                placeholder="Referral Code"
                value={formData.referred_by}
                onChangeText={(text) => handleChange("referred_by", text)}
              />
              {errors.referred_by && <RNText style={styles.error}>{errors.referred_by}</RNText>}
            </View>
            <View>
              <RNTextInput
                placeholder="Password"
                secureTextEntry
                value={formData.password}
                onChangeText={(text) => handleChange("password", text)}
              />
              {errors.password && <RNText style={styles.error}>{errors.password}</RNText>}
            </View>
            <View>
              <RNTextInput
                placeholder="Confirm Password"
                secureTextEntry
                value={formData.password_confirmation}
                onChangeText={(text) => handleChange("password_confirmation", text)}
              />
              {errors.password_confirmation && (
                <RNText style={styles.error}>{errors.password_confirmation}</RNText>
              )}
            </View>
            <View>
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
                </View>
              </View>
              {errors.phone_number && <RNText style={styles.error}>{errors.phone_number}</RNText>}
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
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
