import React, { useState } from 'react';
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
import DateTimePickerModal from "react-native-modal-datetime-picker";


const getLocalDate = (offsetHours = 0) => {
  const now = new Date();
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
  now.setHours(now.getHours() + offsetHours);
  return new Date(now);
};

const PlaceOrder = ({ navigation }) => {
  const [tip, setTip] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [pickupDate, setPickupDate] = useState(getLocalDate());
  const [deliveryDate, setDeliveryDate] = useState(getLocalDate(24));
  const [showPickupPicker, setShowPickupPicker] = useState(false);
  const [showDeliveryPicker, setShowDeliveryPicker] = useState(false);

  const handleTipPress = (value) => setTip(value.toString());
  const handlePaymentMethodPress = (method) => setPaymentMethod(method);

  const handlePickupConfirm = (date) => {
    setPickupDate(date);
    setShowPickupPicker(false);
  };

  const handleDeliveryConfirm = (date) => {
    setDeliveryDate(date);
    setShowDeliveryPicker(false);
  };

  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (date) => {
    const startHour = date.getHours();
    const endHour = (startHour + 1) % 24;
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const formatHour = (hour) => {
      const h = hour % 12 || 12;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      return `${h}:${minutes} ${ampm}`;
    };

    return `${formatHour(startHour)} - ${formatHour(endHour)}`;
  };

  return (
    <>
      <Header space title="Place Order" />
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.deliveryDetails}>
            <RNView style={styles.topContainer}>
              <View style={styles.left}>
                <RNText style={externalStyles.txtSm} fontWeight="medium">
                  Select pick-up
                </RNText>
                <RNText style={externalStyles.txtSm}>{formatDate(pickupDate)}</RNText>
                <RNText style={externalStyles.txtSm}>{formatTime(pickupDate)}</RNText>
              </View>
              <TouchableOpacity style={styles.date} onPress={() => setShowPickupPicker(true)}>
                <Img source={calender} width={22} height={22} />
              </TouchableOpacity>
            </RNView>

            <RNView style={styles.topContainer}>
              <View style={styles.left}>
                <RNText style={externalStyles.txtSm} fontWeight="medium">
                  Select delivery
                </RNText>
                <RNText style={externalStyles.txtSm}>{formatDate(deliveryDate)}</RNText>
                <RNText style={externalStyles.txtSm}>{formatTime(deliveryDate)}</RNText>
              </View>
              <TouchableOpacity style={styles.date} onPress={() => setShowDeliveryPicker(true)}>
                <Img source={calender} width={22} height={22} />
              </TouchableOpacity>
            </RNView>
          </View>

          <RNView style={styles.location}>
            <Img source={location} width={9.53} height={15} />
            <RNText>Muwaileh Park, Sharjah, UAE</RNText>
          </RNView>

          <View style={styles.fee}>
            <RNText>Delivery fee</RNText>
            <RNText style={{ textAlign: "right" }}>5.00 AED</RNText>
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
            <RNText fontWeight="medium">Driver Tip</RNText>
            <RNTextInput
              placeholder="0.00"
              value={tip}
              onChangeText={setTip}
              keyboardType="numeric"
            />
            <View style={styles.driverTip}>
              {[3, 5, 10, 20, 30, 50].map((amount) => (
                <TouchableOpacity
                  key={amount}
                  style={[styles.driverInput]}
                  onPress={() => handleTipPress(amount)}
                >
                  <RNText>{amount}</RNText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <RNTextInput placeholder="Anything else you’d like us to know?" />

          <View style={styles.method}>
            <RNText fontWeight="medium">Payment Method</RNText>
            <View style={[styles.payment, paymentMethod !== 'Credit Card' && { marginBottom: "15%" }]}>
              {['Cash', 'Credit Card', 'Wallet'].map((method) => (
                <TouchableOpacity
                  key={method}
                  style={[
                    styles.paymentOption,
                    paymentMethod === method
                      ? { backgroundColor: colors.primary }
                      : { backgroundColor: colors.white },
                  ]}
                  onPress={() => handlePaymentMethodPress(method)}
                >
                  <RNText
                    style={{
                      color: paymentMethod === method ? colors.white : colors.primary,
                      paddingHorizontal: method === 'Credit Card' ? 10 : 5,
                      fontSize: txtMd,
                    }}
                  >
                    {method}
                  </RNText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {paymentMethod === 'Credit Card' && (
            <>
              <View>
                <RNView style={styles.visa}>
                  <View style={styles.leftSide}>
                    <View style={styles.imgContainer}>
                      <Img source={visa} width={32} height={10} style={styles.img} />
                    </View>
                    <View>
                      <RNText style={externalStyles.txtMd} fontWeight="medium">
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
                  <RNText fontWeight="medium" style={externalStyles.txtMd} color="primary">
                    + Add New Card
                  </RNText>
                </RNView>
              </TouchableOpacity>
            </>
          )}

          <Button
            onPress={() => navigation.navigate("confirm")}
            title={"Confirm Order"}
            variant="gradient"
          />
        </View>
      </ScrollView>

      <DateTimePickerModal
        isVisible={showPickupPicker}
        mode="datetime"
        date={pickupDate}
        onConfirm={handlePickupConfirm}
        onCancel={() => setShowPickupPicker(false)}
        minimumDate={new Date()}
      />
      <DateTimePickerModal
        isVisible={showDeliveryPicker}
        mode="datetime"
        date={deliveryDate}
        onConfirm={handleDeliveryConfirm}
        onCancel={() => setShowDeliveryPicker(false)}
        minimumDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
      />
    </>
  );
};

export default PlaceOrder;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: horizantGap,
    paddingBottom: "13%",
    gap: 20,
    paddingTop: 10,
  },
  topContainer: {
    width: "49%",
    flexDirection: "row",
    paddingVertical: 17,
    justifyContent: "space-between",
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
    borderRadius: primarBorderRadius,
    elevation: 1,
    backgroundColor: colors.white,
   
  },
  payment: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  method: {
    gap: 10,
  },
  paymentOption: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: primarBorderRadius,
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
