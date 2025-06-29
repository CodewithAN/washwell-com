import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
export const vw = width / 100;
export const vh = height / 100;
