import { StyleSheet, View } from "react-native";
import { vw, horizantGap } from "../../utils/Constant";
import colors from "../../utils/Theme";
import RNText from "../ui/RNText";

const Divider = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <RNText style={styles.text}>OR</RNText>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.primary,
  },
  text: {
    fontSize: 14,
    color: colors.black,
    marginHorizontal: 14,
  },
});

export default Divider;
