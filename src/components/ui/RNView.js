import { StyleSheet, View } from "react-native";
import colors from "../../utils/Theme";
import { primarBorderRadius } from "../../utils/Constant";

const RNView = ({ bg, children, style, ...props }) => {
  const backgroundColor = bg || colors.white;

  return (
    <View style={[styles.container, { backgroundColor }, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 1,
    borderRadius: primarBorderRadius,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
});

export default RNView;
