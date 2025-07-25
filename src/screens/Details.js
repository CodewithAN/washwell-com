import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { axiosInstance } from "../utils/Api";
import Header from "../components/global/Header";
import RNText from "../components/ui/RNText";
import colors from "../utils/Theme";
import { horizantGap, txtXs } from "../utils/Constant";
import Img from "../components/ui/Img";
import editIcon from "../../assets/icons/detail.svg";
import Button from "../components/ui/Button";
import RNTextInput from "../components/ui/RNTextInput";
import { ContextProvider } from "../global/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [globalError, setGlobalError] = useState(null);
  const { token, setToken, setUser } = useContext(ContextProvider);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const instance = await axiosInstance();
        const response = await instance.get("/get-profile");

        const profileData = response.data.data.user;
        await AsyncStorage.setItem(
          "washwell-user",
          JSON.stringify(profileData)
        );
        setUser(profileData);
        const fullName = profileData.name || "";
        const nameParts = fullName.trim().split(" ");

        setFirstName(nameParts[0] || "");
        setLastName(nameParts.length > 1 ? nameParts.slice(1).join(" ") : "");
        setEmail(profileData.email || "");
        setPhoneNumber(profileData.phone || "");
        setProfileImage(profileData.image || null);
        setGlobalError(null);
      } catch (err) {
        setGlobalError(
          err.response?.data?.message ||
            "Failed to fetch profile. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Toast.show({
        type: "error",
        text1: "Permission to access gallery is required!",
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleUpdateProfile = async () => {
    setPhoneError("");
    setGlobalError(null);

    if (!phoneNumber.trim()) {
      setPhoneError("Phone number is required");
      return;
    }

    setLoading(true);
    try {
      const instance = await axiosInstance();
      const formData = new FormData();
      formData.append("name", `${firstName} ${lastName}`.trim());
      formData.append("email", email);
      formData.append("phone_number", phoneNumber);

      if (profileImage && profileImage.startsWith("file://")) {
        const uriParts = profileImage.split("/");
        const fileName = uriParts[uriParts.length - 1];
        formData.append("image", {
          uri: profileImage,
          name: fileName,
          type: "image/jpeg",
        });
      }

      let response = await instance.post("/update-profile", formData, {
        headers: {
          Authorization: `Bearer ${
            token || (await AsyncStorage.getItem("washwell-token"))
          }`,
          "Content-Type": "multipart/form-data",
        },
      });
      let data = response.data.data;
      let user = data?.user;
      await AsyncStorage.setItem("washwell-user", JSON.stringify(user));
      setUser(user);
      Toast.show({
        type: "success",
        text1: "Profile updated successfully",
      });
    } catch (err) {
      setGlobalError(
        err.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (globalError) {
    return (
      <View style={styles.errorContainer}>
        <RNText style={styles.errorText}>{globalError}</RNText>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <View style={styles.mainContainer}>
        <Header title="Personal Details" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.images}>
            {profileImage ? (
              <Img
                source={profileImage && { uri: profileImage }}
                width={46}
                height={46}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.imageWrapper}>
                <Ionicons name="person" size={24} color={colors.primary} />
              </View>
            )}

            <TouchableOpacity onPress={pickImage}>
              <Img
                source={editIcon}
                width={23}
                height={23}
                style={styles.editIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.details}>
            <RNTextInput
              label="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <RNTextInput
              label="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
            <RNTextInput label="Email" value={email} onChangeText={setEmail} />
            <RNTextInput
              label="Phone Number"
              value={phoneNumber}
              onChangeText={(text) => {
                setPhoneNumber(text);
                if (text.trim()) setPhoneError("");
              }}
            />
            {phoneError ? (
              <RNText style={styles.inlineError}>{phoneError}</RNText>
            ) : null}
          </View>
        </ScrollView>

        <View style={styles.buttonWrapper}>
          <Button
            title="Update Profile"
            variant="gradient"
            onPress={handleUpdateProfile}
            loading={loading}
            disabled={loading}
          />
        </View>

        <Toast />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: horizantGap,
  },
  scrollContent: {
    paddingBottom: 20,
    gap: 20,
    paddingTop: 10,
  },
  images: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageContainer: {
    position: "relative",
  },
  profileImage: {
    borderRadius: 1000,
  },

  editIcon: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 2,
  },
  details: {
    gap: 8,
    flex: 1,
  },
  buttonWrapper: {
    paddingBottom: 20,
  },
  inlineError: {
    color: "red",
    fontSize: txtXs,
    marginTop: -6,
    marginBottom: 8,
    marginLeft: 4,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: txtXs,
    color: "red",
    textAlign: "center",
  },
  imageWrapper: {
    width: 46,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 1000,
  },
});
