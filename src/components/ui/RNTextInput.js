import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import RNText from "./RNText";
import { txtSm, primarBorderRadius, primaryHeight } from "../../utils/Constant";
import colors from "../../utils/Theme";
import font from "../../utils/Fonts";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const RNTextInput = React.forwardRef(
  (
    { label, value, onChangeText, style, placeholder, secure, ...props },
    ref
  ) => {
    const height = primaryHeight;
    const [isSecure, setIsSecure] = useState(secure);

    return (
      <View
        style={[
          styles.container,
          { height, width: "100%" },
          style,
          label && styles.labelContainer,
          secure && styles.passwordContainer,
        ]}
      >
        {label && <RNText style={styles.label}>{label}</RNText>}
        <View style={styles.inputWrapper}>
          <TextInput
            ref={ref}
            style={[label ? styles.labelInput : styles.input, styles.textInput]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.gray}
            secureTextEntry={isSecure}
            {...props}
          />
          {secure && (
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setIsSecure(!isSecure)}
            >
              <Ionicons
                name={isSecure ? "eye-off" : "eye"}
                size={20}
                color={colors.gray}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
);

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
  },
  labelInput: {
    fontSize: txtSm,
    color: colors.black,
    backgroundColor: colors.white,
    borderRadius: primarBorderRadius,
    paddingHorizontal: 10,
    fontFamily: font.regular,
  },
  textInput: {
    zIndex: 1,
    flex: 1,
  },
  passwordContainer: {
    paddingRight: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: 30,
    zIndex: 2,
  },
});

export default RNTextInput;
