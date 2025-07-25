import { StyleSheet, View } from "react-native";
import Carousel from "./Carousal";
import colors from "../../utils/Theme";
import { primarBorderRadius } from "../../utils/Constant";
const Promotion = ({ navigation, data, isLoading }) => {
  if (isLoading) {
    return <View style={styles.loading}></View>;
  }
  return (
    <View style={styles.promotion}>
      {data?.length > 0 && (
        <Carousel navigation={navigation} CarouselData={data} />
      )}
    </View>
  );
};

export default Promotion;

const styles = StyleSheet.create({
  loading: {
    backgroundColor: colors.lightGray,
    height: 200,
    borderRadius: primarBorderRadius,
    marginTop: 12,
  },
  promotion: {
    marginTop: 12,
  },
});
