import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Header from "../components/global/Header";
import RNText from '../components/ui/RNText';
import colors, { externalStyles } from '../utils/Theme';
import { horizantGap, primaryHeight } from '../utils/Constant';
import RNView from '../components/ui/RNView';
import Img from '../components/ui/Img';
import choose from "../../assets/icons/choosesearch.svg";
import home from "../../assets/icons/home.svg";
import work from "../../assets/icons/work.svg";
import map from "../../assets/icons/map.svg";

const Choose = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.top}>
        <Header />
        <View style={styles.textContainer}>
          <RNText style={externalStyles.txtXl} color='primary' fontWeight='bold'>Choose Location</RNText>
        </View>
      </View>

      <RNView style={styles.searchBar}>
        <Img source={choose} width={16} height={16} />
        <RNText color='primary' style={externalStyles.txtMd}> Search location...</RNText>
      </RNView>

      <RNText fontWeight='semiBold' style={externalStyles.txtMd}>Saved locations</RNText>

      <View style={styles.center}>
        <RNView style={styles.location}>
          <Img source={work} width={24} height={24} />
          <View>
            <RNText fontWeight='semiBold' style={externalStyles.txtMd}>WorkPlace</RNText>
            <RNText  style={[externalStyles.txtXs, styles.text]}>Sharjah</RNText>
          </View>
        </RNView>
        <RNView style={styles.location}>
          <Img source={home} width={24} height={24} />
          <View>
            <RNText fontWeight='semiBold' style={externalStyles.txtMd}>Home</RNText>
            <RNText style={[externalStyles.txtXs, styles.text]}>Ajman</RNText>
          </View>
        </RNView>
      </View>

      <TouchableOpacity activeOpacity={0.7} style={styles.mapButton}>
        <Img source={map} width={24} height={24} />
        <RNText style={[externalStyles.txtMd, styles.mapInput]} fontWeight='bold'>Map</RNText>
      </TouchableOpacity>
    </View>
  );
};

export default Choose;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: horizantGap,
    paddingBottom: "15%",
    gap: 15,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    height:primaryHeight,
    gap: 5,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  center: {
    gap: 5
  },
  mapButton: {
    width: "25%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 15,
    //paddingHorizontal: 5,
    borderRadius: 20,
    gap: 5,
    marginHorizontal: "auto",
    marginTop: 'auto',  
  },
  mapInput: {
    color: "#F8F3EA",
  },
  
});