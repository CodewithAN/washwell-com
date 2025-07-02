import { StyleSheet, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Img from "./Img";
import RNText from "./RNText";
import { txtSm, primarBorderRadius, primaryHeight, txtMd } from "../../utils/Constant";
import colors from "../../utils/Theme";

const Button = ({
  variant = "gradient",
  title,
  onPress,
  source,
  rounded,
  style,
  shadow = false,
  disabled = false,
}) => {
  const buttonStyles = [
    styles.button,
    rounded ? styles.fullRounded : styles.slightRounded,
    variant === "gradient" && styles.gradient,
    variant === "mid-blue" && styles.midBlue,
    variant === "white" && styles.white,
    disabled && styles.disabled,

    style,
  ];

  const textStyles = [
    styles.text,
    variant === "white" && styles.whiteText,
    disabled && styles.disabledText,
  ];

  const height = primaryHeight;

  return (
    <TouchableOpacity
      style={[{ height, width: "100%", elevation: shadow ? 1 : 0 }]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={[styles.container]}>
        {variant === "gradient" ? (
          <LinearGradient
            colors={["#3A70DDCC", "#63C5E9CC"]}
            start={[0, 0]}
            end={[1, 0]}
            style={[buttonStyles, { height }]}
          >
            <View style={styles.content}>
              {source && <Img source={source} style={styles.image} />}
              <RNText style={textStyles}>{title}</RNText>
            </View>
          </LinearGradient>
        ) : (
          <View style={[buttonStyles, { height }]}>
            {source && <Img source={source} style={styles.image} />}
            <RNText style={textStyles}>{title}</RNText>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  slightRounded: {
    borderRadius: primarBorderRadius,
  },
  fullRounded: {
    borderRadius: 100,
  },
  midBlue: {
    backgroundColor: colors.midBlue,
  },
  white: {
    backgroundColor: "#FFF",
  },
  text: {
    color: "#FFF",
    fontSize: txtMd,
    fontWeight:"bold",
  },
  whiteText: {
    color: "#000",
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: "#888",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 17,
    height: 17,
    marginRight: 10,
  },
});

export default Button;
