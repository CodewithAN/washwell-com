import { StyleSheet, TouchableOpacity, View } from "react-native";
import RNText from "../ui/RNText";
import Img from "../ui/Img";
import backIcon from "../../../assets/icons/back.svg";
import colors, { externalStyles } from "../../utils/Theme";
import { useNavigation } from "@react-navigation/native";
import { horizantGap } from "../../utils/Constant";

const Header = ({ back = true, title = "" }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {back && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Img source={backIcon} height={25} width={25} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.center}>
        <RNText color="primary" style={externalStyles.txtLg} fontWeight="bold">
          {title}
        </RNText>
      </View>
      <View style={styles.right}></View>
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
    paddingHorizontal: horizantGap,
    backgroundColor: colors.background,
  },
  left: {
    flex: 0.25,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  right: {
    flex: 0.25,
  },
  center: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
});
