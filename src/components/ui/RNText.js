import { StyleSheet, View, Text } from "react-native";
import font from "../../utils/Fonts";
import { useTranslation } from "react-i18next";
import { externalStyles } from "../../utils/Theme";
import colors from "../../utils/Theme";

const RNText = ({
  children,
  style,
  numberOfLines,
  size = "sm",
  color = "black",
  fontWeight = "regular",
}) => {
  const { t } = useTranslation();
  const fontFamily = font[fontWeight] || font.regular;
  const textColor =
    color === "primary" ? colors.primary : colors.black || "#000000";
  const sizeStyle =
    externalStyles[`txt${size.charAt(0).toUpperCase() + size.slice(1)}`] ||
    externalStyles.txtSm;

  return (
    <View>
      <Text
        numberOfLines={numberOfLines}
        style={[
          styles.text,
          sizeStyle,
          { color: textColor, fontFamily },
          style,
        ]}
      >
        {t(children)}
      </Text>
    </View>
  );
};

export default RNText;

const styles = StyleSheet.create({
  text: {
    margin: 0,
    padding: 0,
  },
});
