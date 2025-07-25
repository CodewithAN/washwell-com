import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "./Constant";

export const axiosInstance = async () => {
  const token = await AsyncStorage.getItem("washwell-token");
  let cleanToken = token.replace(/^"|"$/g, "");
  console.log("Token:", cleanToken);
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${cleanToken}`,
      "content-type": "application/json",
      Accept: "application/json",
    },
  });
};

export const axiosInstance2 = async () => {
  const token = await AsyncStorage.getItem("washwell-token");
  return axios.create({
    headers: {
      baseURL: API_URL,
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
};
