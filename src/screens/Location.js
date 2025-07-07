import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/global/Header";
import RNText from "../components/ui/RNText";
import colors, { externalStyles } from "../utils/Theme";
import { horizantGap, primaryHeight } from "../utils/Constant";
import RNView from "../components/ui/RNView";
import Img from "../components/ui/Img";
import choose from "../../assets/icons/choosesearch.svg";
import map from "../../assets/location/map.svg";
import bookmark from "../../assets/location/bookmark.svg";
import location from "../../assets/location/location.svg";
import Button from '../components/ui/Button';


const Location = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.mainContainer}>
        {/* Top Section with Header and Title */}
        <View style={styles.top}>
          <Header />
          <View style={styles.textContainer}>
            <RNText
              style={externalStyles.txtXl}
              color="primary"
              fontWeight="bold"
            >
              Choose Location
            </RNText>
          </View>
        </View>

        {/* Image Container with Search Bar and Save Button */}
        <View style={styles.imageContainer}>
          <Img source={map} width={432} height={669} style={styles.img} />

          {/* Search Bar at Top */}
          <RNView style={styles.searchBar}>
            <Img source={choose} width={16} height={16} />
            <TextInput
              placeholder="Search location ..."
              placeholderTextColor={colors.primary}
            />
          </RNView>

          {/* Save Button at Bottom */}
          <TouchableOpacity activeOpacity={0.7} style={styles.saveButton}>
            <Img source={bookmark} width={24} height={24} />
            <RNText
              style={[externalStyles.txtMd, { color: colors.white }]}
              fontWeight="semiBold"
            >
              Saved
            </RNText>
          </TouchableOpacity>
        </View>

        <View style={{gap:5}}>
          <View style={styles.textLocation}>
            <Img source={location} width={24} height={24} />
            <RNText style={externalStyles.txtXl} color="primary">
              Confirm location
            </RNText>
          </View>
          <View style={{ paddingHorizontal: horizantGap, marginLeft: 35 }}>
            <RNText>Muwaileh Park, Sharjah, UAE</RNText>
          </View>
        </View>

        <View style={styles.orderButton} >
            <TouchableOpacity activeOpacity={0.7}>
              <Button title={'Confirm Location'} variant="gradient" />
            </TouchableOpacity>
      </View>


      </View>
    </ScrollView>
  );
};

export default Location;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: colors.background,
    paddingBottom:"10%"
  },

  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
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
    width: "100%",
    height: 669, 
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", 
  },
  searchBar: {
    position: "absolute",
    top: "6%",
    left: horizantGap,
    right: horizantGap,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: colors.white,
  },

  saveButton: {
    position: "absolute",
    bottom: "8%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    gap: 5,
    width: "30%",
  },
  textLocation: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: horizantGap,
  },
   orderButton: {
   
    paddingHorizontal:horizantGap,
    marginTop:"5%",
  },
});
