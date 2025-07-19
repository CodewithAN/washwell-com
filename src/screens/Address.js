import React, { useState, useCallback, useEffect, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import RNText from "../components/ui/RNText";
import Header from "../components/global/Header";
import colors, { externalStyles } from "../utils/Theme";
import { horizantGap, txtMd, txtSm } from "../utils/Constant";
import Img from "../components/ui/Img";
import RNView from "../components/ui/RNView";
import choose from "../../assets/icons/choosesearch.svg";
import ellipse from "../../assets/address/Ellipse.svg";
import office from "../../assets/address/office.svg";
import home from "../../assets/address/home.svg";
import map from "../../assets/address/map.svg";
import borderEllipse from "../../assets/address/borderEllipse.svg";
import mapIcon from "../../assets/icons/map.svg";
import { MaterialIcons } from "@expo/vector-icons";
import { axiosInstance } from "../utils/Api";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Address = ({ navigation }) => {
  const [addresses, setAddresses] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false; // Cleanup on unmount
    };
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      console.log("Starting fetchAddresses");

      // Check token
      const token = await AsyncStorage.getItem("washwell-token");
      console.log("Token retrieved:", token);
      if (!token) {
        console.warn("No token found in AsyncStorage");
        if (isMounted.current) {
          setAddresses([]);
          console.log("Set addresses to [] due to missing token");
        }
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Authentication token missing. Please log in again.",
        });
        navigation.navigate("login"); // Redirect to login
        return;
      }

      const instance = await axiosInstance();
      console.log("Axios instance config:", instance.defaults);
      const response = await instance.get("/address");
      console.log("API Response from /address:", JSON.stringify(response, null, 2));
      console.log("Response.data specifically:", JSON.stringify(response.data, null, 2));

      // Handle response being undefined or not an array
      if (!response || !response.data) {
        console.warn("API response or response.data is undefined/null");
        if (isMounted.current) {
          setAddresses([]);
          console.log("Set addresses to [] due to invalid response");
        }
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "No addresses returned from server",
        });
        return;
      }

      // Check for response.data.addresses
      if (Array.isArray(response.data.addresses)) {
        console.log("Setting addresses to:", JSON.stringify(response.data.addresses, null, 2));
        if (isMounted.current) {
          setAddresses(response.data.addresses);
          console.log("Addresses set successfully");
        }
      } else if (Array.isArray(response.data.data)) {
        console.log("Setting addresses to nested response.data.data:", JSON.stringify(response.data.data, null, 2));
        if (isMounted.current) {
          setAddresses(response.data.data);
          console.log("Addresses set successfully");
        }
      } else if (Array.isArray(response.data)) {
        console.log("Setting addresses to:", JSON.stringify(response.data, null, 2));
        if (isMounted.current) {
          setAddresses(response.data);
          console.log("Addresses set successfully");
        }
      } else {
        console.warn("API response is not an array:", JSON.stringify(response.data, null, 2));
        if (isMounted.current) {
          setAddresses([]);
          console.log("Set addresses to [] due to invalid format");
        }
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Invalid response format from server",
        });
      }
    } catch (error) {
      console.error("Error fetching addresses:", error.message, error.response?.data);
      if (isMounted.current) {
        setAddresses([]);
        console.log("Set addresses to [] due to error");
      }
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.response?.data?.message || "Failed to fetch addresses",
      });
      if (error.response?.status === 401) {
        console.warn("Unauthorized: Invalid token");
        navigation.navigate("login"); // Redirect to login
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
        console.log("Fetch completed, loading set to false");
      }
    }
  };

  // Fetch addresses when screen is focused
  useFocusEffect(
    useCallback(() => {
      console.log("Screen focused, fetching addresses");
      fetchAddresses();
      return () => {
        console.log("Screen unfocused");
      };
    }, [])
  );

  // Log state changes and prevent undefined
  useEffect(() => {
    console.log("Addresses state changed:", JSON.stringify(addresses, null, 2));
    if (addresses === undefined) {
      console.error("Addresses state is undefined!");
      if (isMounted.current) {
        setAddresses([]);
        console.log("Reset addresses to [] due to undefined state");
      }
    }
  }, [addresses]);

  const handleSetDefault = async (id) => {
    try {
      const instance = await axiosInstance();
      await instance.post("/default-address", { id });
      setAddresses((prev) => {
        console.log("Current addresses in handleSetDefault:", JSON.stringify(prev, null, 2));
        if (!Array.isArray(prev)) {
          console.warn("Addresses is not an array in handleSetDefault:", prev);
          return [];
        }
        return prev.map((addr) =>
          addr.id === id
            ? { ...addr, is_default: 1 }
            : { ...addr, is_default: 0 }
        );
      });
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Default address updated",
      });
    } catch (error) {
      console.error("Error setting default address:", error.message, error.response?.data);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.response?.data?.message || "Failed to set default address",
      });
      if (error.response?.status === 401) {
        console.warn("Unauthorized: Invalid token");
        navigation.navigate("login"); // Redirect to login
      }
    }
  };

  const handleDelete = async () => {
    try {
      const instance = await axiosInstance();
      await instance.post("/delete-address", { id: addressToDelete });
      setAddresses((prev) => {
        console.log("Current addresses in handleDelete:", JSON.stringify(prev, null, 2));
        if (!Array.isArray(prev)) {
          console.warn("Addresses is not an array in handleDelete:", prev);
          return [];
        }
        return prev.filter((addr) => addr.id !== addressToDelete);
      });
      setModalVisible(false);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Address deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting address:", error.message, error.response?.data);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.response?.data?.message || "Failed to delete address",
      });
      if (error.response?.status === 401) {
        console.warn("Unauthorized: Invalid token");
        navigation.navigate("login"); // Redirect to login
      }
    }
  };

  const openDeleteModal = (id) => {
    setAddressToDelete(id);
    setModalVisible(true);
  };

  // Debug log before rendering
  console.log("Addresses state before render:", JSON.stringify(addresses, null, 2));

  // Ensure addresses is an array before rendering
  const safeAddresses = Array.isArray(addresses) ? addresses : [];
  if (!Array.isArray(addresses)) {
    console.warn("Addresses is not an array before render:", addresses);
  }

  return (
    <View style={styles.mainContainer}>
      <Header title="Address" />
      <View style={externalStyles.searchBar}>
        <Img source={choose} width={16} height={16} />
        <TextInput
          placeholder="Find an Address ..."
          placeholderTextColor={colors.gray}
          style={externalStyles.input}
        />
      </View>

      <View style={styles.textMiddle}>
        <RNText fontWeight="medium" style={externalStyles.txtMd}>
          Saved addresses
        </RNText>
        <TouchableOpacity
          onPress={() => {
            console.log("Navigating to add address screen");
            navigation.navigate("add");
          }}
          style={styles.add}
        >
          <RNText>Add New</RNText>
        </TouchableOpacity>
      </View>

      <View style={styles.addressContainer}>
        {loading ? (
          <RNText>Loading addresses...</RNText>
        ) : safeAddresses.length === 0 ? (
          <RNText>No addresses found. Add a new address.</RNText>
        ) : (
          safeAddresses.map((address) => (
            <TouchableOpacity
              key={address.id}
              onPress={() => handleSetDefault(address.id)}
              style={[
                styles.addressCard,
                address.is_default ? styles.border : null,
              ]}
            >
              <View style={styles.top}>
                <View style={styles.Img}>
                  <Img
                    source={address.is_default ? borderEllipse : ellipse}
                    width={36}
                    height={36}
                    style={styles.outer}
                  />
                  <Img
                    source={address.label.toLowerCase() === "home" ? home : office}
                    width={25}
                    height={20}
                    style={styles.inner}
                  />
                </View>
                <RNText style={externalStyles.txtMd} fontWeight="medium">
                  {address.label || "N/A"}
                </RNText>
                <TouchableOpacity
                  onPress={() => openDeleteModal(address.id)}
                  style={styles.deleteButton}
                >
                  <MaterialIcons name="delete" size={20} color={colors.red} />
                </TouchableOpacity>
              </View>
              <View style={styles.bottom}>
                <View style={styles.text}>
                  <RNText>{address.street || "N/A"}</RNText>
                  <RNText>{address.address || "N/A"}</RNText>
                  <RNText>{address.villa || "N/A"}</RNText>
                </View>
                <Img source={map} width={73} height={73} />
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("location")}
        activeOpacity={0.7}
        style={styles.mapButton}
      >
        <Img source={mapIcon} width={24} height={24} />
        <RNText
          style={[externalStyles.txtMd, styles.mapInput]}
          fontWeight="regular"
        >
          Map
        </RNText>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <RNText style={styles.modalTitle}>Confirm Deletion</RNText>
            <RNText style={styles.modalText}>
              Are you sure you want to delete this address?
            </RNText>
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <RNText style={styles.buttonText}>Cancel</RNText>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.deleteButtonModal]}
                onPress={handleDelete}
              >
                <RNText style={styles.buttonText}>Delete</RNText>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: horizantGap,
    paddingBottom: "25%",
    gap: 20,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textMiddle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  add: {
    backgroundColor: colors.white,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: txtSm,
  },
  outer: {
    position: "relative",
  },
  inner: {
    position: "absolute",
    top: 6,
    left: 6,
  },
  text: {
    fontSize: txtMd,
    gap: 5,
  },
  addressCard: {
    gap: 5,
    paddingVertical: 20,
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addressContainer: {
    gap: 15,
  },
  border: {
    borderStyle: "solid",
    borderColor: colors.primary,
    borderWidth: 2,
  },
  mapButton: {
    width: "25%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 20,
    gap: 5,
    marginHorizontal: "auto",
    marginTop: "auto",
  },
  mapInput: {
    color: "#F8F3EA",
  },
  deleteButton: {
    padding: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: txtMd,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: txtSm,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: colors.gray,
  },
  deleteButtonModal: {
    backgroundColor: colors.red,
  },
  buttonText: {
    color: colors.white,
    fontSize: txtSm,
  },
});

export default Address;