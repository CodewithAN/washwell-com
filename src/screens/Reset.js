import { StyleSheet, Text, View } from "react-native";
import logo from "../../assets/images/global/logo.svg";
import Img from "../components/ui/Img";
import { vw } from "../utils/ScreenSize";
import colors, { externalStyles } from "../utils/Theme";
import { horizantGap } from "../utils/Constant";
import RNText from "../components/ui/RNText";
import RNTextInput from "../components/ui/RNTextInput";
import Button from "../components/ui/Button";

const Reset = () => {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Img source={logo} width={60 * vw} height={70} />
      </View>
      <RNText
        color="primary"
        fontWeight="bold"
        style={[externalStyles.txtXl, { marginTop: 30 }]}
      >
        Reset Password
      </RNText>
      <RNText>Enter and confirm your new password to reset it.</RNText>
      
        <RNTextInput placeholder={"Enter new Password"} />
        <RNTextInput placeholder={"Confirm Password"} />

        <Button title={"Reset Password"} variant="gradient" style={{marginTop:30}}/>
      
    </View>
  );
};

export default Reset;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    paddingHorizontal: horizantGap,
    gap: 15,
    paddingTop:"15%",
  },
});
