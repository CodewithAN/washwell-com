import { StyleSheet } from "react-native";

const colors = {
  primary: "#3A70DD",
  background: "#CCF5F5",
  lightBlue: "#63C5E9CC",
  white: "#ffffff",
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
});

export default colors;
export { externalStyles };
