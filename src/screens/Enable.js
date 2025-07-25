import { StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import RNText from "../components/ui/RNText";
import colors, { externalStyles } from "../utils/Theme";
import { horizantGap } from "../utils/Constant";
import enable from "../../assets/images/global/enable.svg";
import Img from "../components/ui/Img";
import Button from "../components/ui/Button";
import Toast from "react-native-toast-message";

const Enable = ({ navigation }) => {
  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      navigation.replace("location");
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Location permission denied. Please enable location services.",
      });
    }
  };

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
        onPress={requestLocationPermission}
        title="Turn on location"
        variant="gradient"
        style={styles.button}
      />
      <Toast />
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
    paddingTop: "13%",
    paddingBottom: 20,
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
