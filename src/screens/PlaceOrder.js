import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import RNText from "../components/ui/RNText";
import Header from "../components/global/Header";
import colors, { externalStyles } from "../utils/Theme";
import { horizantGap, primarBorderRadius, txtMd } from "../utils/Constant";
import Img from "../components/ui/Img";
import calender from "../../assets/order/calender.svg";
import visa from "../../assets/order/visa.svg";
import location from "../../assets/order/location.svg";
import ellipse from "../../assets/order/ellipse.png";
import RNView from "../components/ui/RNView";
import Button from "../components/ui/Button";
import RNTextInput from "../components/ui/RNTextInput";

const PlaceOrder = ({ navigation }) => {
  return (
    <>
      <Header title="Place Order" />
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.deliveryDetails}>
            <RNView style={styles.topContainer}>
              <View style={styles.left}>
                <RNText style={externalStyles.txtSm} fontWeight="semiBold">
                  Select pick-up
                </RNText>
                <RNText style={externalStyles.txtSm}>6 May, 2025</RNText>
                <RNText style={externalStyles.txtSm}>7PM- 8PM</RNText>
              </View>
              <View style={styles.date}>
                <Img source={calender} width={22} height={22} />
              </View>
            </RNView>
            <RNView style={styles.topContainer}>
              <View style={styles.left}>
                <RNText style={externalStyles.txtSm} fontWeight="semiBold">
                  Select pick-up
                </RNText>
                <RNText style={externalStyles.txtSm}>6 May, 2025</RNText>
                <RNText style={externalStyles.txtSm}>7PM- 8PM</RNText>
              </View>
              <View style={styles.date}>
                <Img source={calender} width={22} height={22} />
              </View>
            </RNView>
          </View>

          <RNView style={styles.location}>
            <Img source={location} width={9.53} height={15} />
            <RNText>Muwaileh Park, Sharjah, UAE</RNText>
          </RNView>

          <View style={styles.fee}>
            <RNText>Delivery fee</RNText>
            <RNText style={{ marginRight: 30 }}>5.00 AED</RNText>
          </View>

          <View style={{ gap: 5 }}>
            <View style={styles.promoSec}>
              <View style={styles.promocode}>
                <TextInput placeholder="Add Promo Code" />
              </View>
              <View style={styles.apply}>
                <RNText style={{ color: colors.white }}>Apply</RNText>
              </View>
            </View>
            <Text>
              Your invoice will be shared shortly.{" "}
              <Text style={{ fontWeight: "500" }}>(Minimum Order 30 AED)</Text>
            </Text>
          </View>

          <View style={styles.driver}>
            <RNText fontWeight="bold">Driver Tip</RNText>
            <RNTextInput placeholder="0.00" />

            <View style={styles.driverTip}>
              <RNView style={styles.driverInput}>
                <RNText>3</RNText>
              </RNView>
              <RNView style={styles.driverInput}>
                <RNText>5</RNText>
              </RNView>
              <RNView style={styles.driverInput}>
                <RNText>10</RNText>
              </RNView>
              <RNView style={styles.driverInput}>
                <RNText>20</RNText>
              </RNView>
              <RNView style={styles.driverInput}>
                <RNText>30</RNText>
              </RNView>
              <RNView style={styles.driverInput}>
                <RNText>50</RNText>
              </RNView>
            </View>
          </View>

          <RNTextInput placeholder="Anything else you’d like us to know?" />

          <View style={styles.method}>
            <RNText fontWeight="bold">Payment Method</RNText>
            <View style={styles.payment}>
              <RNView>
                <RNText
                  style={{
                    color: colors.primary,
                    paddingHorizontal: 5,
                    fontSize: txtMd,
                  }}
                >
                  Cash
                </RNText>
              </RNView>
              <RNView style={{ backgroundColor: colors.primary }}>
                <RNText
                  style={{
                    color: colors.white,
                    paddingHorizontal: 10,
                    fontSize: txtMd,
                  }}
                >
                  Credit Card
                </RNText>
              </RNView>
              <RNView>
                <RNText
                  style={{
                    color: colors.primary,
                    paddingHorizontal: 5,
                    fontSize: txtMd,
                  }}
                >
                  Wallet
                </RNText>
              </RNView>
            </View>
          </View>

          <View>
            <RNView style={styles.visa}>
              <View style={styles.leftSide}>
                <View style={styles.imgContainer}>
                  <Img
                    source={visa}
                    width={32}
                    height={10}
                    style={styles.img}
                  />
                </View>
                <View>
                  <RNText style={externalStyles.txtMd} fontWeight="bold">
                    VISA xxxx 8047
                  </RNText>
                  <RNText>Expires on 05/29</RNText>
                </View>
              </View>

              <View style={styles.rightSide}>
                <Img source={ellipse} width={6} height={6} />
                <Img source={ellipse} width={6} height={6} />
                <Img source={ellipse} width={6} height={6} />
              </View>
            </RNView>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("card")}
            activeOpacity={1}
          >
            <RNView style={styles.newCard}>
              <RNText
                fontWeight="bold"
                style={externalStyles.txtMd}
                color="primary"
              >
                + Add New Card
              </RNText>
            </RNView>
          </TouchableOpacity>

          <Button
            onPress={() => navigation.navigate("confirm")}
            title={"Confirm Order"}
            variant="gradient"
          />
        </View>
      </ScrollView>
    </>
  );
};

export default PlaceOrder;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: horizantGap,
    paddingBottom: "10%",
    gap: 20,
    paddingTop: 10,
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
  left: {
    gap: 8,
  },
  date: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  deliveryDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  topContainer: {
    width: "49%",
    flexDirection: "row",
    paddingVertical: 17,
    justifyContent: "space-between",
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  fee: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  promoSec: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  promocode: {
    flex: 1,
    backgroundColor: colors.white,
    borderStartStartRadius: primarBorderRadius,
    borderStartEndRadius: primarBorderRadius,
    paddingHorizontal: 10,

    elevation: 1,
  },
  apply: {
    backgroundColor: colors.primary,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderEndEndRadius: primarBorderRadius,
    borderEndStartRadius: primarBorderRadius,
    elevation: 1,
  },
  driver: {
    gap: 5,
  },
  driverTip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 10,
    marginTop: 3,
  },
  driverInput: {
    flexDirection: "row",
    width: "14%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },

  payment: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  method: {
    gap: 10,
  },
  imgContainer: {
    width: 42,
    height: 29,
    backgroundColor: colors.primary,
    borderRadius: primarBorderRadius,
  },
  img: {
    position: "absolute",
    top: 10,
    left: 4,
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  visa: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rightSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  newCard: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
