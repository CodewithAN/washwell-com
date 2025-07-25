import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import PersonalIcon from "../../assets/menu/detail.svg";
import OrdersIcon from "../../assets/menu/orders.svg";
import AddressIcon from "../../assets/menu/address.svg";
import CardsIcon from "../../assets/menu/cards.svg";
import WalletIcon from "../../assets/menu/wallet.svg";
import languageIcon from "../../assets/menu/globe.svg";
import ReferIcon from "../../assets/menu/refer.svg";
import SupportIcon from "../../assets/menu/chat.svg";
import LogoutIcon from "../../assets/menu/signout.svg";
import person from "../../assets/menu/person.svg";
import arrow from "../../assets/menu/arrow.svg";
import RNText from "../components/ui/RNText";
import Img from "../components/ui/Img";
import Header from "../components/global/Header";
import colors, { externalStyles } from "../utils/Theme";
import { horizantGap } from "../utils/Constant";
import RNView from "../components/ui/RNView";
import { useContext, useRef, useState } from "react";
import { ContextProvider } from "../global/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import i18n from "../utils/i18n";

const Menu = ({ navigation }) => {
  const { user, setUser, setToken, setSelectedLanguage, selectedLanguage } =
    useContext(ContextProvider);
  const bottomSheetRef = useRef(null);

  const menuItems = [
    {
      title: "Personal Details",
      icon: PersonalIcon,
      screen: "detail",
    },
    { title: "My Orders", icon: OrdersIcon, screen: "order" },
    { title: "Addresses", icon: AddressIcon, screen: "address" },
    { title: "My Cards", icon: CardsIcon, screen: "card" },
    { title: "Wallet", icon: WalletIcon, screen: "wallet" },
    { title: "Refer a Friend", icon: ReferIcon, screen: "refer" },
    { title: "Choose Language", icon: languageIcon, screen: "language" },
    {
      title: "Change Password",
      icon: MaterialCommunityIcons,
      screen: "change",
      iconName: "lock",
    },
    { title: "Support Center", icon: SupportIcon, screen: "home" },
    { title: "Sign Out", icon: LogoutIcon, screen: "home" },
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "French" },
    { code: "ar", name: "Arabic" },
  ];

  const selectLanguage = async (lang) => {
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang);
    await AsyncStorage.setItem("washwell-lang", JSON.stringify(lang));
    bottomSheetRef.current.close();
  };

  const handleLogout = async () => {
    Toast.show({
      type: "success",
      text1: "Logout Successfully!",
    });
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem("washwell-token");
    await AsyncStorage.removeItem("washwell-user");
  };

  return (
    <>
      <Header space title="Menu" />
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <View style={styles.header}>
          {user?.image ? (
            <Img source={{ uri: user?.image }} style={styles.profileImage} />
          ) : (
            <View style={styles.imageWrapper}>
              <Ionicons name="person" size={24} color={colors.primary} />
            </View>
          )}
          <View style={styles.userInfo}>
            <RNText style={externalStyles.txtLg} color="primary">
              {user?.name}
            </RNText>
            <RNText style={externalStyles.txtXs}>{user?.phone}</RNText>
          </View>
        </View>

        <View style={styles.menuList}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                if (item.title === "Sign Out") {
                  handleLogout();
                } else if (item.title === "Choose Language") {
                  bottomSheetRef.current.open();
                } else {
                  navigation.navigate(item.screen);
                }
              }}
              activeOpacity={1}
              key={index}
            >
              <RNView style={styles.menuItem}>
                <View style={styles.menuContent}>
                  {item.iconName ? (
                    <item.icon
                      name={item.iconName}
                      size={25}
                      color={colors.primary}
                    />
                  ) : (
                    <Img
                      source={item.icon}
                      width={25}
                      height={25}
                      color={colors.primary}
                    />
                  )}
                  <RNText style={styles.menuText}>{item.title}</RNText>
                </View>
                <Img source={arrow} style={styles.arrowIcon} />
              </RNView>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <RBSheet
        ref={bottomSheetRef}
        height={250}
        openDuration={200}
        closeDuration={150}
        customStyles={{
          container: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 20,
            paddingBottom: 10,
            backgroundColor: colors.background,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5,
          },
        }}
      >
        <View style={styles.sheetContainer}>
          <RNText style={styles.sheetTitle}>Select Language</RNText>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              onPress={() => selectLanguage(lang.code)}
              style={[
                styles.languageOption,
                selectedLanguage === lang.code && styles.selectedLanguage,
              ]}
            >
              <RNText
                style={[
                  styles.languageText,
                  selectedLanguage === lang.code && styles.selectedLanguageText,
                ]}
              >
                {lang.name}
              </RNText>
              {selectedLanguage === lang.code && (
                <MaterialCommunityIcons
                  name="check-circle"
                  size={20}
                  color={colors.primary}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </RBSheet>
    </>
  );
};

export default Menu;

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    backgroundColor: colors.background,
    paddingHorizontal: horizantGap,
    gap: 15,
    paddingBottom: 20,
    paddingTop: 5,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  userInfo: {
    justifyContent: "center",
  },
  menuList: {
    gap: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuText: {
    marginLeft: 20,
    fontSize: 13,
    fontWeight: "semiBold",
    color: colors.primary,
    textAlign: "left",
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: colors.primary,
  },
  sheetContainer: {
    flex: 1,
    gap: 0,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.primary,
    marginBottom: 12,
  },
  languageOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: colors.background,
  },
  selectedLanguage: {
    backgroundColor: colors.primary + "15",
  },
  languageText: {
    fontSize: 15,
    color: colors.primary,
  },
  selectedLanguageText: {
    fontWeight: "600",
  },
  imageWrapper: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },
});
