import { StyleSheet, Text, View } from "react-native";
import logo from "../../assets/images/global/logo.svg";
import Img from "../components/ui/Img";
import { vw } from "../utils/ScreenSize";
import colors, { externalStyles } from "../utils/Theme";
import { horizantGap } from "../utils/Constant";
import RNTextInput from "../components/ui/RNTextInput";
import Button from "../components/ui/Button";
import RNText from "../components/ui/RNText";

const ChangePassword = () => {
  return (
    <View style={styles.container}>
      <View>
        <Img source={logo} width={60 * vw} height={70} />
      </View>
      <View>
        <RNText style={externalStyles.txtLg} color="primary">Change Password</RNText>
      </View>
      <View style={styles.inputContainer}>
        <View>
          <RNTextInput placeholder="Old Password" secure />
        </View>
        <View>
          <RNTextInput placeholder="New Password" secure />
        </View>
        <View>
          <RNTextInput placeholder="Confirm Password" secure />
        </View>
      </View>
      
        <Button title={"Change Password"} variant="gradient" />
     
    </View>
  );
};

export default ChangePassword;

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
