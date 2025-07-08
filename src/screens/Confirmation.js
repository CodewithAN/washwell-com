import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Header from "../components/global/Header";
import colors, { externalStyles } from "../utils/Theme";
import { horizantGap, txtMd } from "../utils/Constant";
import Img from "../components/ui/Img";
import ellipse from "../../assets/icons/ellipse.svg";
import tick from "../../assets/icons/tick.svg";
import Button from "../components/ui/Button";

const Confirmation = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <Header />

      <View style={styles.middleContainer}>
        {/* Tick Image */}
        <View style={styles.imageContainer}>
          <Img source={ellipse} style={styles.outer} />
          <Img source={tick} style={styles.inner} />
        </View>

        {/* Title */}
        <View>
          <Text style={[externalStyles.txtXl, styles.boldText]}>
            Congratulations!
          </Text>
        </View>

        {/* Order Info */}
        <View style={styles.textContainer}>
          <Text style={styles.text}>Your Laundry order has been placed,</Text>
          <Text style={styles.text}>
            under the Order Id : <Text style={styles.highlight}>95472312</Text>
          </Text>
        </View>

        {/* My Orders */}
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            You can track and edit your order from
          </Text>
          <Text>
            <Text style={styles.highlight}>My Orders</Text> page
          </Text>
        </View>

        {/* Cancel Info */}
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Having second thoughts? You can{" "}
            <Text style={styles.highlight}>cancel</Text>
          </Text>
          <Text>this order for free within the next ten</Text>
          <Text> minutes</Text>
        </View>
      </View>

      {/* Button */}
      <View style={styles.contentWrapper}>
        <Button
          onPress={() => navigation.navigate("home")}
          title={"Go to Homepage"}
          variant="gradient"
        />
      </View>
    </View>
  );
};

export default Confirmation;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: horizantGap,
    paddingBottom: "10%",
    gap: 20,
  },
  middleContainer: {
    marginTop: "24%",
    alignItems: "center",
    gap: 20,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  outer: {
    width: 126,
    height: 126,
  },
  inner: {
    position: "absolute",
    width: 64,
    height: 65,
    top: 30,
    left: 30,
  },
  textContainer: {
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontSize: txtMd,
  },
  highlight: {
    fontWeight: "bold",
  },
  boldText: {
    fontWeight: "bold",
    textAlign: "center",
  },

  contentWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
