import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Header from "../components/global/Header";
import RNText from "../components/ui/RNText";
import colors, { externalStyles } from "../utils/Theme";
import { horizantGap } from "../utils/Constant";
import RNView from "../components/ui/RNView";
import Divider from "../components/auth/Divider";
import Button from "../components/ui/Button";

const Payment = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.top}>
        <Header />
        <View style={styles.textContainer}>
          <RNText
            style={externalStyles.txtLg}
            color="primary"
            fontWeight="medium"
          >
            Payment Methods
          </RNText>
        </View>
      </View>

      <View>
        <RNText style={externalStyles.txtMd} color="primary" fontWeight="bold">
          Add Payment Methods
        </RNText>
      </View>

      <RNView>
        <RNText
          style={[externalStyles.txtMd, { textAlign: "center" }]}
          fontWeight="semiBold"
        >
          Cash
        </RNText>
      </RNView>

      <Divider />

      <RNView>
        <RNText
          style={[externalStyles.txtMd, { textAlign: "center" }]}
          fontWeight="semiBold"
        >
          Credit Card
        </RNText>
      </RNView>

      <Divider />

      <View style={{ gap: 5 }}>
        <TouchableOpacity activeOpacity={0.7}>
          <Button title={"Washwell Wallet"} variant="gradient" />
        </TouchableOpacity>

        <RNText>
          Add funds to your washwell wallet using a valid debit card. Wallet
          funds then can be used to make an order on washwell website or mobile
          app{" "}
        </RNText>
      </View>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: horizantGap,
    gap: 20,
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
});
