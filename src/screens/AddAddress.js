import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import RNTextInput from "../components/ui/RNTextInput";
import RNText from "../components/ui/RNText";
import Button from "../components/ui/Button";
import Toast from "react-native-toast-message";
import Header from "../components/global/Header";
import colors, { externalStyles } from "../utils/Theme";
import { horizantGap, txtMd, txtXs } from "../utils/Constant";
import { axiosInstance } from "../utils/Api";

const AddAddress = ({ navigation }) => {
  const [label, setLabel] = useState("");
  const [street, setStreet] = useState("");
  const [villa, setVilla] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleAddAddress = async () => {
    const errors = {};
    if (!label.trim()) errors.label = "Label is required";
    if (!street.trim()) errors.street = "Street is required";
    if (!villa.trim()) errors.villa = "Villa is required";
    if (!address.trim()) errors.address = "Address is required";
    if (!latitude.trim()) errors.latitude = "Latitude is required";
    if (!longitude.trim()) errors.longitude = "Longitude is required";

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please fill all required fields",
      });
      return;
    }

    try {
      setLoading(true);
      const instance = await axiosInstance();
      const payload = {
        label,
        street,
        villa,
        address,
        latitude,
        longitude,
        is_default: isDefault,
      };
      console.log("Sending payload to /address:", JSON.stringify(payload, null, 2));
      const response = await instance.post("/address", payload);
      console.log("Response from /address POST:", JSON.stringify(response, null, 2));

      // Validate response
      if (!response || !response.data) {
        throw new Error("Invalid response from server");
      }

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Address added successfully",
      });
      navigation.goBack();
    } catch (error) {
      console.error("Error adding address:", error.message, error.response?.data);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.response?.data?.message || "Failed to add address",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Add New Address" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
      >
        <ScrollView
          contentContainerStyle={styles.formContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <InputField
            label="Label"
            value={label}
            setValue={setLabel}
            error={formErrors.label}
          />
          <InputField
            label="Street"
            value={street}
            setValue={setStreet}
            error={formErrors.street}
          />
          <InputField
            label="Villa"
            value={villa}
            setValue={setVilla}
            error={formErrors.villa}
          />
          <InputField
            label="Address"
            value={address}
            setValue={setAddress}
            error={formErrors.address}
          />
          <InputField
            label="Latitude"
            value={latitude}
            setValue={setLatitude}
            keyboardType="numeric"
            error={formErrors.latitude}
          />
          <InputField
            label="Longitude"
            value={longitude}
            setValue={setLongitude}
            keyboardType="numeric"
            error={formErrors.longitude}
          />
          <InputField
            label="Is Default (yes/no)"
            value={isDefault ? "Yes" : "No"}
            setValue={(val) => setIsDefault(val.toLowerCase() === "yes")}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <Button
          title="Add Address"
          onPress={handleAddAddress}
          loading={loading}
          disabled={loading}
          variant="gradient"
        />
      </View>

      <Toast />
    </View>
  );
};

const InputField = ({
  label,
  value,
  setValue,
  keyboardType = "default",
  error,
}) => (
  <View style={{ marginBottom: 16 }}>
    <RNTextInput
      label={label}
      value={value}
      onChangeText={setValue}
      placeholder={`Enter ${label}`}
      keyboardType={keyboardType}
      style={styles.input}
    />
    {error ? <RNText style={styles.errorText}>{error}</RNText> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: horizantGap,
  },
  formContainer: {
    paddingTop: 12,
    paddingBottom: 20,
  },
  footer: {
    paddingVertical: 12,
    backgroundColor: colors.background,
  },
  input: {
    fontSize: txtMd,
    padding: 12,
    borderWidth: 0,
  },
  errorText: {
    fontSize: txtXs,
    color: "red",
    marginTop: 4,
  },
});

export default AddAddress;