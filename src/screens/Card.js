import { StyleSheet, View } from "react-native";
import logo from "../../assets/images/global/logo.svg";
import Img from "../components/ui/Img";
import { vw } from "../utils/ScreenSize";
import colors, { externalStyles } from "../utils/Theme";
import { API_URL, horizantGap } from "../utils/Constant";
import Button from "../components/ui/Button";
import RNText from "../components/ui/RNText";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { axiosInstance } from "../utils/Api";
import { startPayment } from "@network-international/react-native-ngenius";
const Card = () => {
  const [cardTokenError, setCardTokenError] = useState("");
  const [brandError, setBrandError] = useState("");
  const [last4Error, setLast4Error] = useState("");
  const [loading, setLoading] = useState(false);

  const generateDummyOrderId = () => {
    return `TEST_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  };

  const handleAddCard = async () => {
    setCardTokenError("");
    setBrandError("");
    setLast4Error("");

    let hasError = false;

    setLoading(true);
    try {
      const dummyOrderId = generateDummyOrderId();
      console.log(dummyOrderId, "dummyOrderId");
      const response = await startPayment({
        orderId: dummyOrderId,
        environment: "SANDBOX",
      });

      if (response.status === "SUCCESS") {
        const { cardToken, brand, last4 } = response;

        if (!cardToken) {
          setCardTokenError("Card token is missing");
          hasError = true;
        }
        if (!brand) {
          setBrandError("Brand is missing");
          hasError = true;
        }
        if (!last4) {
          setLast4Error("Last 4 digits are missing");
          hasError = true;
        }

        if (hasError) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Please correct the errors",
          });
          return;
        }

        await saveCard(cardToken, brand, last4);
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Card added successfully",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: response.errorMessage || "Failed to add card",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Card payment failed",
      });
      console.error("Card payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveCard = async (token, brand, last4) => {
    try {
      const formData = new FormData();
      formData.append("token", token);
      formData.append("brand", brand || "Unknown");
      formData.append("last4", last4 || "0000");

      const instance = await axiosInstance();
      await instance.post(API_URL + "/add-payment-card", formData);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to save card";
      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMessage,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Img source={logo} width={60 * vw} height={70} />
      </View>

      <View>
        <RNText style={externalStyles.txtLg} color="primary">
          Add Payment Card
        </RNText>
      </View>

      <View style={styles.inputContainer}>
        {/* Note: N-Genius SDK handles card input natively, so no manual input fields are needed here */}
      </View>

      <Button
        title="Add Card"
        variant="gradient"
        onPress={handleAddCard}
        loading={loading}
      />
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: horizantGap,
    gap: 25,
  },
  inputContainer: {
    width: "100%",
    gap: 10,
  },
});
