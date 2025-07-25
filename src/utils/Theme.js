import { StyleSheet } from "react-native";
import { primarBorderRadius, primaryHeight } from "./Constant";
import font from "./Fonts";

const colors = {
  primary: "#084ABA",
  background: "#CCF5F5",
  lightGreen: "#CCF5F5",
  lightBlue: "#63C5E9CC",
  white: "#ffffff",
  black: "#000000",
  gray: "#808080",
  lightGray: "#efefef",
  // lightGreen: "#bae6f6cc",
};

const externalStyles = StyleSheet.create({
  txtLg: {
    fontSize: 18,
  },
  txtXl: {
    fontSize: 20,
  },
  txtMd: {
    fontSize: 16,
  },
  txtSm: {
    fontSize: 13,
  },
  txtXs: {
    fontSize: 12,
  },
  height: {
    height: "100%",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "white",
    height: primaryHeight,
    paddingHorizontal: 14,
    elevation: 1,
    borderRadius: primarBorderRadius,
  },
  input: {
    color: colors.black,
    flex: 1,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    flexWrap: "wrap",
  },
  medium: {
    fontFamily: font.medium,
  },
  bold: {
    fontFamily: font.bold,
  },
});

export default colors;
export { externalStyles };
