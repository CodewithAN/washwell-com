import { StyleSheet, TouchableOpacity, View } from "react-native";
import RNText from "../ui/RNText";
import Img from "../ui/Img";
import backIcon from "../../../assets/icons/back.svg";
import { horizantGap } from "../../utils/Constant";
import { externalStyles } from "../../utils/Theme";

const Header = ({ back = true, title = "" }) => {
  return (
    <View style={styles.container}>
      <View style={styles.individual}>
        {back && (
          <TouchableOpacity activeOpacity={0.7}>
            <Img source={backIcon} height={25} width={25} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.individual}>
        <RNText color="primary" style={externalStyles.txtMd} fontWeight="bold">
          {title}
        </RNText>
      </View>
      <View style={styles.individual}></View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 45,
  },
  individual: {
    flex: 1,
  },
});
