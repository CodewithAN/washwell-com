import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import RNText from "../components/ui/RNText";
import Header from "../components/global/Header";
import colors, { externalStyles } from "../utils/Theme";
import { horizantGap, primaryHeight, txtMd, txtSm } from "../utils/Constant";
import Img from "../components/ui/Img";
import RNView from "../components/ui/RNView";
import choose from "../../assets/icons/choosesearch.svg";
import ellipse from "../../assets/address/Ellipse.svg";
import office from "../../assets/address/office.svg";
import home from "../../assets/address/home.svg";
import map from "../../assets/address/map.svg";
import borderEllipse from "../../assets/address/borderEllipse.svg";
import mapIcon from "../../assets/icons/map.svg";

const Address = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <Header title="Address" />
      <View style={externalStyles.searchBar}>
        <Img source={choose} width={16} height={16} />
        <TextInput
          placeholder="Find an Address ..."
          placeholderTextColor={colors.primary}
        />
      </View>

      <View style={styles.textMiddle}>
        <RNText fontWeight="semiBold" style={externalStyles.txtMd}>
          Saved addresses
        </RNText>
        <View style={styles.add}>
          <RNText>Add New</RNText>
        </View>
      </View>

      <View style={styles.addressContainer}>
        <RNView style={styles.addressCard}>
          <View style={styles.top}>
            <View style={styles.Img}>
              <Img
                source={ellipse}
                width={36}
                height={36}
                style={styles.outer}
              />
              <Img
                source={office}
                width={25}
                height={20}
                style={styles.inner}
              />
            </View>
            <RNText style={externalStyles.txtMd} fontWeight="semiBold">
              Office
            </RNText>
          </View>
          <View style={styles.bottom}>
            <View style={styles.text}>
              <RNText>OASIS CENTER MALL, OFFICE</RNText>
              <RNText>TOWER OFFICE NO.106, DUBAI</RNText>
              <RNText>+971 8800850641</RNText>
            </View>
            <Img source={map} width={73} height={73} />
          </View>
        </RNView>

        <RNView style={[styles.addressCard, styles.border]}>
          <View style={styles.top}>
            <View style={styles.Img}>
              <Img
                source={borderEllipse}
                width={36}
                height={36}
                style={styles.outer}
              />
              <Img source={home} width={25} height={20} style={styles.inner} />
            </View>
            <RNText style={externalStyles.txtMd} fontWeight="semiBold">
              Home
            </RNText>
          </View>
          <View style={styles.bottom}>
            <View style={styles.text}>
              <RNText>OASIS CENTER MALL, OFFICE</RNText>
              <RNText>TOWER OFFICE NO.106, DUBAI</RNText>
              <RNText>+971 8800850641</RNText>
            </View>
            <Img source={map} width={73} height={73} />
          </View>
        </RNView>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("location")}
        activeOpacity={0.7}
        style={styles.mapButton}
      >
        <Img source={mapIcon} width={24} height={24} />
        <RNText
          style={[externalStyles.txtMd, styles.mapInput]}
          fontWeight="bold"
        >
          Map
        </RNText>
      </TouchableOpacity>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: horizantGap,
    paddingBottom: "25%",
    gap: 20,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    //marginTop:10,
  },
  textMiddle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  add: {
    backgroundColor: colors.white,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: txtSm,
  },
  outer: {
    position: "relative",
  },
  inner: {
    position: "absolute",
    top: 6,
    left: 6,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    gap: "10",
  },
  text: {
    fontSize: txtMd,
    gap: 5,
  },
  addressCard: {
    gap: 5,
    paddingVertical: 20,
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addressContainer: {
    gap: 15,
  },
  border: {
    borderStyle: "solid",
    borderColor: colors.primary,
    borderWidth: 2,
  },
  mapButton: {
    width: "25%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 20,
    gap: 5,
    marginHorizontal: "auto",
    marginTop: "auto",
  },
  mapInput: {
    color: "#F8F3EA",
  },
});
