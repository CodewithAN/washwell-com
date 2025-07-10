import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Header from "../components/global/Header";
import RNText from "../components/ui/RNText";
import colors, { externalStyles } from "../utils/Theme";
import { horizantGap, txtXs } from "../utils/Constant";
import Img from "../components/ui/Img";
import person from "../../assets/menu/personal.png";
import details from "../../assets/icons/detail.svg";
import Button from "../components/ui/Button";
import RNTextInput from "../components/ui/RNTextInput";

const Details = () => {
  return (
    <>
      <Header space title="Personal Details" />
      <View style={styles.mainContainer}>
        <View style={styles.images}>
          <Img source={person} width={46} height={46} />
          <Img source={details} width={20} height={20} />
        </View>

        <View style={styles.details}>
          <RNTextInput placeholder="Shahid" label={"First Name"} />
          <RNTextInput placeholder="Abid" label={"Last Name"} />
          <RNTextInput placeholder="shahidabid94@gmail.com" label={"Email"} />
          <RNTextInput placeholder="+971 8800850641" label={"Phone Number"} />
          <RNTextInput placeholder="Change Password" />
          <TouchableOpacity activeOpacity={0.7}>
            <RNText style={styles.link}>Change Address</RNText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity activeOpacity={0.7}>
          <Button title={"Confirm"} variant="gradient" style={styles.button} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Details;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: horizantGap,
    paddingBottom: "13%",
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
  images: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  details: {
    gap: 8,
    flex: 1,
  },

  input: {
    paddingVertical: 11,
  },
  link: {
    textAlign: "right",
    color: colors.primary,
    textDecorationLine: "underline",
    textDecorationColor: colors.primary,
    fontSize: txtXs,
    fontWeight: "semiBold",
  },
});
