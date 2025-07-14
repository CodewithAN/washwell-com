import { StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "../utils/Theme";
import logo from "../../assets/images/global/logo.svg";
import Img from "../components/ui/Img";
import { vw } from "../utils/ScreenSize";
import RNTextInput from "../components/ui/RNTextInput";
import { API_URL, horizantGap } from "../utils/Constant";
import RNText from "../components/ui/RNText";
import Button from "../components/ui/Button";
import React, { useState } from "react";
import Toast from "react-native-toast-message";
import * as Yup from "yup";
import axios from "axios";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = ({ navigation }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value.trim() }));
    setErrors((prev) => ({ ...prev, [name]: "" })); 
  };

  const handleLogin = async () => {
    try {
      await loginSchema.validate(formData, { abortEarly: false });
      const response = await axios.post(`${API_URL}/login`, formData);

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Welcome back! Login successful.",
      });

      navigation.navigate("enable");
    } catch (error) {
      if (error.name === "ValidationError") {
        const newErrors = { email: "", password: "" };
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
        const newErrors = { email: "", password: "" };
        Object.entries(backendErrors).forEach(([key, messages]) => {
          newErrors[key] = messages.join(", ");
        });
        setErrors(newErrors);
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: error.response?.data?.message || "Invalid credentials",
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Img source={logo} width={60 * vw} height={70} />
      </View>
      <View style={styles.inputContainer}>
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
            placeholder="Password"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => handleChange("password", text)}
          />
          {errors.password && <RNText style={styles.error}>{errors.password}</RNText>}
        </View>
        <TouchableOpacity style={styles.forgetButton} activeOpacity={0.7}>
          <RNText color="primary">Forget Password?</RNText>
        </TouchableOpacity>
        <Button
          onPress={handleLogin}
          style={styles.btn}
          title="Login"
          variant="gradient"
        />
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
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: horizantGap,
    gap: 25,
  },
  inputContainer: {
    width: "100%",
    gap: 10,
  },
  forgetButton: {
    marginLeft: "auto",
  },
  btn: {
    marginTop: 5,
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