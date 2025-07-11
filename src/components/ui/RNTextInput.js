import { StyleSheet, TextInput, View } from "react-native";
import RNText from "./RNText";
import { txtSm, primarBorderRadius, primaryHeight } from "../../utils/Constant";
import colors from "../../utils/Theme";
import font from "../../utils/Fonts";

const RNTextInput = ({
  label,
  value,
  onChangeText,
  style,
  placeholder,
  ...props
}) => {
  const height = primaryHeight;

  return (
    <View
      style={[
        styles.container,
        { height, width: "100%" },
        style,
        label && styles.labelContainer,
      ]}
    >
      {label && <RNText style={styles.label}>{label}</RNText>}
      <TextInput
        style={label ? styles.labelInput : styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.gray}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: primarBorderRadius,
    overflow: "hidden",
    justifyContent: "center",
    paddingHorizontal: 10,
    elevation: 1,
  },
  label: {
    paddingHorizontal: 5,
    fontSize: txtSm,
    color: colors.black,
  },
  labelContainer: {
    paddingTop: 9,
    height: "auto",
  },
  input: {
    height: 40,
    fontSize: txtSm,
    color: colors.black,
    backgroundColor: colors.white,
    borderRadius: primarBorderRadius,
    paddingHorizontal: 10,
    fontFamily: font.regular,
    fontSize: txtSm,
  },
  labelInput: {
    fontSize: txtSm,
    color: colors.black,
    backgroundColor: colors.white,
    borderRadius: primarBorderRadius,
    paddingHorizontal: 10,
    fontFamily: font.regular,
    fontSize: txtSm,
  },
});

export default RNTextInput;
