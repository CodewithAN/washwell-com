import React, { useState, useEffect, useRef, useContext } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import Header from "../components/global/Header";
import RNText from "../components/ui/RNText";
import colors, { externalStyles } from "../utils/Theme";
import { horizantGap, txtLg, txtMd, txtSm } from "../utils/Constant";
import Img from "../components/ui/Img";
import choose from "../../assets/icons/choosesearch.svg";
import location from "../../assets/location/location.svg";
import buildingIcon from "../../assets/icons/building.png";
import villaIcon from "../../assets/icons/villa.png";
import Button from "../components/ui/Button";
import Toast from "react-native-toast-message";
import debounce from "lodash.debounce";
import { axiosInstance } from "../utils/Api";
import { ContextProvider } from "../global/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import font from "../utils/Fonts";

const GOOGLE_MAPS_API_KEY = "AIzaSyBpuZ8ZSvz02H4--PECiKhyteW9qDhRly0";

const ChooseLocation = ({ navigation }) => {
  const [region, setRegion] = useState(null);
  const [marker, setMarker] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [addressType, setAddressType] = useState(null);
  const [buildingName, setBuildingName] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [communityName, setCommunityName] = useState("");
  const [street, setStreet] = useState("");
  const [villaNo, setVillaNo] = useState("");
  const [loading, setLoading] = useState(true);
  const { mapState, setAddress } = useContext(ContextProvider);
  const mapRef = useRef(null);

  useEffect(() => {
    const initializeMap = async () => {
      try {
        setLoading(true);
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Location permission denied.",
          });
          navigation.replace("Enable");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        const initialRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setRegion(initialRegion);
        setMarker({ latitude, longitude });
        setLoading(false);
      } catch (error) {
        console.log("Error initializing map:", error);
        setLoading(false);
      }
    };

    initializeMap();
  }, []);

  const fetchSuggestions = debounce(async (query) => {
    if (!query.trim() || query.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          query
        )}&key=${GOOGLE_MAPS_API_KEY}&region=ae`
      );
      const data = await response.json();
      if (data.status === "OK") {
        setSuggestions(data.predictions);
      } else {
        console.log("Places API error:", data.status, data.error_message);
        setSuggestions([]);
      }
    } catch (error) {
      console.log("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  }, 300);

  const handleSuggestionPress = async (placeId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=formatted_address,geometry&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      if (data.status === "OK") {
        const { location } = data.result.geometry;
        const { lat, lng } = location;
        const newRegion = {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setRegion(newRegion);
        setMarker({ latitude: lat, longitude: lng });
        setSelectedAddress(data.result.formatted_address);
        if (mapRef.current) {
          mapRef.current.animateToRegion(newRegion, 1000);
        } else {
          console.warn("MapView ref not available yet");
        }
        setSuggestions([]);
        setSearchQuery("");
      } else {
        console.log(
          "Place Details API error:",
          data.status,
          data.error_message
        );
      }
    } catch (error) {
      console.log("Error fetching place details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkerDrag = async (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    console.log("Marker dragged to:", { latitude, longitude });
    setMarker({ latitude, longitude });
    try {
      setLoading(true);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      if (data.status === "OK" && data.results.length > 0) {
        setSelectedAddress(data.results[0].formatted_address);
      } else {
        console.log("Geocoding API error:", data.status, data.error_message);
        setSelectedAddress(null);
      }
    } catch (error) {
      console.log("Error reverse geocoding:", error);
      setSelectedAddress(null);
    } finally {
      setLoading(false);
    }
  };

  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarker({ latitude, longitude });
    handleMarkerDrag(e);
  };

  const handleCurrentLocation = async () => {
    try {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(newRegion);
      setMarker({ latitude, longitude });
      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion, 1000);
      }
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      if (data.status === "OK" && data.results.length > 0) {
        setSelectedAddress(data.results[0].formatted_address);
      } else {
        setSelectedAddress(null);
      }
    } catch (error) {
      console.log("Error fetching current location:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmLocation = () => {
    if (!selectedAddress) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select a valid address.",
      });
      return;
    }
    setAddressType(null);
    setBuildingName("");
    setApartmentNumber("");
    setCommunityName("");
    setStreet("");
    setVillaNo("");
    setModalVisible(true);
  };

  const handleAddAddress = async () => {
    try {
      setLoading(true);
      const instance = await axiosInstance();
      const payload = {
        label: addressType,
        address: selectedAddress,
        latitude: marker.latitude,
        longitude: marker.longitude,
        is_default: 1,
        building_name: buildingName || undefined,
        apartment_number: apartmentNumber || undefined,
        community_name: communityName || undefined,
        street: street || undefined,
        villa: villaNo || undefined,
      };
      setAddress(payload);
      await AsyncStorage.setItem("washwell-address", JSON.stringify(payload));
      console.log(
        "Sending payload to /address:",
        JSON.stringify(payload, null, 2)
      );
      const response = await instance.post("/address", payload);
      console.log(
        "Response from /address POST:",
        JSON.stringify(response, null, 2)
      );

      if (!response || !response.data) {
        throw new Error("Invalid response from server");
      }
      if (mapState == "address") {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Address added successfully",
        });
      }

      navigation.replace(mapState);
    } catch (error) {
      console.log("Error adding address:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to add address.",
      });
    } finally {
      setLoading(false);
      setModalVisible(false);
    }
  };

  const handleAddressTypeSelect = (type) => {
    setAddressType(type);
    // Reset input fields when switching types
    setBuildingName("");
    setApartmentNumber("");
    setCommunityName("");
    setStreet("");
    setVillaNo("");
  };

  const addressTypes = [
    { type: "Building", icon: buildingIcon },
    { type: "Villa", icon: villaIcon },
  ];

  const renderSuggestion = ({ item }) => {
    const mainText = item.structured_formatting?.main_text || item.description;
    const secondaryText = item.structured_formatting?.secondary_text || "";
    return (
      <TouchableOpacity
        style={styles.suggestionItem}
        onPress={() => handleSuggestionPress(item.place_id)}
      >
        <Img
          source={location}
          width={16}
          height={16}
          style={styles.suggestionIcon}
        />
        <View>
          <RNText style={styles.suggestionMainText}>{mainText}</RNText>
          <RNText style={styles.suggestionSecondaryText}>
            {secondaryText}
          </RNText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Header title="Choose Location" />
      </View>

      <View style={styles.imageContainer}>
        {loading || !region ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            {!region && !loading && (
              <RNText>Failed to load map. Please try again.</RNText>
            )}
          </View>
        ) : (
          <MapView
            ref={mapRef}
            style={styles.map}
            region={region}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
            onPress={handleMapPress}
          >
            {marker && (
              <Marker
                coordinate={marker}
                draggable
                onDragEnd={handleMarkerDrag}
                title="Selected Location"
                description={selectedAddress || "Drag to select a location"}
                pinColor={colors.primary}
              />
            )}
          </MapView>
        )}
        <View style={[externalStyles.searchBar, styles.searchBar]}>
          <Img source={choose} width={16} height={16} />
          <TextInput
            placeholder="Search location ..."
            placeholderTextColor={colors.gray}
            style={externalStyles.input}
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              fetchSuggestions(text);
            }}
          />
        </View>
        {suggestions.length > 0 && (
          <FlatList
            style={styles.suggestionsList}
            data={suggestions}
            keyExtractor={(item) => item.place_id}
            renderItem={renderSuggestion}
            ListHeaderComponent={
              <View style={styles.suggestionHeader}>
                <Img source={location} width={16} height={16} />
                <RNText style={styles.suggestionHeaderText}>
                  Search Results
                </RNText>
              </View>
            }
          />
        )}
        <TouchableOpacity
          style={styles.currentLocationButton}
          onPress={handleCurrentLocation}
        >
          <Img source={location} width={24} height={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.textLocation}>
          <Img
            source={location}
            style={{ marginTop: 4 }}
            width={23}
            height={23}
          />
          <View>
            <RNText style={externalStyles.txtLg} color="primary">
              Confirm location
            </RNText>
            <RNText style={{ marginRight: 10 }}>
              {selectedAddress ||
                "Move the marker or search to select an address"}
            </RNText>
          </View>
        </View>
        <Button
          onPress={handleConfirmLocation}
          title="Confirm Location"
          variant="gradient"
          disabled={!selectedAddress || loading}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <RNText style={styles.modalTitle}>Select Address Type</RNText>
            <RNText style={styles.modalText}>
              Address: {selectedAddress || "Not selected"}
            </RNText>
            <View style={styles.addressTypeContainer}>
              {addressTypes.map(({ type, icon }) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.addressTypeButton,
                    addressType === type && styles.selectedType,
                  ]}
                  onPress={() => handleAddressTypeSelect(type)}
                >
                  <Img
                    source={icon}
                    width={40}
                    height={40}
                    style={styles.addressTypeIcon}
                  />
                  <RNText
                    style={[
                      styles.addressTypeText,
                      addressType === type && styles.selectedTypeText,
                    ]}
                  >
                    {type}
                  </RNText>
                </TouchableOpacity>
              ))}
            </View>
            {addressType === "Building" && (
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Building Name"
                  placeholderTextColor={colors.gray}
                  style={styles.input}
                  value={buildingName}
                  onChangeText={setBuildingName}
                />
                <TextInput
                  placeholder="Apartment Number"
                  placeholderTextColor={colors.gray}
                  style={styles.input}
                  value={apartmentNumber}
                  onChangeText={setApartmentNumber}
                />
              </View>
            )}
            {addressType === "Villa" && (
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Community Name"
                  placeholderTextColor={colors.gray}
                  style={styles.input}
                  value={communityName}
                  onChangeText={setCommunityName}
                />
                <TextInput
                  placeholder="Street No"
                  placeholderTextColor={colors.gray}
                  style={styles.input}
                  value={street}
                  onChangeText={setStreet}
                />
                <TextInput
                  placeholder="Villa No"
                  placeholderTextColor={colors.gray}
                  style={styles.input}
                  value={villaNo}
                  onChangeText={setVillaNo}
                />
              </View>
            )}
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <RNText style={styles.buttonText}>Cancel</RNText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.confirmButton,
                  !addressType && styles.disabledButton,
                ]}
                onPress={handleAddAddress}
                disabled={!addressType}
              >
                <RNText style={styles.buttonText}>Confirm</RNText>
              </TouchableOpacity>
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
    flexDirection: "column",
  },
  header: {
    paddingHorizontal: horizantGap,
  },
  imageContainer: {
    flex: 1,
    position: "relative",
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    position: "absolute",
    top: 20,
    left: horizantGap,
    right: horizantGap,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    zIndex: 10,
  },
  suggestionsList: {
    position: "absolute",
    top: 70,
    left: horizantGap,
    right: horizantGap,
    backgroundColor: colors.white,
    borderRadius: 10,
    maxHeight: 200,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    zIndex: 10,
  },
  suggestionHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  suggestionHeaderText: {
    fontSize: txtSm,
    fontWeight: "bold",
    marginLeft: 5,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  suggestionIcon: {
    marginRight: 10,
  },
  suggestionMainText: {
    fontSize: txtSm,
    fontWeight: "600",
  },
  suggestionSecondaryText: {
    fontSize: txtSm - 2,
    color: colors.gray,
  },
  currentLocationButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: colors.white,
    borderRadius: 50,
    padding: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    zIndex: 10,
  },
  bottomContainer: {
    paddingHorizontal: horizantGap,
    paddingBottom: 20,
    paddingTop: 10,
    gap: 20,
  },
  textLocation: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
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
  addressTypeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  addressTypeButton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.gray,
    width: "45%",
  },
  selectedType: {
    borderColor: colors.primary,
  },
  addressTypeIcon: {},
  addressTypeText: {
    fontSize: txtSm,
    color: colors.black,
  },
  selectedTypeText: {
    fontFamily: font.bold,
    color: colors.primary,
  },
  inputContainer: {
    width: "100%",
    gap: 10,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 5,
    fontSize: txtSm,
  },
  modalButtonContainer: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
    justifyContent: "space-between",
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
  confirmButton: {
    backgroundColor: colors.primary,
  },
  disabledButton: {
    backgroundColor: colors.gray,
    opacity: 0.5,
  },
  buttonText: {
    color: colors.white,
    fontSize: txtSm,
  },
});

export default ChooseLocation;
