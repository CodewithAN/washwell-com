import { StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "../utils/Theme";
import logo from "../../assets/images/global/logo.svg";
import Img from "../components/ui/Img";
import { vw } from "../utils/ScreenSize";
import RNTextInput from "../components/ui/RNTextInput";
import { horizantGap } from "../utils/Constant";
import RNText from "../components/ui/RNText";
import Button from "../components/ui/Button";
import React, { useState } from "react";
import Toast from "react-native-toast-message";
import * as Yup from "yup";
import axios from "axios";

const loginSchema = Yup.object().shape({
  email: Yup.string().trim().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Login = ({ navigation }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (name, value) => {
    setFormData((prev) => {
      const newFormData = { ...prev, [name]: value.trim() };
      console.log("Field:", name, "Value:", value);
      console.log("Updated formData:", newFormData);
      return newFormData;
    });
  };

  const handleLogin = async () => {
    try {
      console.log("Submitting formData:", formData);
      await loginSchema.validate(formData, { abortEarly: false });

      const response = await axios.post("https://stagging.washwell.ae/api/login", formData);

      Toast.show({
        type: "success",
        text1: "Login Successful",
        text2: "Welcome back!",
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
          ? Object.values(error.response.data.errors).flat().join(", ")
          : error.response?.data?.message || "Invalid credentials";
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: errorMessages,
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
        <RNTextInput
          placeholder={"Email"}
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
          keyboardType="email-address"
        />
        <RNTextInput
          placeholder={"Password"}
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => handleChange("password", text)}
        />
        <TouchableOpacity style={styles.forgetButton} activeOpacity={0.7}>
          <RNText color={"primary"}>Forget Password?</RNText>
        </TouchableOpacity>
        <Button
          onPress={handleLogin}
          style={styles.btn}
          title={"Login"}
          variant="gradient"
        />
      </View>
      <View style={styles.donotHaveAccount}>
        <RNText>Don't have an account?</RNText>
        <TouchableOpacity onPress={() => navigation.navigate("sign-up")} activeOpacity={0.7}>
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
});