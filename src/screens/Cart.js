import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/Api";
import RNText from "../components/ui/RNText";
import Header from "../components/global/Header";
import colors, { externalStyles } from "../utils/Theme";
import {
  horizantGap,
  primarBorderRadius,
  txtSM,
  txtSm,
  txtXs,
} from "../utils/Constant";
import Img from "../components/ui/Img";
import RNView from "../components/ui/RNView";
import choose from "../../assets/icons/choosesearch.svg";
import dryClean from "../../assets/icons/dry.svg";
import onlyPress from "../../assets/icons/Iron.svg";
import washFold from "../../assets/icons/Laundry.svg";
import carpets from "../../assets/icons/Yoga mat.svg";
import Button from "../components/ui/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ContextProvider } from "../global/Context";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import font from "../utils/Fonts";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

const Cart = ({ navigation }) => {
  const { token, setToken, selectedTab, setSelectedTab } =
    useContext(ContextProvider);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = useDebounce(searchQuery, 500);

  const tabs = [
    { icon: dryClean, text1: "Clean&", text2: "Press", category: "dry_clean" },
    { icon: onlyPress, text1: "Only", text2: "Press", category: "press_only" },
    { icon: washFold, text1: "Wash &", text2: "Fold", category: "wash_fold" },
    {
      icon: carpets,
      text1: "Carpet &",
      text2: "Curtains",
      category: "carpets",
    },
  ];

  const fetchItems = async ({ pageParam = 1 }) => {
    let storedToken = token;
    if (!storedToken) {
      storedToken = await AsyncStorage.getItem("washwell-token");
      if (storedToken) setToken(storedToken);
    }
    if (!storedToken) throw new Error("Token not found. Please login again.");
    const instance = await axiosInstance();
    const response = await instance.get("/get-item-pricing", {
      params: {
        category: tabs[selectedTab].category,
        search: debouncedSearch || undefined,
        page: pageParam,
        record_per_page: 10,
      },
    });
    return response.data.data.productLists;
  };

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["items", selectedTab, debouncedSearch, token],
    queryFn: fetchItems,
    getNextPageParam: (lastPage) =>
      lastPage.next_page_url ? lastPage.current_page + 1 : undefined,
    onError: async (err) => {
      const message = err?.message || "Failed to load items.";
      if (err?.response?.status === 401) {
        await AsyncStorage.removeItem("washwell-token");
        setToken(null);
        Toast.show({
          type: "error",
          text1: "Session Expired",
          text2: "Please log in again.",
        });
      } else {
        Toast.show({ type: "error", text1: "Error", text2: message });
      }
    },
  });

  const handleTabChange = useCallback((index) => {
    setSelectedTab(index);
    setSearchQuery("");
  }, []);

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = ({ item }) => (
    <RNView key={item.id} style={styles.cardWrapper}>
      <View style={styles.imageContainer}>
        <Img source={{ uri: item.image }} style={styles.inner} />
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.cardLeft}>
          <RNText style={externalStyles.txtSm} fontWeight="medium">
            {item.title.toUpperCase()}
          </RNText>
        </View>
        <View style={styles.cardRight}>
          <RNText style={externalStyles.txtSm}>{`${item.price}  AED`}</RNText>
        </View>
      </View>
    </RNView>
  );

  const items = data?.pages.flatMap((page) => page.data) || [];

  return (
    <>
      <Header space title="Select Items" />
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.outerContainer}>
            {tabs.map((tab, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.innerContainer,
                  selectedTab === index && styles.selectedTab,
                ]}
                onPress={() => handleTabChange(index)}
              >
                <View
                  style={{
                    width: 38,
                    height: 40,
                    backgroundColor:
                      index === 0
                        ? "transparent"
                        : selectedTab === index
                        ? "#E2E5F4"
                        : "transparent",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius:
                      index === 0 ? 0 : selectedTab === index ? 8 : 0,
                  }}
                >
                  <Img source={tab.icon} width={38} height={40} />
                </View>
                <View style={styles.text}>
                  <RNText
                    style={{
                      color:
                        selectedTab === index ? colors.white : colors.black,
                      fontSize: txtXs,
                    }}
                  >
                    {tab.text1}
                  </RNText>
                  <RNText
                    style={{
                      color:
                        selectedTab === index ? colors.white : colors.black,
                      fontSize: txtXs,
                    }}
                  >
                    {tab.text2}
                  </RNText>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity activeOpacity={1} onPress={() => {}}>
            <View style={externalStyles.searchBar}>
              <Img source={choose} width={16} height={16} />
              <TextInput
                placeholder="Search here ..."
                placeholderTextColor={colors.gray}
                style={externalStyles.input}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus={false}
                onFocus={() => {}}
              />
            </View>
          </TouchableOpacity>
        </View>

        {(selectedTab === 2 || selectedTab === 3) && (
          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <RNText style={styles.infoTitle}>
                {selectedTab === 2
                  ? "Wash & Fold Info"
                  : "Carpet & Curtains Info"}
              </RNText>
            </View>
            <RNText style={styles.infoText}>
              {selectedTab === 2
                ? "Fill the bag with up to 15 home linens* and we will have them perfectly cleaned and pressed"
                : "Fill the bag with any item that is suitable for 40°C wash and tumble dry. Pressing not included"}
            </RNText>
          </View>
        )}

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <RNText style={styles.errorText}>{error.message}</RNText>
            <Button title="Retry" onPress={refetch} variant="primary" />
          </View>
        ) : items.length === 0 ? (
          <View style={styles.noItemsContainer}>
            <RNText style={styles.noItemsText}>No items found</RNText>
          </View>
        ) : (
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isFetchingNextPage ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : null
            }
          />
        )}

        <View style={styles.fixedButton}>
          <Button
            onPress={() => navigation.navigate("place-order")}
            title="Place Order"
            variant="gradient"
          />
        </View>
      </View>
    </>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  top: {
    paddingHorizontal: horizantGap,
    paddingTop: 15,
    gap: 20,
  },
  outerContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 100,
    backgroundColor: colors.white,
    borderRadius: primarBorderRadius,
  },
  innerContainer: {
    gap: 5,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: primarBorderRadius,
  },
  selectedTab: {
    backgroundColor: colors.primary,
    height: 100,
  },
  text: {
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  errorText: {
    fontSize: txtXs,
    color: "red",
    textAlign: "center",
  },
  noItemsContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  noItemsText: {
    fontSize: txtSm,
    color: colors.text,
  },
  cardWrapper: {
    position: "relative",
    marginTop: 15,
  },
  imageContainer: {
    position: "absolute",
    top: -19,
    left: 20,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    backgroundColor: "#D9D9D9",
    borderRadius: 100000,
  },
  inner: {
    width: "60%",
    height: "60%",
    resizeMode: "contain",
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderRadius: primarBorderRadius,
    paddingVertical: 5,
    paddingLeft: 90,
    paddingRight: 10,
  },
  cardLeft: {
    justifyContent: "center",
  },
  listContent: {
    paddingHorizontal: horizantGap,
    gap: 20,
    paddingTop: 25,
    paddingBottom: 75,
  },
  fixedButton: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: horizantGap,
    zIndex: 10,
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: primarBorderRadius,
    padding: 15,
    marginHorizontal: horizantGap,
    marginTop: 20,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  infoTitle: {
    fontSize: txtSM,
    fontFamily: font.medium,
    color: colors.primary,
  },
  infoText: {
    fontSize: txtSm,
    color: colors.text,
  },
});
