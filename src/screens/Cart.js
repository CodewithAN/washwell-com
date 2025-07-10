import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import RNText from "../components/ui/RNText";
import Header from "../components/global/Header";
import colors, { externalStyles } from "../utils/Theme";
import { horizantGap, primarBorderRadius, txtXs } from "../utils/Constant";
import Img from "../components/ui/Img";
import RNView from "../components/ui/RNView";

import choose from "../../assets/icons/choosesearch.svg";
import dryClean from "../../assets/icons/dry.svg";
import onlyPress from "../../assets/icons/Iron.svg";
import washFold from "../../assets/icons/Laundry.svg";
import carpets from "../../assets/icons/Yoga mat.svg";

import coat from "../../assets/cart/coat.svg";
import jeans from "../../assets/cart/jeans.svg";
import shirt from "../../assets/cart/shirt.svg";
import Button from "../components/ui/Button";

const Cart = ({ navigation }) => {
  return (
    <>
      <Header space title="Select Items" />
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.mainContainer}>
          <View style={styles.top}>
            {/* Service Tabs */}
            <View style={styles.outerContainer}>
              <View style={[styles.innerContainer, styles.selectedTab]}>
                <Img source={dryClean} width={38} height={40} />
                <View style={styles.text}>
                  <RNText style={{ color: colors.white }}>Clean&</RNText>
                  <RNText style={{ color: colors.white }}>Press</RNText>
                </View>
              </View>

              <View style={styles.innerContainer}>
                <Img source={onlyPress} width={38} height={40} />
                <View style={styles.text}>
                  <RNText>Only</RNText>
                  <RNText>Press</RNText>
                </View>
              </View>

              <View style={styles.innerContainer}>
                <Img source={washFold} width={38} height={40} />
                <View style={styles.text}>
                  <RNText>Wash</RNText>
                  <RNText>&Fold</RNText>
                </View>
              </View>

              <View style={styles.innerContainer}>
                <Img source={carpets} width={38} height={40} />
                <View style={styles.text}>
                  <RNText>Carpet&</RNText>
                  <RNText>Curtains</RNText>
                </View>
              </View>
            </View>

            {/* Search Bar */}
            <View style={externalStyles.searchBar}>
              <Img source={choose} width={16} height={16} />
              <TextInput
                placeholder="Search here ..."
                placeholderTextColor={colors.gray}
                style={externalStyles.input}
              />
            </View>

            {/* T-shirt Card  */}
            <RNView style={styles.cardWrapper}>
              {/* Floating Image */}
              <View style={styles.imageContainer}>
                <Img source={shirt} style={styles.inner} />
              </View>

              {/* Card */}
              <View style={styles.cardContainer}>
                <View style={styles.cardLeft}>
                  <RNText style={externalStyles.txtMd} fontWeight="medium">
                    T-Shirt
                  </RNText>
                </View>
                <View style={styles.cardRight}>
                  <RNText style={externalStyles.txtMd}>25 AED</RNText>
                </View>
              </View>
            </RNView>

            {/* Jeans Card  */}
            <RNView style={styles.cardWrapper}>
              {/* Floating Image */}
              <View style={styles.imageContainer}>
                <Img source={jeans} style={styles.inner} />
              </View>

              {/* Card */}
              <View style={styles.cardContainer}>
                <View style={styles.cardLeft}>
                  <RNText style={externalStyles.txtMd} fontWeight="medium">
                    Jeans
                  </RNText>
                </View>
                <View style={styles.cardRight}>
                  <RNText style={externalStyles.txtMd}>25 AED</RNText>
                </View>
              </View>
            </RNView>

            {/* Coat Card  */}
            <RNView style={styles.cardWrapper}>
              {/* Floating Image */}
              <View style={styles.imageContainer}>
                <Img source={coat} style={styles.inner} />
              </View>

              {/* Card */}
              <View style={styles.cardContainer}>
                <View style={styles.cardLeft}>
                  <RNText style={externalStyles.txtMd} fontWeight="medium">
                    Coat
                  </RNText>
                </View>
                <View style={styles.cardRight}>
                  <RNText style={externalStyles.txtMd}>75 AED</RNText>
                </View>
              </View>
            </RNView>
          </View>

          <View style={styles.contentWrapper}>
            {/* Button */}
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => navigation.navigate("place-order")}
                title={"Place Order"}
                variant="gradient"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Cart;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.background,
    paddingHorizontal: horizantGap,
    paddingBottom: "13%",
    paddingTop: 15,
    gap: 30,
    height: "100%",
  },
  top: {
    flex: 1,
    gap: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  outerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 100,
    backgroundColor: colors.white,
    borderRadius: primarBorderRadius,
  },
  innerContainer: {
    gap: 5,
    width: "22%",
    fontSize: txtXs,
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
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  contentWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
