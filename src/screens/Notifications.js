import React, { useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/Api";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import RNText from "../components/ui/RNText";
import Header from "../components/global/Header";
import colors, { externalStyles } from "../utils/Theme";
import {
  horizantGap,
  primarBorderRadius,
  txtMd,
  txtSm,
} from "../utils/Constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ContextProvider } from "../global/Context";
import Button from "../components/ui/Button";
import Img from "../components/ui/Img";
import Toast from "react-native-toast-message";
import location from "../../assets/icons/location.svg";

const Notifications = () => {
  const { setToken, address } = useContext(ContextProvider);

  const fetchNotifications = async () => {
    const instance = await axiosInstance();
    const response = await instance.get("/notifications-list");
    const rawNotifications =
      response?.data?.data?.notifications ||
      (Array.isArray(response?.data) ? response.data : []);

    if (!Array.isArray(rawNotifications)) {
      throw new Error("Invalid notifications format.");
    }

    const groupedByDate = rawNotifications.reduce((acc, notif) => {
      const notifDate = new Date(notif.created_at);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let label =
        notifDate.toDateString() === today.toDateString()
          ? "Today"
          : notifDate.toDateString() === yesterday.toDateString()
          ? "Yesterday"
          : notifDate.toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });

      if (!acc[label])
        acc[label] = { notifications: [], earliestDate: notifDate };
      acc[label].notifications.push(notif);
      if (notifDate < acc[label].earliestDate)
        acc[label].earliestDate = notifDate;
      return acc;
    }, {});

    Object.keys(groupedByDate).forEach((date) => {
      groupedByDate[date].notifications.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    });

    return Object.keys(groupedByDate)
      .map((date) => ({
        date,
        notifications: groupedByDate[date].notifications,
        sortDate: groupedByDate[date].earliestDate,
      }))
      .sort((a, b) => b.sortDate - a.sortDate);
  };

  const {
    data: notifications = [],
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    onError: async (err) => {
      const message = err?.message || "Failed to load notifications.";
      if (err?.response?.status === 401) {
        await AsyncStorage.removeItem("washwell-token");
        setToken(null);
        Toast.show({
          type: "error",
          text1: "Session Expired",
          text2: "Please log in again.",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: message,
        });
      }
    },
  });

  const getIcon = (title) => {
    if (title?.toLowerCase().includes("email")) {
      return <Ionicons name="mail" size={20} color={colors.primary} />;
    } else if (
      title?.toLowerCase().includes("done") ||
      title?.toLowerCase().includes("complete")
    ) {
      return (
        <Ionicons name="checkmark-done" size={20} color={colors.primary} />
      );
    } else if (
      title?.toLowerCase().includes("coupon") ||
      title?.toLowerCase().includes("discount")
    ) {
      return (
        <MaterialIcons name="local-offer" size={20} color={colors.primary} />
      );
    }
    return <Ionicons name="notifications" size={20} color={colors.primary} />;
  };

  const handleRetry = () => {
    refetch();
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header space title="Notifications" />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <RNText style={styles.errorText}>{error.message}</RNText>
          <Button title="Retry" onPress={handleRetry} variant="outline" />
        </View>
      ) : notifications.length === 0 ? (
        <View style={styles.noNotificationsContainer}>
          <RNText style={styles.noNotificationsText}>
            No notifications found
          </RNText>
        </View>
      ) : (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}
        >
          <View style={styles.locationBar}>
            <View style={styles.outerContainer}>
              <View style={styles.innerContainer}>
                <Img source={location} width={14} height={14} />
              </View>
            </View>
            <View style={styles.locationTextContainer}>
              <RNText style={[externalStyles.txtMd, { color: colors.white }]}>
                {address?.label || "N/A"}
              </RNText>
              <RNText style={{ color: colors.white }}>
                {address?.address || "N/A"}
              </RNText>
            </View>
          </View>

          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.mainContainer}>
              {notifications.map((group, index) => (
                <View key={index} style={styles.notificationGroup}>
                  <RNText
                    fontWeight="medium"
                    style={[externalStyles.txtMd, styles.header]}
                  >
                    {group.date}
                  </RNText>
                  {group.notifications.map((notification) => (
                    <View key={notification.id} style={styles.notificationItem}>
                      <View style={styles.contentContainer}>
                        <View style={styles.iconContainer}>
                          {getIcon(notification.title)}
                        </View>
                        <View style={styles.textContainer}>
                          <RNText
                            fontWeight="medium"
                            style={styles.notificationText}
                          >
                            {notification.title}
                          </RNText>
                        </View>
                      </View>
                      <RNText style={styles.timestampText}>
                        {new Date(notification.created_at).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}
                      </RNText>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: horizantGap,
    paddingBottom: 20,
  },
  locationBar: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: primarBorderRadius,
    gap: 10,
    padding: 10,
    marginHorizontal: horizantGap,
    marginTop: 5,
    paddingRight: 60,
  },
  outerContainer: {
    width: 40,
    height: 40,
    backgroundColor: colors.white,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    width: 24,
    height: 24,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  locationTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    marginTop: 20,
  },
  notificationGroup: {
    gap: 20,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 15,
  },
  iconContainer: {
    width: 30,
    height: 30,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  notificationText: {
    fontSize: txtMd,
    flexShrink: 1,
  },
  timestampText: {
    fontSize: txtSm,
    marginRight: 10,
    alignSelf: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  errorText: {
    fontSize: txtMd,
    color: "red",
    textAlign: "center",
  },
  noNotificationsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noNotificationsText: {
    fontSize: txtMd,
    color: colors.text,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
