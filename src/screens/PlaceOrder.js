import React, { useState, useEffect, useRef } from "react";
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
import {
  horizantGap,
  primarBorderRadius,
  txtMd,
  txtSm,
} from "../utils/Constant";
import Img from "../components/ui/Img";
import calender from "../../assets/order/calender.svg";
import visa from "../../assets/order/visa.svg";
import location from "../../assets/order/location.svg";
import ellipse from "../../assets/order/ellipse.png";
import RNView from "../components/ui/RNView";
import Button from "../components/ui/Button";
import RNTextInput from "../components/ui/RNTextInput";
import RBSheet from "react-native-raw-bottom-sheet";
import Toast from "react-native-toast-message";
import { axiosInstance } from "../utils/Api";
import { Ionicons, MaterialIcons } from "expo-vector-icons";
import font from "../utils/Fonts";

const getLocalDate = (offsetDays = 0) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Reset to start of day
  now.setDate(now.getDate() + offsetDays);
  return now;
};

const PlaceOrder = ({ navigation }) => {
  const [tip, setTip] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [pickupDate, setPickupDate] = useState(null);
  const [pickupSlot, setPickupSlot] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [deliverySlot, setDeliverySlot] = useState(null);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [availableDays, setAvailableDays] = useState([]);
  const [startTime, setStartTime] = useState("08:00 AM");
  const [endTime, setEndTime] = useState("05:00 PM");
  const [pickupDates, setPickupDates] = useState([]);
  const [deliveryDates, setDeliveryDates] = useState([]);
  const [pickupSlots, setPickupSlots] = useState([]);
  const [deliverySlots, setDeliverySlots] = useState([]);
  const pickupSheetRef = useRef(null);
  const deliverySheetRef = useRef(null);

  const fetchConfigurations = async () => {
    try {
      let instance = await axiosInstance();
      let resp = await instance.get("/configurations");
      let data = resp.data.data;
      setDeliveryCharge(data.delivery_charges || 0);
      setAvailableDays(data.office_available_days || []);
      setStartTime(data.office_start_time || "08:00 AM");
      setEndTime(data.office_end_time || "05:00 PM");
      const slots = generateSlots(
        data.office_start_time || "08:00 AM",
        data.office_end_time || "05:00 PM"
      );
      setPickupSlots(slots);
      setDeliverySlots(slots);
      setPickupDates(generatePickupDates());
      console.log("Pickup Slots:", slots);
      console.log("Delivery Slots:", slots);
    } catch (error) {
      console.error("Error fetching configurations:", error);
      const fallbackSlots = generateSlots("08:00 AM", "05:00 PM");
      setPickupSlots(fallbackSlots);
      setDeliverySlots(fallbackSlots);
    }
  };

  useEffect(() => {
    fetchConfigurations();
  }, []);

  useEffect(() => {
    if (pickupDate) {
      const newDeliveryDates = generateDeliveryDates();
      const newDeliverySlots = generateDeliverySlots();
      console.log("Delivery Dates:", newDeliveryDates);
      console.log("Delivery Slots:", newDeliverySlots);
      setDeliveryDates(newDeliveryDates);
      setDeliverySlots(newDeliverySlots);
    }
  }, [pickupDate, pickupSlot, startTime, endTime, availableDays]);

  const generatePickupDates = () => {
    const today = getLocalDate();
    const dateList = [];
    let daysAdded = 0;
    while (dateList.length < 7) {
      const date = getLocalDate(daysAdded);
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
      if (availableDays.length > 0 && availableDays.includes(dayName)) {
        dateList.push({
          date: date,
          label: date.toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "short",
          }),
        });
      } else if (availableDays.length === 0) {
        dateList.push({
          date: date,
          label: date.toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "short",
          }),
        });
      }
      daysAdded++;
    }
    return dateList;
  };

  const generateDeliveryDates = () => {
    if (!pickupDate) return [];
    const startDate = new Date(pickupDate);
    startDate.setDate(startDate.getDate() + 1);
    const dateList = [];
    let daysAdded = 0;
    while (dateList.length < 7) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + daysAdded);
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
      if (availableDays.length > 0 && availableDays.includes(dayName)) {
        dateList.push({
          date: date,
          label: date.toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "short",
          }),
        });
      } else if (availableDays.length === 0) {
        dateList.push({
          date: date,
          label: date.toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "short",
          }),
        });
      }
      daysAdded++;
    }
    return dateList;
  };

  const generateSlots = (start, end) => {
    const slotsList = [];
    try {
      const parseTime = (timeStr) => {
        const [time, period] = timeStr.trim().split(" ");
        const [hours, minutes] = time.split(":").map(Number);
        return {
          hours: period === "PM" && hours !== 12 ? hours + 12 : hours,
          minutes,
          period,
        };
      };

      const startTime = parseTime(start);
      const endTime = parseTime(end);

      let currentHour = startTime.hours;
      while (currentHour < endTime.hours) {
        const startHour12 = currentHour % 12 || 12;
        const endHour12 = (currentHour + 1) % 12 || 12;
        const startAmPm = currentHour >= 12 ? "pm" : "am";
        const endAmPm = currentHour + 1 >= 12 ? "pm" : "am";
        slotsList.push(
          `${startHour12}:00 ${startAmPm} - ${endHour12}:00 ${endAmPm}`
        );
        currentHour++;
      }
    } catch (error) {
      console.error("Error generating slots:", error);
      return [
        "8:00 am - 9:00 am",
        "9:00 am - 10:00 am",
        "10:00 am - 11:00 am",
        "11:00 am - 12:00 pm",
        "12:00 pm - 1:00 pm",
        "1:00 pm - 2:00 pm",
        "2:00 pm - 3:00 pm",
        "3:00 pm - 4:00 pm",
        "4:00 pm - 5:00 pm",
      ];
    }
    return slotsList;
  };

  const generateDeliverySlots = () => {
    if (!pickupDate || !pickupSlot) {
      return generateSlots(startTime, endTime);
    }

    const slotsList = [];
    try {
      const [pickupStart, pickupPeriod] = pickupSlot.split(" - ")[0].split(" ");
      const pickupHour =
        parseInt(pickupStart.split(":")[0], 10) +
        (pickupPeriod.toLowerCase() === "pm" && pickupStart !== "12:00"
          ? 12
          : 0);

      const parseTime = (timeStr) => {
        const [time, period] = timeStr.trim().split(" ");
        const [hours] = time.split(":").map(Number);
        return period.toUpperCase() === "PM" && hours !== 12
          ? hours + 12
          : hours;
      };

      const startHour = parseTime(startTime);
      const endHour = parseTime(endTime);

      const firstDeliveryDate = new Date(pickupDate);
      firstDeliveryDate.setDate(firstDeliveryDate.getDate() + 1);

      const isFirstDeliveryDate =
        deliveryDate &&
        deliveryDate.toDateString() === firstDeliveryDate.toDateString();

      let firstSlotHour;
      if (isFirstDeliveryDate) {
        firstSlotHour = pickupHour;
      } else {
        firstSlotHour = startHour;
      }

      for (let hour = firstSlotHour; hour < endHour; hour++) {
        const startHour12 = hour % 12 || 12;
        const endHour12 = (hour + 1) % 12 || 12;
        const startAmPm = hour >= 12 ? "pm" : "am";
        const endAmPm = hour + 1 >= 12 ? "pm" : "am";
        slotsList.push(
          `${startHour12}:00 ${startAmPm} - ${endHour12}:00 ${endAmPm}`
        );
      }
    } catch (error) {
      console.error("Error generating delivery slots:", error);
      return generateSlots(startTime, endTime);
    }
    return slotsList;
  };

  const handleTipPress = (value) => setTip(value.toString());
  const handlePaymentMethodPress = (method) => setPaymentMethod(method);
  const handleDateSelect = (type, date) => {
    if (type === "pickup") setPickupDate(date);
    else if (type === "delivery") setDeliveryDate(date);
  };
  const handleSlotSelect = (type, slot) => {
    if (type === "pickup") setPickupSlot(slot);
    else if (type === "delivery") setDeliverySlot(slot);
  };
  const handleDone = (type) => {
    if (type === "pickup") {
      pickupSheetRef.current?.close();
      // if (pickupDate && pickupSlot) {
      // } else {
      // Toast.show({
      //   type: "info",
      //   text1: "Selection Required",
      //   text2: "Please select both date and slot.",
      // });
      // }
    } else if (type === "delivery") {
      // if (deliveryDate && deliverySlot) {
      deliverySheetRef.current?.close();
      // } else {
      //   Toast.show({
      //     type: "info",
      //     text1: "Selection Required",
      //     text2: "Please select both date and slot.",
      //   });
      // }
    }
  };
  const handleBack = (type) => {
    if (type === "pickup") {
      setPickupDate(null);
      setPickupSlot(null);
      pickupSheetRef.current?.close();
    } else if (type === "delivery") {
      setDeliveryDate(null);
      setDeliverySlot(null);
      deliverySheetRef.current?.close();
    }
  };

  const handleOpenSheet = (ref) => {
    if (ref === deliverySheetRef && (!pickupDate || !pickupSlot)) {
      Toast.show({
        type: "info",
        text1: "Selection Required",
        text2: "Please select both pickup date and slot first.",
      });
      return;
    }
    if (ref.current) {
      ref.current.open();
    }
  };

  const handleConfirmOrder = () => {
    navigation.navigate("confirm");
  };

  return (
    <>
      <Header space title="Place Order" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.mainContainer}>
          <View style={styles.deliveryDetails}>
            <RNView style={styles.topContainer}>
              <View style={styles.left}>
                <RNText style={externalStyles.txtSm} fontWeight="medium">
                  Pick Up
                </RNText>
                <RNText style={externalStyles.txtSm}>
                  {pickupDate?.toLocaleDateString("en-US", {
                    weekday: "long",
                    day: "numeric",
                    month: "short",
                  }) || "Not selected"}
                </RNText>
                <RNText style={externalStyles.txtSm}>
                  {pickupSlot || "Not selected"}
                </RNText>
              </View>
              <TouchableOpacity
                style={styles.date}
                onPress={() => handleOpenSheet(pickupSheetRef)}
                activeOpacity={0.7}
              >
                <Img source={calender} width={22} height={22} />
              </TouchableOpacity>
            </RNView>

            <RNView style={styles.topContainer}>
              <View style={styles.left}>
                <RNText style={externalStyles.txtSm} fontWeight="medium">
                  Delivery
                </RNText>
                <RNText style={externalStyles.txtSm}>
                  {deliveryDate?.toLocaleDateString("en-US", {
                    weekday: "long",
                    day: "numeric",
                    month: "short",
                  }) || "Not selected"}
                </RNText>
                <RNText style={externalStyles.txtSm}>
                  {deliverySlot || "Not selected"}
                </RNText>
              </View>
              <TouchableOpacity
                style={styles.date}
                onPress={() => handleOpenSheet(deliverySheetRef)}
                activeOpacity={0.7}
              >
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
            <RNText
              style={{ textAlign: "right" }}
            >{`${deliveryCharge} AED`}</RNText>
          </View>

          <View style={{ gap: 5 }}>
            <View style={styles.promoSec}>
              <View style={styles.promocode}>
                <TextInput placeholder="Add Promo Code" />
              </View>
              <TouchableOpacity style={styles.apply} onPress={() => {}}>
                <RNText style={{ color: colors.white }}>Apply</RNText>
              </TouchableOpacity>
            </View>
            <View style={[externalStyles.row, { width: "100%" }]}>
              <RNText>
                Your invoice will be shared shortly. (Minimum Order 30 AED)
              </RNText>
            </View>
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
                  style={styles.driverInput}
                  onPress={() => handleTipPress(amount)}
                  activeOpacity={0.7}
                >
                  <RNText>{amount}</RNText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <RNTextInput placeholder="Anything else you’d like us to know?" />

          <View style={styles.method}>
            <RNText fontWeight="medium">Payment Method</RNText>
            <View
              style={[
                styles.payment,
                paymentMethod !== "Credit Card" && { marginBottom: "15%" },
              ]}
            >
              {["Cash", "Credit Card", "Wallet"].map((method) => (
                <TouchableOpacity
                  key={method}
                  style={[
                    styles.paymentOption,
                    paymentMethod === method
                      ? { backgroundColor: colors.primary }
                      : { backgroundColor: colors.white },
                  ]}
                  onPress={() => handlePaymentMethodPress(method)}
                  activeOpacity={0.7}
                >
                  <RNText
                    style={{
                      color:
                        paymentMethod === method
                          ? colors.white
                          : colors.primary,
                      paddingHorizontal: method === "Credit Card" ? 10 : 5,
                      fontSize: txtSm,
                    }}
                  >
                    {method}
                  </RNText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {paymentMethod === "Credit Card" && (
            <>
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
                activeOpacity={0.7}
              >
                <RNView style={styles.newCard}>
                  <RNText
                    fontWeight="medium"
                    style={externalStyles.txtMd}
                    color="primary"
                  >
                    + Add New Card
                  </RNText>
                </RNView>
              </TouchableOpacity>
            </>
          )}

          <Button
            onPress={handleConfirmOrder}
            title={"Confirm Order"}
            variant="gradient"
          />
        </View>
      </ScrollView>

      <RBSheet
        ref={pickupSheetRef}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: styles.bottomSheet,
          draggableIcon: styles.draggableIcon,
        }}
        height={600}
        openDuration={250}
      >
        <View style={styles.sheetContent}>
          <View>
            <RNText style={styles.sheetTitle}>Pick Up in Person</RNText>
          </View>
          <View style={styles.slotsContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.dateSection}
            >
              {pickupDates.length > 0 ? (
                pickupDates.map((item) => (
                  <TouchableOpacity
                    key={item.date.toISOString()}
                    style={[
                      styles.dateItem,
                      pickupDate?.toDateString() === item.date.toDateString() &&
                        styles.selectedDate,
                    ]}
                    onPress={() => handleDateSelect("pickup", item.date)}
                    activeOpacity={0.7}
                  >
                    <RNText style={styles.dateText}>
                      {item.label.split(",")[0]}
                    </RNText>
                    <RNText style={styles.dateText}>
                      {item.label.split(",")[1].trim()}
                    </RNText>
                  </TouchableOpacity>
                ))
              ) : (
                <RNText style={styles.dateText}>Loading dates...</RNText>
              )}
            </ScrollView>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.slotSection}
            >
              {pickupSlots.length > 0 ? (
                pickupSlots.map((slot) => (
                  <TouchableOpacity
                    key={slot}
                    style={[
                      styles.slotItem,
                      pickupSlot === slot && styles.selectedSlot,
                    ]}
                    onPress={() => handleSlotSelect("pickup", slot)}
                    activeOpacity={0.7}
                  >
                    <RNText style={styles.slotText}>between</RNText>
                    <RNText style={styles.slotText}>{slot}</RNText>
                  </TouchableOpacity>
                ))
              ) : (
                <RNText style={styles.slotText}>No slots available</RNText>
              )}
            </ScrollView>
          </View>
          <View style={styles.bottomButtons}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => handleBack("pickup")}
              activeOpacity={0.7}
            >
              <MaterialIcons
                name="keyboard-backspace"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => handleDone("pickup")}
              activeOpacity={0.7}
            >
              <RNText style={styles.buttonText}>Done</RNText>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>

      <RBSheet
        ref={deliverySheetRef}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: styles.bottomSheet,
          draggableIcon: styles.draggableIcon,
        }}
        height={600}
        openDuration={250}
      >
        <View style={styles.sheetContent}>
          <View>
            <RNText style={styles.sheetTitle}>Delivery in Person</RNText>
          </View>
          <View style={styles.slotsContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.dateSection}
            >
              {deliveryDates.length > 0 ? (
                deliveryDates.map((item) => (
                  <TouchableOpacity
                    key={item.date.toISOString()}
                    style={[
                      styles.dateItem,
                      deliveryDate?.toDateString() ===
                        item.date.toDateString() && styles.selectedDate,
                    ]}
                    onPress={() => handleDateSelect("delivery", item.date)}
                    activeOpacity={0.7}
                  >
                    <RNText style={styles.dateText}>
                      {item.label.split(",")[0]}
                    </RNText>
                    <RNText style={styles.dateText}>
                      {item.label.split(",")[1].trim()}
                    </RNText>
                  </TouchableOpacity>
                ))
              ) : (
                <RNText style={styles.dateText}>Loading dates...</RNText>
              )}
            </ScrollView>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.slotSection}
            >
              {deliverySlots.length > 0 ? (
                deliverySlots.map((slot) => (
                  <TouchableOpacity
                    key={slot}
                    style={[
                      styles.slotItem,
                      deliverySlot === slot && styles.selectedSlot,
                    ]}
                    onPress={() => handleSlotSelect("delivery", slot)}
                    activeOpacity={0.7}
                  >
                    <RNText style={styles.slotText}>between</RNText>
                    <RNText style={styles.slotText}>{slot}</RNText>
                  </TouchableOpacity>
                ))
              ) : (
                <RNText style={styles.slotText}>No slots available</RNText>
              )}
            </ScrollView>
          </View>
          <View style={styles.bottomButtons}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => handleBack("delivery")}
              activeOpacity={0.7}
            >
              <MaterialIcons
                name="keyboard-backspace"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => handleDone("delivery")}
              activeOpacity={0.7}
            >
              <RNText style={styles.buttonText}>Done</RNText>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>

      <Toast />
    </>
  );
};

export default PlaceOrder;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: horizantGap,
    paddingBottom: 20,
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
  slotsContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
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
    borderStartStartRadius: primarBorderRadius - 3,
    borderStartEndRadius: primarBorderRadius - 3,
    paddingHorizontal: 10,
    elevation: 1,
  },
  apply: {
    backgroundColor: colors.primary,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderEndEndRadius: primarBorderRadius - 3,
    borderEndStartRadius: primarBorderRadius - 3,
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
    borderRadius: primarBorderRadius - 3,
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
    borderRadius: primarBorderRadius - 3,
  },
  imgContainer: {
    width: 42,
    height: 29,
    backgroundColor: colors.primary,
    borderRadius: primarBorderRadius - 3,
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
  bottomSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    backgroundColor: colors.white,
  },
  draggableIcon: {
    backgroundColor: "#000",
  },
  sheetContent: {
    flex: 1,
    paddingBottom: 3,
    paddingHorizontal: 7,
  },
  sheetTitle: {
    fontSize: txtMd,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 15,
    marginTop: 10,
    color: colors.black,
  },
  dateSection: {
    flex: 0.2,
    paddingRight: 5,
  },
  slotSection: {
    flex: 1,
    paddingLeft: 5,
    minHeight: 200,
  },
  dateItem: {
    paddingVertical: 10,
    paddingLeft: 8,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  selectedDate: {
    backgroundColor: colors.lightGreen,
    borderColor: colors.lightGreen,
  },
  slotItem: {
    paddingVertical: 10,
    paddingLeft: 8,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  selectedSlot: {
    backgroundColor: colors.lightGreen,
    borderColor: colors.lightGreen,
  },
  dateText: {
    color: colors.black,
    textAlign: "left",
    fontSize: txtSm,
  },
  slotText: {
    color: colors.black,
    textAlign: "left",
    fontSize: txtSm,
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 10,
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.lightGray,
  },
  doneButton: {
    borderRadius: 10,
    backgroundColor: colors.background,
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: txtSm,
    textAlign: "center",
    fontFamily: font.medium,
  },
});
