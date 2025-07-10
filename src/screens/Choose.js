import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import Header from "../components/global/Header";
import RNText from "../components/ui/RNText";
import colors, { externalStyles } from "../utils/Theme";
import { horizantGap } from "../utils/Constant";
import RNView from "../components/ui/RNView";
import Img from "../components/ui/Img";
import choose from "../../assets/icons/choosesearch.svg";
import home from "../../assets/icons/home.svg";
import work from "../../assets/icons/work.svg";
import map from "../../assets/icons/map.svg";

const Choose = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header title="Choose Location" />

      <View style={externalStyles.searchBar}>
        <Img source={choose} width={16} height={16} />
        <TextInput
          placeholder="Search location ..."
          placeholderTextColor={colors.gray}
          style={externalStyles.input}
        />
      </View>

      <RNText fontWeight="medium" style={externalStyles.txtMd}>
        Saved locations
      </RNText>

      <View style={styles.center}>
        <RNView style={styles.location}>
          <Img source={work} width={24} height={24} />
          <View>
            <RNText fontWeight="regular" style={externalStyles.txtMd}>
              WorkPlace
            </RNText>
            <RNText style={[externalStyles.txtXs, styles.text]}>Sharjah</RNText>
          </View>
        </RNView>
        <RNView style={styles.location}>
          <Img source={home} width={24} height={24} />
          <View>
            <RNText fontWeight="regular" style={externalStyles.txtMd}>
              Home
            </RNText>
            <RNText style={[externalStyles.txtXs, styles.text]}>Ajman</RNText>
          </View>
        </RNView>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("location")}
        activeOpacity={0.7}
        style={styles.mapButton}
      >
        <Img source={map} width={21} height={21} />
        <RNText
          style={[externalStyles.txtMd, styles.mapInput]}
          fontWeight="regular"
        >
          Map
        </RNText>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Choose;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: horizantGap,
    paddingBottom: "13%",
    gap: 15,
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

  location: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  center: {
    gap: 5,
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 20,
    gap: 5,
    marginHorizontal: "auto",
    marginTop: "auto",
  },
  mapInput: {
    color: "#F8F3EA",
  },
});
