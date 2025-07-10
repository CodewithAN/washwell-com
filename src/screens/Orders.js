import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import RNText from "../components/ui/RNText";
import colors, { externalStyles } from "../utils/Theme";
import Img from "../components/ui/Img";
import whatsapp from "../../assets/icons/whatsapp.svg";
import dollar from "../../assets/icons/dollar.svg";
import bell from "../../assets/icons/Outlined.svg";
import back from "../../assets/icons/back.svg";
import { horizantGap, txtMd, txtXs } from "../utils/Constant";
import notification from "../../assets/icons/Notification.svg";
import choose from "../../assets/icons/choosesearch.svg";
import dryClean from "../../assets/icons/dry.svg";
import Button from "../components/ui/Button";

const Orders = ({ navigation }) => {
  return (
    <>
      <View style={styles.top}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          style={{ flex: 0.33 }}
        >
          <Img height={25} width={25} source={back} style={styles.menuIcon} />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <RNText
            style={externalStyles.txtXl}
            color="primary"
            fontWeight="bold"
          >
            Orders
          </RNText>
        </View>
        <View style={styles.rightIcons}>
          <Img source={whatsapp} style={{ height: 24, width: 24 }} />
          <Img source={dollar} style={styles.notificationIcon} />
          <View style={styles.notificationWrapper}>
            <Img source={bell} style={styles.notificationIcon} />
            <View style={styles.notificationDot} />
          </View>
        </View>
      </View>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <View>
          <Img
            source={notification}
            style={styles.homeImage}
            resizeMode="contain"
          />
        </View>

        <View style={externalStyles.searchBar}>
          <Img source={choose} width={16} height={16} />
          <TextInput
            placeholder="Search Orders ..."
            placeholderTextColor={colors.gray}
            style={externalStyles.height}
          />
        </View>

        <RNText fontWeight="medium" style={externalStyles.txtMd}>
          Today
        </RNText>
        {/* Static Order Card for Today */}
        <View style={styles.orders}>
          {/* 1 */}
          <View style={styles.orderCard}>
            <View style={styles.orderTopRow}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Img source={dryClean} style={styles.orderIcon} />
                <View style={styles.text}>
                  <RNText style={styles.orderTitle}>Only Dry</RNText>
                  <RNText style={styles.orderLocation}>
                    Muwaileh Park, Sharjah
                  </RNText>
                </View>
              </View>
              <View style={{ alignItems: "flex-end", gap: 5 }}>
                <RNText style={styles.orderDate}>03 Jul 2025, 4:45 PM</RNText>
                <RNText style={styles.orderPrice}>20 AED</RNText>
              </View>
            </View>
            <View style={styles.orderBottomRow}>
              <RNText style={styles.orderId}>Order ID: 1232856</RNText>
              <RNText style={styles.viewMore}>View More</RNText>
            </View>
          </View>
          {/* 2 */}
          <View style={styles.orderCard}>
            <View style={styles.orderTopRow}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Img source={dryClean} style={styles.orderIcon} />
                <View style={styles.text}>
                  <RNText style={styles.orderTitle}>Wash & Fold</RNText>
                  <RNText style={styles.orderLocation}>
                    Muwaileh Park, Sharjah
                  </RNText>
                </View>
              </View>
              <View style={{ alignItems: "flex-end", gap: 5 }}>
                <RNText style={styles.orderDate}>03 Jul 2025, 4:50 PM</RNText>
                <RNText style={styles.orderPrice}>30 AED</RNText>
              </View>
            </View>
            <View style={styles.orderBottomRow}>
              <RNText style={styles.orderId}>Order ID: 1232864</RNText>
              <RNText style={styles.viewMore}>View More</RNText>
            </View>
          </View>
          {/* 3 */}
          <View style={styles.orderCard}>
            <View style={styles.orderTopRow}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Img source={dryClean} style={styles.orderIcon} />
                <View style={styles.text}>
                  <RNText style={styles.orderTitle}>Only Dry</RNText>
                  <RNText style={styles.orderLocation}>
                    Muwaileh Park, Sharjah
                  </RNText>
                </View>
              </View>
              <View style={{ alignItems: "flex-end", gap: 5 }}>
                <RNText style={styles.orderDate}>03 Jul 2025, 4:55 PM</RNText>
                <RNText style={styles.orderPrice}>20 AED</RNText>
              </View>
            </View>
            <View style={styles.orderBottomRow}>
              <RNText style={styles.orderId}>Order ID: 1232889</RNText>
              <RNText style={styles.viewMore}>View More</RNText>
            </View>
          </View>
        </View>

        <RNText fontWeight="medium" style={externalStyles.txtMd}>
          05 Apr 2025
        </RNText>
        {/* Static Order Card for 05 Apr 2025 */}
        <View style={styles.orders}>
          <View style={styles.orderCard}>
            <View style={styles.orderTopRow}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Img source={dryClean} style={styles.orderIcon} />
                <View style={styles.text}>
                  <RNText style={styles.orderTitle}>Wash & Fold</RNText>
                  <RNText style={styles.orderLocation}>
                    Muwaileh Park, Sharjah
                  </RNText>
                </View>
              </View>
              <View style={{ alignItems: "flex-end", gap: 5 }}>
                <RNText style={styles.orderDate}>05 Apr 2025, 8 ocean:46 AM</RNText>
                <RNText style={styles.orderPrice}>30 AED</RNText>
              </View>
            </View>
            <View style={styles.orderBottomRow}>
              <RNText style={styles.orderId}>Order ID: 1232890</RNText>
              <RNText style={styles.viewMore}>View More</RNText>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Place Order Button */}
       <View style={styles.fixedButtonContainer}>
        <Button
          onPress={() => navigation.navigate("cart")}
          title={"Place Order"}
          variant="gradient"
          style={styles.fixedButton}
        />
      </View>
    </>
  );
};

export default Orders;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: horizantGap,
  },
  contentContainer: {
    paddingBottom: 100, 
    gap: 20,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: horizantGap,
    height: 45,
    backgroundColor: colors.background,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationIcon: {
    width: 22,
    height: 22,
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    flex: 0.33,
    justifyContent: "flex-end",
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
  homeImage: {
    width: "100%",
    height: 60,
    marginTop: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 10,
  },
  orders: {
    gap: 5,
  },
  orderCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    position: "relative",
  },
  orderTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  orderIcon: {
    width: 32,
    height: 34,
    marginRight: 10,
  },
  text: {
    gap: 5,
  },
  orderTitle: {
    fontWeight: "semiBold",
    fontSize: txtMd,
  },
  orderLocation: {
    fontSize: txtXs,
    color: "#28292C",
  },
  orderPrice: {
    fontWeight: "bold",
    fontSize: txtMd,
  },
  orderDate: {
    fontSize: txtXs,
    color: "#28292C", 
  },
  orderBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  orderId: {
    color: colors.primary,
    fontSize: txtMd,
  },
  viewMore: {
    fontSize: txtXs,
    textDecorationLine: "underline",
  },
  fixedButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: horizantGap,
    alignItems: "center",
  },

});