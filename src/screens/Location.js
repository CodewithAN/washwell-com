import {
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/global/Header";
import RNText from "../components/ui/RNText";
import colors, { externalStyles } from "../utils/Theme";
import { horizantGap } from "../utils/Constant";
import Img from "../components/ui/Img";
import choose from "../../assets/icons/choosesearch.svg";
import bookmark from "../../assets/location/bookmark.svg";
import location from "../../assets/location/location.svg";
import map from "../../assets/location/map.svg";
import Button from "../components/ui/Button";

const Location = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      {/* Top Section with Header and Title */}
      <View style={styles.header}>
        <Header title="Choose Location" />
      </View>

      <View style={styles.imageContainer}>
        <Img source={map} style={{ height: "100%", width: "100%" }} />
        <View style={[externalStyles.searchBar, styles.searchBar]}>
          <Img source={choose} width={16} height={16} />
          <TextInput
            placeholder="Search location ..."
            placeholderTextColor={colors.gray}
            style={externalStyles.input}
          />
        </View>

        {/* Save Button at Bottom */}
        <TouchableOpacity activeOpacity={0.7} style={styles.saveButton}>
          <Img source={bookmark} width={18} height={18} />
          <RNText
            style={[externalStyles.txtMd, { color: colors.white }]}
            fontWeight="medium"
          >
            Saved
          </RNText>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <View style={{ gap: 0 }}>
          <View style={styles.textLocation}>
            <Img
              source={location}
              style={{ marginTop: 4 }}
              width={23}
              height={23}
            />
            <View>
              <RNText style={externalStyles.txtLg} color="primary">
                Confirm location
              </RNText>
              <RNText>Muwaileh Park, Sharjah, UAE</RNText>
            </View>
          </View>
        </View>

        <Button
          onPress={() => navigation.navigate("home")}
          title={"Confirm Location"}
          variant="gradient"
        />
      </View>
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    backgroundColor: colors.background,
    display: "flex",
    flexDirection: "column",
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: horizantGap,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    flex: 1,
    marginTop: 8,
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  searchBar: {
    position: "absolute",
    top: 20,
    left: horizantGap,
    right: horizantGap,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: colors.white,
  },
  saveButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 15,
    gap: 5,
  },
  textLocation: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  orderButton: {
    paddingHorizontal: horizantGap,
  },
  bottomContainer: {
    paddingHorizontal: horizantGap,
    paddingBottom: 20,
    paddingTop: 10,
    gap: 20,
  },
  header: {
    paddingHorizontal: horizantGap,
  },
});
