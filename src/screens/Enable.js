import { StyleSheet, View, Dimensions } from "react-native";
import RNText from "../components/ui/RNText";
import colors, { externalStyles } from "../utils/Theme";
import { horizantGap } from "../utils/Constant";
import enable from "../../assets/images/global/enable.svg";
import Img from "../components/ui/Img";
import Button from "../components/ui/Button";

const Enable = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <RNText
          fontWeight="medium"
          color="primary"
          style={[externalStyles.txtLg, styles.heading]}
        >
          Enable Location
        </RNText>
        <View style={styles.textWrapper}>
          <RNText style={styles.text}>
            Haier Wash collects location data to show you nearest Haier Wash
            zones. Allow Haier Wash to access this device’s location.
          </RNText>
        </View>
      </View>
      <View style={styles.imgWrapper}>
        <Img source={enable} style={styles.image} />
      </View>
      <Button
        onPress={() => navigation.navigate("choose")}
        title="Turn on location"
        variant="gradient"
        style={styles.button}
      />
    </View>
  );
};

export default Enable;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    paddingHorizontal: horizantGap,
    paddingVertical: "13%",
    justifyContent: "space-between",
  },
  heading: {
    textAlign: "center",
  },
  inputContainer: {
    alignItems: "center",
    gap: 12,
  },
  text: {
    textAlign: "center",
  },
  imgWrapper: {
    width: "100%",
    aspectRatio: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  button: {
    width: "100%",
    alignSelf: "center",
  },
  textWrapper: {
    width: "80%",
  },
});
