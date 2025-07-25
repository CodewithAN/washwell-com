import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import menu from "../../assets/icons/menu.svg";
import whatsapp from "../../assets/icons/whatsapp.svg";
import dollar from "../../assets/icons/dollar.svg";
import bell from "../../assets/icons/Outlined.svg";
import location from "../../assets/icons/location.svg";
import dryClean from "../../assets/icons/dry.svg";
import onlyPress from "../../assets/icons/Iron.svg";
import washFold from "../../assets/icons/Laundry.svg";
import carpets from "../../assets/icons/Yoga mat.svg";
import curtains from "../../assets/icons/curtains.svg";
import colors, { externalStyles } from "../utils/Theme";
import { API_URL, horizantGap, primarBorderRadius } from "../utils/Constant";
import Img from "../components/ui/Img";
import RNText from "../components/ui/RNText";
import Button from "../components/ui/Button";
import Promotion from "../components/home/Promotion";
import { axiosInstance } from "../utils/Api";
import { useContext, useEffect } from "react";
import { ContextProvider } from "../global/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const servicesData = [
  {
    icon: dryClean,
    title: "Dry Clean (Clean & Press)",
    description:
      "Effortlessly scheduled, Delicate care for a crisp, fresh look!",
  },
  {
    icon: onlyPress,
    title: "Only Press",
    description:
      "Experience quick and Perfectly pressed, wrinkle-free every time!",
  },
  {
    icon: washFold,
    title: "Wash and Fold",
    description: "Clean, fresh, and neatly folded—hassle-free washed laundry",
  },
  {
    icon: [curtains, carpets],
    title: "Carpets and Curtains",
    description:
      "Deep-cleaned carpets & Revive your curtains with expert cleaning!",
  },
];

const fetchPromotions = async () => {
  try {
    const instance = await axiosInstance();
    const response = await instance.get(API_URL + "/promotions-list");
    return response?.data?.data?.promotions;
  } catch (error) {
    console.error(
      "Error fetching promotions:",
      error.message,
      error.response?.data
    );
  }
};

const Home = ({ navigation }) => {
  const { setSelectedTab, address, setMapState } = useContext(ContextProvider);
  const { data: promotions, isLoading } = useQuery({
    queryKey: ["promotions"],
    queryFn: fetchPromotions,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    const fetchAddress = async () => {
      const address = await AsyncStorage.getItem("washwell-address");
      let parsedAddress = JSON.parse(address);
      if (
        parsedAddress == null ||
        parsedAddress == undefined ||
        parsedAddress == ""
      ) {
        setMapState("home");
        navigation.replace("enable");
      }
    };
    fetchAddress();
  }, []);

  const handleCardPress = (index) => {
    setSelectedTab(index);
    navigation.navigate("cart");
  };

  return (
    <>
      <View style={styles.notificationBar}>
        <TouchableOpacity
          onPress={() => navigation.navigate("menu")}
          activeOpacity={0.7}
        >
          <Img source={menu} style={styles.menuIcon} />
        </TouchableOpacity>
        <View style={styles.rightIcons}>
          <Img source={whatsapp} style={{ height: 24, width: 24 }} />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("wallet")}
          >
            <Img source={dollar} style={styles.notificationIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("notification")}
            style={styles.notificationWrapper}
          >
            <Img source={bell} style={styles.notificationIcon} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.locationBar}>
          <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
              <Img source={location} width={14} height={14} />
            </View>
          </View>
          <View>
            <RNText style={[externalStyles.txtMd, { color: colors.white }]}>
              {address?.label || "N/A"}
            </RNText>
            <RNText numberOfLines={1} style={{ color: colors.white }}>
              {address?.address || "N/A"}
            </RNText>
          </View>
        </View>

        {/* Offer Section */}
        <View style={styles.offers}>
          <RNText style={externalStyles.txtMd} fontWeight="medium">
            Latest Offers
          </RNText>
          <Promotion
            navigation={navigation}
            data={promotions}
            isLoading={isLoading}
          />
        </View>

        <View style={styles.services}>
          <RNText
            style={[externalStyles.txtMd, styles.servicesText]}
            fontWeight="medium"
          >
            What do you want to get done today?
          </RNText>
          <View style={styles.serviceCards}>
            {servicesData.map((service, index) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleCardPress(index)}
                key={index}
                style={styles.serviceCard}
              >
                {Array.isArray(service.icon) ? (
                  <View style={styles.iconRow}>
                    {service.icon.map((iconItem, i) => (
                      <Img
                        key={i}
                        source={iconItem}
                        style={[
                          styles.serviceIcon,
                          { marginRight: i === 0 ? 8 : 0 },
                        ]}
                      />
                    ))}
                  </View>
                ) : (
                  <Img source={service.icon} style={styles.serviceIcon} />
                )}
                <RNText style={styles.serviceTitle}>{service.title}</RNText>
                <RNText
                  style={[styles.serviceDesc, index === 1 && styles.press]}
                >
                  {service.description}
                </RNText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Fixed Place Order Button */}
      <View style={styles.fixedButtonContainer}>
        <Button
          onPress={() => navigation.navigate("place-order")}
          title="Place Order"
          variant="gradient"
          style={styles.fixedButton}
        />
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: horizantGap,
  },
  contentContainer: {
    paddingTop: 8,
    paddingBottom: 100,
    gap: 30,
  },
  notificationBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.background,
    paddingHorizontal: horizantGap,
    paddingVertical: 7,
  },
  menuIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  notificationIcon: {
    width: 22,
    height: 22,
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  notificationWrapper: {
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "red",
  },
  servicesText: {
    marginBottom: 10,
  },
  serviceCards: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  serviceCard: {
    width: "48%",
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "start",
    gap: 5,
  },
  serviceIcon: {
    width: 46,
    height: 58,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "start",
    width: "60%",
  },
  serviceDesc: {
    fontSize: 12,
    textAlign: "start",
    color: "#28292C",
  },
  press: {
    marginTop: 16,
  },
  innerContainer: {
    width: 24,
    height: 24,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  outerContainer: {
    width: 40,
    height: 40,
    backgroundColor: colors.white,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  locationBar: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: primarBorderRadius,
    gap: 10,
    padding: 10,
    marginTop: 5,
    paddingRight: 60,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  fixedButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: horizantGap,
  },
});
