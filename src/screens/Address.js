import { useState, useCallback, useEffect, useRef, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import RNText from "../components/ui/RNText";
import Header from "../components/global/Header";
import colors, { externalStyles } from "../utils/Theme";
import { horizantGap, txtMd, txtSm, txtXs } from "../utils/Constant";
import Img from "../components/ui/Img";
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
import { ContextProvider } from "../global/Context";

const Address = ({ navigation }) => {
  const [addresses, setAddresses] = useState([]);
  const [filteredAddresses, setFilteredAddresses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const isMounted = useRef(true);
  const { setMapState, setAddress } = useContext(ContextProvider);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const checkLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === "granted";
  };

  const handleNavigation = async (screen) => {
    const hasPermission = await checkLocationPermission();
    if (!hasPermission) {
      navigation.replace("Enable");
    } else {
      setMapState("address");
      navigation.replace(screen);
    }
  };

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("washwell-token");
      if (!token) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Authentication token missing. Please log in again.",
        });
        if (isMounted.current) {
          setAddresses([]);
          setFilteredAddresses([]);
        }
        return;
      }

      const instance = await axiosInstance();
      const response = await instance.get("/address");
      const fetchedAddresses = response?.data?.data?.addresses;
      let defaultAddress = fetchedAddresses.filter(
        (item) => item.is_default == 1
      )[0];
      console.log(defaultAddress, "defaultAddress");
      setAddress(defaultAddress);
      await AsyncStorage.setItem(
        "washwell-address",
        JSON.stringify(defaultAddress)
      );

      if (Array.isArray(fetchedAddresses)) {
        const sanitizedAddresses = fetchedAddresses.map((addr) => ({
          ...addr,
          label:
            addr.label ||
            (addr.is_default ? "Default Address" : "Unnamed Address"),
          street: addr.street || "",
          address: addr.address || "",
          villa: addr.villa || "",
        }));
        if (isMounted.current) {
          setAddresses(sanitizedAddresses);
          setFilteredAddresses(sanitizedAddresses);
        }
      } else {
        if (isMounted.current) {
          setAddresses([]);
          setFilteredAddresses([]);
        }
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Invalid response format from server",
        });
      }
    } catch (error) {
      console.error(
        "Error fetching addresses:",
        error.message,
        error.response?.data
      );
      if (isMounted.current) {
        setAddresses([]);
        setFilteredAddresses([]);
      }
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.response?.data?.message || "Failed to fetch addresses",
      });
      if (error.response?.status === 401) {
      }
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredAddresses(addresses);
      return;
    }
    const filtered = addresses.filter(
      (addr) =>
        addr.label.toLowerCase().includes(query.toLowerCase()) ||
        addr.address.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAddresses(filtered);
  };

  const handleSetDefault = async (id) => {
    const selectedAddress = addresses.find((addr) => addr.id === id);
    if (selectedAddress.is_default) {
      return;
    }

    try {
      const instance = await axiosInstance();
      await instance.post("/default-address", { id });
      setAddress(selectedAddress);
      await AsyncStorage.setItem(
        "washwell-address",
        JSON.stringify(selectedAddress)
      );
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === id
            ? { ...addr, is_default: 1, label: addr.label || "Default Address" }
            : { ...addr, is_default: 0 }
        )
      );
      setFilteredAddresses((prev) =>
        prev.map((addr) =>
          addr.id === id
            ? { ...addr, is_default: 1, label: addr.label || "Default Address" }
            : { ...addr, is_default: 0 }
        )
      );

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Default address updated",
      });
    } catch (error) {
      console.error(
        "Error setting default address:",
        error.message,
        error.response?.data
      );
      Toast.show({
        type: "error",
        text1: "Error",
        text2:
          error?.response?.data?.message || "Failed to set default address",
      });
      if (error.response?.status === 401) {
      }
    }
  };

  const handleDelete = async () => {
    try {
      const instance = await axiosInstance();
      await instance.post("/delete-address", { id: addressToDelete });

      const wasDefault = addresses.find(
        (addr) => addr.id === addressToDelete
      )?.is_default;
      setAddresses((prev) =>
        prev.filter((addr) => addr.id !== addressToDelete)
      );
      setFilteredAddresses((prev) =>
        prev.filter((addr) => addr.id !== addressToDelete)
      );

      if (wasDefault && addresses.length > 1) {
        const newDefaultId = addresses.find(
          (addr) => addr.id !== addressToDelete
        )?.id;
        if (newDefaultId) {
          await instance.post("/default-address", { id: newDefaultId });
          setAddresses((prev) =>
            prev.map((addr) =>
              addr.id === newDefaultId
                ? {
                    ...addr,
                    is_default: 1,
                    label: addr.label || "Default Address",
                  }
                : addr
            )
          );
          setFilteredAddresses((prev) =>
            prev.map((addr) =>
              addr.id === newDefaultId
                ? {
                    ...addr,
                    is_default: 1,
                    label: addr.label || "Default Address",
                  }
                : addr
            )
          );
        }
      }

      setModalVisible(false);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Address deleted successfully",
      });
    } catch (error) {
      console.error(
        "Error deleting address:",
        error.message,
        error.response?.data
      );
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.response?.data?.message || "Failed to delete address",
      });
      if (error.response?.status === 401) {
      }
    }
  };

  const openDeleteModal = (id) => {
    setAddressToDelete(id);
    setModalVisible(true);
  };

  return (
    <View style={styles.mainContainer}>
      <Header title="Address" />
      <View style={externalStyles.searchBar}>
        <Img source={choose} width={16} height={16} />
        <TextInput
          placeholder="Find an Address ..."
          placeholderTextColor={colors.gray}
          style={externalStyles.input}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <View style={styles.textMiddle}>
        <RNText fontWeight="medium" style={externalStyles.txtMd}>
          Saved addresses
        </RNText>
        <TouchableOpacity
          onPress={() => handleNavigation("location")}
          style={styles.add}
        >
          <RNText>Add New</RNText>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.addressContainer}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : filteredAddresses.length === 0 ? (
          <RNText>No addresses found.</RNText>
        ) : (
          filteredAddresses.map((address) => (
            <View key={address.id} style={styles.addressCardWrapper}>
              <TouchableOpacity
                onPress={() => handleSetDefault(address.id)}
                activeOpacity={0.8}
                style={[
                  styles.addressCard,
                  address.is_default ? styles.border : null,
                ]}
              >
                <View style={{ flex: 1, gap: 8 }}>
                  <View style={styles.top}>
                    <View
                      style={{
                        gap: 10,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <View style={styles.Img}>
                        <Img
                          source={address.is_default ? borderEllipse : ellipse}
                          width={36}
                          height={36}
                          style={styles.outer}
                        />
                        <Img
                          source={
                            address.label?.toLowerCase().includes("home")
                              ? home
                              : office
                          }
                          width={25}
                          height={20}
                          style={styles.inner}
                        />
                      </View>
                      <View>
                        <RNText
                          style={externalStyles.txtMd}
                          fontWeight="medium"
                        >
                          {address.label}
                        </RNText>
                      </View>
                    </View>
                  </View>
                  <View>
                    <View style={styles.text}>
                      {address.address ? (
                        <RNText>{address.address}</RNText>
                      ) : (
                        <RNText style={{ color: colors.gray }}>
                          Address: Not provided
                        </RNText>
                      )}
                    </View>
                    <View>
                      <RNText>
                        {address.label == "Villa"
                          ? `Community Name:${
                              address?.community_name || "N/A"
                            }, Villa No:${
                              address?.street || "N/A"
                            },  Stree No:${address?.villa || "N/A"} `
                          : `Building Name:${
                              address?.building_name || "N/A"
                            }, Apartment Number:${
                              address?.building_name || "N/A"
                            } `}
                      </RNText>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => openDeleteModal(address.id)}
                    style={styles.deleteButton}
                  >
                    <MaterialIcons
                      name="delete"
                      size={14}
                      color={colors.white}
                    />
                    <RNText style={styles.deleteButtonText}>Delete</RNText>
                  </TouchableOpacity>
                </View>
                <View>
                  <Img source={map} width={73} height={73} />
                </View>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        onPress={() => handleNavigation("location")}
        activeOpacity={0.7}
        style={styles.mapButton}
      >
        <Img source={mapIcon} width={24} height={24} />
        <RNText style={styles.mapInput}>Map</RNText>
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
                <RNText style={styles.buttonText}>Yes</RNText>
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
    paddingBottom: 20,
    gap: 20,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
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
    flex: 1,
  },
  addressCard: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.white,
    display: "flex",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  addressCardWrapper: {
    marginBottom: 10,
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addressContainer: {
    gap: 15,
    paddingBottom: 80,
  },
  border: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  mapButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    gap: 5,
  },
  mapInput: {
    color: "#F8F3EA",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 5,
    alignSelf: "flex-start",
  },
  deleteButtonText: {
    color: colors.white,
    fontSize: txtXs,
    marginLeft: 5,
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
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.white,
    fontSize: txtSm,
  },
});

export default Address;
