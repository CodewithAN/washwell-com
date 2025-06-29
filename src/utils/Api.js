import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const axiosInstance = async () => {
  const token = await AsyncStorage.getItem("washwell-token");
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
      Accept: "application/json",
    },
  });
};

export const axiosInstance2 = async () => {
  const token = await AsyncStorage.getItem("washwell-token");
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
};
