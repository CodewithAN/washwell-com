import { StyleSheet } from "react-native";
import { primarBorderRadius, primaryHeight } from "./Constant";

const colors = {
  primary: "#3A70DD",
  background: "#CCF5F5",
  lightBlue: "#63C5E9CC",
  white: "#ffffff",
  black: "#000000",
  gray: "#808080",
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
  },
});

export default colors;
export { externalStyles };
